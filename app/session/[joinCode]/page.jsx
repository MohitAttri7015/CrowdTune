import { createClient } from '@/lib/supabase/server';
import { redirect, notFound } from 'next/navigation';
import Link from 'next/link';
import ExpiryWatcher from '@/components/ExpiryWatcher';

export default async function SessionDetailPage({ params }) {
    const { joinCode } = await params;
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) redirect("/auth/login");

    const { data: session } = await supabase
        .from("sessions")
        .select("name, join_code, host_id, expires_at")
        .eq("join_code", joinCode)
        .single();

    if (!session) notFound();
    if (session.host_id !== user.id) redirect("/dashboard");

    const isExpired = session.expires_at && new Date(session.expires_at) < new Date();

    if (isExpired) {
        return (
            <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-black px-4 font-main text-white">
                <h1 className="text-2xl font-bold">This session has expired</h1>
                <p className="text-sm text-white/50">"{session.name}" is no longer active.</p>

                <Link
                    href="/createSession"
                    className="rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition-all duration-300 hover:bg-white/90"
                >
                    Create a new session
                </Link>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-black px-4 font-main text-white">
            <ExpiryWatcher expiresAt={session.expires_at} />

            <h1 className="text-2xl font-bold">{session.name}</h1>

            <div className="flex flex-col items-center gap-2 rounded-xl border border-[#333] px-8 py-6">
                <span className="text-xs uppercase tracking-wide text-white/40">Join Code</span>
                <span className="text-4xl font-bold tracking-widest">{session.join_code}</span>
            </div>
        </div>
    );
}