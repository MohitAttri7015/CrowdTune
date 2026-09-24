import { Check } from "lucide-react";

export default function PricingCard({
  name,
  price,
  description,
  features,
  buttonText,
  popular = false,
  variant = "default",
  icon: Icon,
  onButtonClick,
}) {
  const isPro = variant === "pro";
  const isAdvance = variant === "advance";

  return (
    <div
      className={`
        group relative flex w-full flex-col overflow-hidden
        rounded-2xl border p-5
        transition-all duration-300
        hover:-translate-y-1
        ${
          isPro
            ? "border-white/20 bg-[#171717]"
            : isAdvance
              ? "border-emerald-500/30 bg-[#151916]"
              : "border-white/10 bg-[#151515]"
        }
      `}
    >
      {/* Background glow */}
      <div
        className={`
          pointer-events-none absolute -right-8 -top-8
          h-24 w-24 rounded-full blur-2xl
          opacity-30
          ${
            isPro
              ? "bg-white"
              : isAdvance
                ? "bg-emerald-500"
                : "bg-blue-500"
          }
        `}
      />

      {/* Top section */}
      <div className="relative">
        <div className="flex items-start justify-between">
          {/* Icon */}
          <div
            className={`
              flex h-8 w-8 items-center justify-center
              rounded-md border
              ${
                isAdvance
                  ? "border-emerald-400/30 bg-emerald-400/20 text-emerald-300"
                  : isPro
                    ? "border-white/30 bg-white/80 text-black"
                    : "border-blue-400/30 bg-blue-500/20 text-blue-300"
              }
            `}
          >
            {Icon && <Icon size={17} strokeWidth={1.8} />}
          </div>

          {/* Popular badge */}
          {popular && (
            <span className="rounded-full border border-white/10 bg-white/10 px-2.5 py-1 text-[9px] font-medium uppercase tracking-wide text-white/70">
              ★ Popular
            </span>
          )}
        </div>

        {/* Plan name */}
        <h3 className="mt-7 text-lg font-medium text-white">
          {name}
        </h3>

        {/* Price */}
        <div className="mt-4 flex items-baseline">
          <span className="text-3xl font-medium tracking-tight text-white">
            ${price}
          </span>

          {price !== "Custom" && (
            <span className="ml-1 text-xs text-white/40">
              /month
            </span>
          )}
        </div>

        {/* Description */}
        <p className="mt-3 min-h-[48px] text-xs leading-5 text-white/40">
          {description}
        </p>
      </div>

      {/* Button */}
      <button
        onClick={onButtonClick}
        className={`
          relative mt-6 h-10 w-full rounded-md
          text-xs font-medium
          transition-all duration-200
          cursor-pointer
          ${
            isPro
              ? "bg-white text-black hover:bg-white/90"
              : "border border-white/10 bg-white/10 text-white hover:bg-white/15"
          }
        `}
      >
        {buttonText}
      </button>

      {/* Divider */}
      <div className="my-6 flex items-center gap-3">
        <div className="h-px flex-1 bg-white/10" />

        <span className="text-[8px] uppercase tracking-wider text-white/25">
          Stand out features
        </span>

        <div className="h-px flex-1 bg-white/10" />
      </div>

      {/* Features */}
      <div className="space-y-4">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex items-start gap-3"
          >
            <div className="mt-0.5 flex h-3.5 w-3.5 shrink-0 items-center justify-center text-white/40">
              <Check size={12} strokeWidth={2} />
            </div>

            <span className="text-[11px] leading-4 text-white/65">
              {feature}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}