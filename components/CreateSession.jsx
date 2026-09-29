"use client";

import { useState } from "react";

export default function CreateSession() {
    const [isLoading, setIsLoading] = useState(false);

    return (
        <>
            <div className="flex flex-col gap-4 font-main text-white w-full max-w-xs mb-6">
                <label className="text-sm ">Enter session name</label>

                <input type="text" className="border border-[#333] rounded-lg px-4 py-2 text-sm text-[#ccc]"/>
            </div>

            <button
                className="flex w-full max-w-xs cursor-pointer items-center justify-center gap-2 rounded-full border border-white py-3 text-sm font-medium text-white transition-all duration-300 hover:bg-white hover:text-black disabled:cursor-not-allowed disabled:opacity-70"
            >
                {isLoading ? (
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                ) : (
                    "Create Session"
                )}
            </button>
        </>
    );
}
