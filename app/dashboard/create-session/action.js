"use server";

import { createClient } from "@/lib/supabase/server";
import {
    getSessionLimits,
    calculateExpiry,
    generateJoinCode,
    planAllowsLogo,
    notExpiredFilter,
} from "@/lib/sessions";
import { redirect } from "next/navigation";

// Name of the partial unique index in supabase/security-and-constraints.sql
const ONE_ACTIVE_SESSION_INDEX = "one_active_session_per_host";

async function findActiveSession(supabase, hostId) {
    const { data } = await supabase
        .from("sessions")
        .select("join_code")
        .eq("host_id", hostId)
        .eq("status", "active")
        .or(notExpiredFilter())
        .maybeSingle();
    return data;
}

export async function createSessionAction(prevState, formData) {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        return { error: "You must be logged in to create a session." };
    }

    const existingSession = await findActiveSession(supabase, user.id);
    if (existingSession) {
        redirect(`/session/${existingSession.join_code}`);
    }

    const name = formData.get("name")?.toString().trim();
    if (!name) {
        return { error: "Please enter a session name." };
    }
    if (name.length > 50) {
        return { error: "Session name must be 50 characters or fewer." };
    }

    const { data: profile } = await supabase
        .from("profiles")
        .select("plan")
        .eq("id", user.id)
        .single();

    const plan = profile?.plan ?? "free";
    const { maxGuests, durationHours } = getSessionLimits(plan);

    // Only ever trust plan-gated input after re-checking the plan server-side —
    // the UI hides this field for non-venue users, but a request could still fake it.
    let logoUrl = null;
    if (planAllowsLogo(plan)) {
        const rawLogoUrl = formData.get("logoUrl")?.toString().trim();
        if (rawLogoUrl) {
            try {
                const parsed = new URL(rawLogoUrl);
                if (parsed.protocol !== "https:" && parsed.protocol !== "http:") {
                    throw new Error("unsupported protocol");
                }
                logoUrl = rawLogoUrl;
            } catch {
                return { error: "Please enter a valid logo URL." };
            }
        }
    }

    // The one-active-session-per-host unique index counts any row still marked
    // "active", even one whose time has run out. Flip those to "ended" first
    // so an old, timed-out session never blocks the host from starting a new one.
    // ("ended" is one of the two values the sessions_status_check constraint allows.)
    const { error: expireError } = await supabase
        .from("sessions")
        .update({ status: "ended" })
        .eq("host_id", user.id)
        .eq("status", "active")
        .lte("expires_at", new Date().toISOString());
    if (expireError) {
        console.error("Failed to expire stale sessions:", expireError);
    }

    // Retry a few times in the rare event of a join_code collision
    let session, insertError;
    for (let attempt = 0; attempt < 5; attempt++) {
        const result = await supabase
            .from("sessions")
            .insert({
                host_id: user.id,
                name,
                join_code: generateJoinCode(),
                plan,
                max_guests: maxGuests,
                expires_at: calculateExpiry(durationHours),
                logo_url: logoUrl,
            })
            .select()
            .single();

        if (!result.error) {
            session = result.data;
            break;
        }
        insertError = result.error;

        if (result.error.code !== "23505") break; // not a unique violation, stop retrying

        // Lost a race: another request created this host's session between our
        // check above and this insert. Send them to that session instead of failing.
        if (result.error.message?.includes(ONE_ACTIVE_SESSION_INDEX)) {
            const raced = await findActiveSession(supabase, user.id);
            if (raced) redirect(`/session/${raced.join_code}`);
            break;
        }
        // Otherwise it was a duplicate join_code: loop and try a fresh code.
    }

    if (!session) {
        console.error("Failed to create session:", insertError);
        return { error: "Something went wrong creating your session. Please try again." };
    }

    redirect(`/session/${session.join_code}`);
}
