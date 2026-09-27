import ProcessCard from "./processCard";

export default function HowItWork() {
  return (
    <div id="how-it-works" className="w-full mt-30 px-4 md:px-8 py-6">
        <div className="flex w-full flex-col gap-6 items-center justify-center mb-20">
            <div className="flex flex-col font-main font-bold text-3xl items-center">
                <h1>How does</h1>
                <h1>the process work?</h1>
            </div>
            <p className="text-center font-main  text-[14px] text-gray-500 md:w-[30%]">
                 No app to download and no account for guests. Just three simple steps, and the music is finally decided by the whole room</p>
        </div>

        <ProcessCard />
    </div>
  );
}