import { Button } from "@/components/common/Button"

export const Home = () => {
    return (
        <div className="h-full flex flex-col items-center justify-center p-20">
            <div className="flex flex-col items-center justify-center gap-5">
                <p className="text-[2.5rem] text-center text-cr-gold text-effect"><span className="text-red-400 text-effect-red">Imposter</span> Royale</p>
                <a href="/play">
                    <Button type="yellow">
                        <p className="text-black">Play</p>
                    </Button>
                </a>
            </div>
        </div>
    )
}