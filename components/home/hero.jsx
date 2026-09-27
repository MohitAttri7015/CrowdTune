"use client";

import Link from "next/link";
import { ChevronsRight } from "lucide-react";
import dynamic from "next/dynamic";
import { useUser } from "@/hooks/useUser";
import PauseWhenHidden from "@/components/PauseWhenHidden"




const LiquidGlassCluster = dynamic(
    () => import("./LiquidGlassCluster"),
    {
        ssr: false,
    }
);


export default function Hero() {
    const { user } = useUser();

    return (
        <div className="relative w-full md:min-h-screen h-screen flex flex-col items-center justify-between px-4 md:px-8 py-8">
            <div className="absolute inset-0 z-1 w-full h-full">
                <PauseWhenHidden>
                    <LiquidGlassCluster
                        shape="Logo"
                        logo="/headphones.png"
                        removeBackground={true}
                        backgroundTolerance={40}
                        className="w-full h-full" />
                </PauseWhenHidden>
            </div>
            <div className=""></div>
            <div className="w-full relative flex justify-center select-none">
                <h1 className="text-center md:text-6xl sm:text-5xl text-2xl mobile:text-4xl font-bold font-main text-black lg:w-[60%]">Let everyone vote on what plays next</h1>
            </div>
            <div className="w-full relative z-2 flex flex-col items-center justify-center gap-8">
                <p className="text-center text-[14px] font-main lg:w-[45%] font-medium leading-4">Share a QR code and your guests add and vote on songs from their own phones. No app, no signup. The top-voted song plays next.</p>

                <div className="w-full flex justify-center gap-4 font-main font-medium text-[13px]">
                    <Link
                        href={user ? "/dashboard" : "/auth/login"}
                        className="group flex items-center gap-2 bg-black text-white px-2 py-2 hover:bg-white hover:text-black transition-all duration-500 hover:border-black border border-black"
                    >

                        <span className="bg-white px-2 py-1 group-hover:bg-black group-hover:text-white transition-all duration-500 border border-black">
                            <ChevronsRight size={20} className="group-hover:text-white text-black" />
                        </span>
                        Start a Session
                    </Link>
                    <Link href="#how-it-works" className="border flex items-center border-black text-black px-4 py-2 hover:bg-black hover:text-white transition-all duration-500">

                        How it works
                    </Link>
                </div>
            </div>
        </div>
    )
}