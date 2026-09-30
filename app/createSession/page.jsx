import SlideRays from '@/components/SideRays'
import PauseWhenHidden from "@/components/PauseWhenHidden"
import CreateSession from '@/components/CreateSession'
import { createClient } from '@/lib/supabase/server';
import { notExpiredFilter } from '@/lib/sessions';
import { redirect } from 'next/navigation';



export default async function SessionPage() {

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) redirect("/auth/login");

     const { data: profile } = await supabase
        .from("profiles")
        .select("plan")
        .eq("id", user.id)
        .single();

    const { data: activeSession } = await supabase
        .from("sessions")
        .select("join_code, name")
        .eq("host_id", user.id)
        .eq("status", "active")
        .or(notExpiredFilter())
        .maybeSingle();

    return (
        <div className='w-full h-screen relative bg-black'>
            <div className="absolute inset-0 z-0">
                <PauseWhenHidden>
                    <SlideRays />
                </PauseWhenHidden>
            </div>
            <div className="absolute inset-0 z-0">
                <PauseWhenHidden>
                    <SlideRays origin='top-left' />
                </PauseWhenHidden>
            </div>

            <div className="relative z-20 flex min-h-screen flex-col items-center justify-center px-4 font-main">
                <h1 className="mb-6 text-2xl font-bold text-white">
                    Create a new Session
                </h1>

                <CreateSession plan={profile?.plan ?? "free"} activeSession={activeSession} />
            </div>
        </div>

    )
}