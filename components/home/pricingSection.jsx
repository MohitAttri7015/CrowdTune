import {
    Sparkles,
    Zap,
    Building2,
} from "lucide-react";

import PricingCard from "./pricingCard";

const pricingData = [
    {
        name: "Free Plan",
        monthlyPrice: "0",
        description:
            "Anyone trying it out.",
        icon: Sparkles,
        buttonText: "Start for Free",
        variant: "default",
        features: [
            "Up to 15 guests",
            "2-hour session limit",
            "Live voting and shared queue",
            "Manual playback",
        ],
    },

    {
        name: "Party Pass",
        monthlyPrice: "4.99",
        description:
            "Individual hosts",
        icon: Zap,
        buttonText: "Start Pro",
        popular: true,
        variant: "pro",
        features: [
            "Unlimited guests",
            "24-hour session limit",
            "Visual themes for your voting page",
            "Manual playback",
            "Your own logo on the voting page"
        ],
    },

    {
        name: "Venue Plan",
        monthlyPrice: "29",
        description:
            "Bars, cafes, gyms, salons",
        icon: Building2,
        buttonText: "Start Advance",
        variant: "advance",
        features: [
            "Unlimited guests",
            "For a whole month",
            "Most requested songs play automatically",
            "Your own logo on the voting page",
            "Full library of visual themes",
        ],
    },
];

export default function PricingSection() {

    return (
        <section className="w-full bg-[#0b0b0b] px-4 md:px-8 mt-20 0d:py-20 py-10 text-white sm:px-6 lg:px-8">
            <div className="mx-auto w-full max-w-7xl">

                {/* Header */}
                <div className="flex flex-col gap-6 items-center text-center font-main mb-20">

                    <h2 className="font-bold text-3xl">
                        Plans and Pricing
                    </h2>

                    <p className="max-w-lg text-[14px] text-white/40 ">
                        Choose a plan that fits your environment,
                        whether there is a small group or a large venue.
                    </p>


                </div>

                {/* Pricing Cards */}
                <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 font-main">
                    {pricingData.map((plan) => {
                        const Icon = plan.icon;
                        return (
                            <PricingCard
                                key={plan.name}
                                name={plan.name}
                                price={plan.monthlyPrice ? parseFloat(plan.monthlyPrice) : plan.monthlyPrice}
                                description={plan.description}
                                features={plan.features}
                                buttonText={plan.buttonText}
                                buttonHref="/auth/login"
                                popular={plan.popular}
                                variant={plan.variant}
                                icon={<Icon size={17} strokeWidth={1.8} />}
                            />
                        )
                    })}
                </div>

                {/* Bottom text */}
                <p className="mt-6 text-center text-[10px] text-white/30">
                    Start your journey risk free · No credit card needed
                </p>
            </div>
        </section>
    );
}