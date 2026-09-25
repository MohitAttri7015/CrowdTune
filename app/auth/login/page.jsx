"use client";

import LoginWithGoogle from "@/components/auth/loginWGoogle";
import JoinParty from "@/components/auth/joinParty";
import Ferrofluid from "@/components/Ferrofluid";

export default function Login() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black">
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

      {/* Optional dark overlay for readability */}
      <div className="absolute inset-0 z-10 bg-black/40" />

      {/* Login content */}
      <div className="relative z-20 flex min-h-screen flex-col items-center justify-center px-4 font-main">
        <h1 className="mb-2 text-2xl font-bold text-white">
          Host login
        </h1>

        <p className="mb-8 text-center text-sm text-white/70">
          Log in to start a session or manage your venue.
        </p>

        <LoginWithGoogle />
        <JoinParty />
      </div>
    </main>
  );
}
