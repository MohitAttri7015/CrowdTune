"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LoginWithGoogle() {
  const router = useRouter();
  const supabase = createClient();
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      console.error("Google login failed:", error.message);
      setIsLoading(false);
      return;
    }

    router.refresh();
  };

  return (
    <button
      onClick={handleGoogleLogin}
      disabled={isLoading}
      className="flex w-full max-w-xs cursor-pointer items-center justify-center gap-2 rounded-full border border-white py-3 text-sm font-medium text-white transition-all duration-300 hover:bg-white hover:text-black disabled:cursor-not-allowed disabled:opacity-70"
    >
      {isLoading ? (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
      ) : (
        "Continue with Google"
      )}
    </button>
  );
}
