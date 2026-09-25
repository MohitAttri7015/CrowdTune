"use client"

import Logo from "@/components/logo"
import { MoveUpRight } from 'lucide-react';
import Link from "next/link";
import { useUser } from "@/hooks/useUser";

export default function Nav() {
    const { user, loading } = useUser();

    return (
        <nav className="bg-white/80 w-full flex justify-between items-center absolute top-0 left-0 z-10 px-4 md:px-8 py-8">
            <Logo />
            <div className="flex items-center font-main font-medium text-sm gap-2">
                {!loading && (
                    <span className="md:font-bold">{user ? "HOST" : "LOG IN"}</span>
                )}
                <Link href={user ? "/dashboard" : "/auth/login"} className="border rounded-full px-6 py-2 transition-all hover:bg-black hover:text-white">
                    <MoveUpRight
                        className="w-5 h-5"
                    />
                </Link>
            </div>
        </nav>
    )
}