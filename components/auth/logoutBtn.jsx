"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LogoutButton() {
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  return (
    <button
      onClick={handleLogout}
      className="border border-black rounded-full px-6 py-2 text-sm font-medium font-main transition-all hover:bg-black hover:text-white"
    >
      Log out
    </button>
  );
}