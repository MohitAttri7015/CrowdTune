"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LoginWithGoogle() {
  const router = useRouter();
  const supabase = createClient();


  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  };


  return(
    
      <button
        onClick={handleGoogleLogin}
        className="w-full text-white max-w-xs border border-white cursor-pointer rounded-full py-3 text-sm font-medium hover:bg-white hover:text-black transition-all duration-300"
      >
        Continue with Google
      </button>
  )

}