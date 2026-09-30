"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ExpiryWatcher({ expiresAt }) {
    const router = useRouter();

    useEffect(() => {
        if (!expiresAt) return;
        const expiryTime = new Date(expiresAt).getTime();

        const checkExpiry = () => {
            if (Date.now() >= expiryTime) {
                router.refresh();
            }
        };

        // Best-effort countdown while the tab stays open and active
        const msUntilExpiry = expiryTime - Date.now();
        const timer = msUntilExpiry > 0 ? setTimeout(checkExpiry, msUntilExpiry) : null;

        // Catches the case where the timer above was paused in the background —
        // re-checks the real clock the moment the user comes back
        const handleVisibility = () => {
            if (!document.hidden) checkExpiry();
        };
        document.addEventListener("visibilitychange", handleVisibility);

        return () => {
            if (timer) clearTimeout(timer);
            document.removeEventListener("visibilitychange", handleVisibility);
        };
    }, [expiresAt, router]);

    return null;
}