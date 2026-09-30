"use client";

import { useActionState } from "react";
import { createSessionAction } from "@/app/dashboard/create-session/action";
import { planAllowsLogo } from "@/lib/sessions";
import ActiveSessionNotice from "./ActiveSession";
import Link from "next/link";

export default function CreateSession({ plan, activeSession  }) {
    const [state, formAction, isPending] = useActionState(createSessionAction, { error: null });
    const isBlocked = !!activeSession;

    return (
        <>
            <ActiveSessionNotice session={activeSession} />

            <form action={formAction} className="flex flex-col items-center w-full max-w-xs">
                <div className="flex flex-col gap-4 font-main text-white w-full max-w-s mb-6">
                    <label htmlFor="name" className="text-sm">Enter session name</label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        maxLength={50}
                        required
                        className="border border-[#333] rounded-lg px-4 py-3 text-sm text-[#ccc]"
                    />
                </div>

                {planAllowsLogo(plan) && (
                    <div className="flex flex-col gap-4 font-main text-white w-full max-w-xs mb-6">
                        <label htmlFor="logoUrl" className="text-sm">Your logo (optional)</label>
                        <input
                            id="logoUrl"
                            name="logoUrl"
                            type="url"
                            placeholder="https://yoursite.com/logo.png"
                            disabled={isBlocked}
                            className="border border-[#333] rounded-lg px-4 py-3 text-sm text-[#ccc]"
                        />
                    </div>
                )}

                {state?.error && (
                    <p className="text-sm text-red-400 mb-4 w-full max-w-xs text-center">
                        {state.error}
                    </p>
                )}

                <button
                    type="submit"
                    disabled={isPending || isBlocked}
                    className="flex w-full max-w-xs cursor-pointer items-center justify-center gap-2 rounded-full border border-white py-3 text-sm font-medium text-white transition-all duration-300 hover:bg-white hover:text-black disabled:cursor-not-allowed disabled:opacity-70"
                >
                    Create Session
                </button>

                  {isBlocked && (
                    <Link
                        href={`/session/${activeSession.join_code}`}
                        className="mt-3 flex w-full max-w-xs items-center justify-center rounded-full bg-white py-3 text-sm font-medium text-black transition-all duration-300 hover:bg-white/90"
                    >
                        Go to your session
                    </Link>
                )}
            </form>
        </>
    );
} 