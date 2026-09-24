import {
  QrCode,
  Smartphone,
  ListMusic,
} from "lucide-react";

const processData = [
  {
    description: "The host starts a session in seconds and gets a QR code and link to share",
    icon: QrCode,
    heading: "Start a session",
  },
  {
    description: "Guests scan the code, type a name, and add songs. No app, no signup",
    icon: Smartphone,
    heading: "Everyone joins",
  },
  {
    description: "Upvote or downvote and watch the queue update live. The top song plays next",
    icon: ListMusic,
    heading: "The room decides",
  },
];

export default function ProcessCard() {
  return (
    <div className="mx-auto w-full max-w-[1200px]">
      <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {processData.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={index}
              className="
              font-main
                group
                relative
                md:min-h-[500px]
                min-h-[400px]
                w-full
                rounded-3xl
                border border-black/10
                bg-[#f5f5f5]
                p-6
                flex flex-col
                justify-between
                overflow-hidden
                transition-all duration-300
                hover:-translate-y-1
                hover:bg-black
              "
            >
              {/* Description */}
              <p
                className="
                  max-w-[280px]
                  text-sm
                  font-medium
                  leading-6
                  text-black/50
                  transition-colors duration-300
                  group-hover:text-white
                "
              >
                {item.description}
              </p>

              {/* Icon */}
              <div className="flex items-center justify-center">
                <div
                  className="
                    flex
                    h-20
                    w-20
                    items-center
                    justify-center
                    rounded-full
                    border border-black/10
                    bg-white
                    transition-all duration-300
                    group-hover:scale-110
                    group-hover:border-white/20
                  "
                >
                  <Icon
                    size={32}
                    strokeWidth={1.5}
                    className="text-black"
                  />
                </div>
              </div>

              {/* Heading */}
              <div className="flex items-end justify-between">
                <h3
                  className="
                    text-2xl
                    font-bold
                    text-black
                    transition-colors duration-300
                    md:text-3xl
                    group-hover:text-white
                    md:w-[50%]
                  "
                >
                  {item.heading}
                </h3>

                <span
                  className="
                    text-sm
                    text-black/30
                    transition-colors duration-300
                    group-hover:text-white/40
                  "
                >
                  0{index + 1}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}