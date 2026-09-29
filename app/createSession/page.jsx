import SlideRays from '@/components/SideRays'
import PauseWhenHidden from "@/components/PauseWhenHidden"
import CreateSession from '@/components/CreateSession'


export default function SessionPage() {
    return (
        <div className='w-full h-screen relative bg-black'>
            <div className="absolute inset-0 z-0">
                <PauseWhenHidden>
                    <SlideRays />
                </PauseWhenHidden>
            </div>
            <div className="absolute inset-0 z-0">
                <PauseWhenHidden>
                    <SlideRays origin='top-left' />
                </PauseWhenHidden>
            </div>

            <div className="relative z-20 flex min-h-screen flex-col items-center justify-center px-4 font-main">
                <h1 className="mb-6 text-2xl font-bold text-white">
                    Create a new Session
                </h1>

                <CreateSession />
            </div>
        </div>
    
    )
}