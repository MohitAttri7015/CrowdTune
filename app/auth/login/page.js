"use client";

import { createClient } from "@/lib/supabase/client";

export default function Login() {
  const supabase = createClient();

  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center px-4 font-main">
      <h1 className="text-2xl font-bold mb-2">Host login</h1>
      <p className="text-sm text-gray-500 mb-8 text-center">
        Log in to start a session or manage your venue.
      </p>

      <button
        onClick={handleGoogleLogin}
        className="w-full max-w-xs border border-black rounded-full py-3 text-sm font-medium hover:bg-black hover:text-white transition-all duration-300"
      >
        Continue with Google
      </button>
    </div>
  );
}