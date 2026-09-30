"use server";

import { createClient } from "@/lib/supabase/server";
import { getSessionLimits, calculateExpiry, generateJoinCode, planAllowsLogo } from "@/lib/sessions";
import { redirect } from "next/navigation";

export async function createSessionAction(prevState, formData) {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        return { error: "You must be logged in to create a session." };
    }

    const { data: existingSession } = await supabase
        .from("sessions")
        .select("join_code")
        .eq("host_id", user.id)
        .eq("status", "active")
        .gt("expires_at", new Date().toISOString())
        .maybeSingle();

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
                new URL(rawLogoUrl);
                logoUrl = rawLogoUrl;
            } catch {
                return { error: "Please enter a valid logo URL." };
            }
        }
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
        if (result.error.code !== "23505") break; // not a duplicate join_code, stop retrying
    }

    if (!session) {
        console.error("Failed to create session:", insertError);
        return { error: "Something went wrong creating your session. Please try again." };
    }

    redirect(`/session/${session.join_code}`);
}