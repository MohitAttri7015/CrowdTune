import Image from "next/image";
import { MoveUpLeft } from 'lucide-react';
import Link from "next/link";
import { createClient } from '@/lib/supabase/server';
import Ferrofluid from "@/components/Ferrofluid";
import LogoutButton from '@/components/auth/logoutBtn';

export default async function DashboardPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    return (
        <div className="flex w-full h-screen items-center justify-center p-2 sm:p-6 relative">
            {/* Background */}
            <div className="absolute inset-0 z-0">
                <Ferrofluid
                    colors={["#ffffff", "#ffffff", "#ffffff"]}
                    speed={0.5}
                    scale={1.6}
                    turbulence={1}
                    fluidity={0.1}
                    rimWidth={0.2}
                    sharpness={2.5}
                    shimmer={1.5}
                    glow={2}
                    flowDirection="down"
                    opacity={1}
                    mouseInteraction
                    mouseStrength={1}
                    mouseRadius={0.35}
                />
            </div>
            <div className="w-full max-w-sm  rounded-2xl border border-neutral-200 p-2 relative z-2">

                <Link href='/' className="mt-2 inline-block bg-neutral-900 transition-colors hover:bg-neutral-800 text-white p-2 rounded-full">
                    <MoveUpLeft
                        className="w-4 h-4"
                    />
                </Link>

                <div className="p-4 sm:p-6">
                    {/* Avatar + identity */}
                    <div className="flex flex-col items-center text-center">
                        <div className="relative h-20 w-20 overflow-hidden rounded-full bg-neutral-100 sm:h-24 sm:w-24">
                            <Image
                                src={user?.user_metadata?.avatar_url || "/default-avatar.png"}
                                alt="Avatar"
                                fill
                                priority
                                sizes="96px"
                                className="object-cover"
                            />
                        </div>

                        <h2 className="mt-4 text-lg font-medium text-neutral-900 sm:text-xl font-main">
                            {user?.user_metadata?.full_name || "Anonymous User"}
                        </h2>
                        <p className="mt-1 text-sm text-neutral-500 font-main">{user?.email}</p>

                    </div>

                    <div className="mt-6 border-t border-neutral-100 pt-4 font-main">
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-neutral-500 font-medium">Plan</span>
                            <span className="font-bold text-neutral-800">
                                Free
                            </span>
                        </div>
                    </div>


                    {/* Meta */}
                    <div className="mt-2 border-t border-neutral-100 font-main">
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-neutral-500 font-medium">Member since</span>
                            <span className="font-bold text-neutral-800">
                                {new Date(user?.created_at).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "long",
                                })}
                            </span>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="mt-6 flex flex-col gap-2 sm:flex-row">
                        <LogoutButton />
                    </div>
                </div>
            </div>
        </div>
    )
}