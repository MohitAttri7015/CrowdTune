"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export function useUser(){
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const supabase = createClient();

        supabase.auth.getUser().then(({ data }) => {
            setUser(data.user);
            setLoading(false);
        })

        const { data: listner } = supabase.auth.onAuthStateChange((event, session) => {
            setUser(session?.user ?? null);
        })

        return () => {
            listner.subscription.unsubscribe();
        }
    }, [])

    return { user, loading };
}