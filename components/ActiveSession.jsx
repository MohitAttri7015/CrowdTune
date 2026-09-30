"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function ActiveSessionNotice({ session }) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setVisible(true), 50);
        return () => clearTimeout(timer);
    }, []);

    if (!session) return null;

    return (
        <div
            className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-xs px-4 transition-all duration-500 ${
                visible ? "translate-y-0 opacity-100" : "-translate-y-8 opacity-0"
            }`}
        >
            <div className="rounded-xl border border-white/10 bg-[#171717] px-4 py-3 text-center font-main text-white shadow-lg">
                <p className="text-sm font-medium">You already have an active session</p>
                <p className="mt-1 text-xs text-white/50">"{session.name}" is still running</p>
            </div>
        </div>
    );
}