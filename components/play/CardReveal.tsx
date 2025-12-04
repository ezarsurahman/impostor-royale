'use client'
import { useGameStore } from "@/store/gameStore"
import { useState, useMemo } from "react"
import { Button } from "../common/Button"
import Image from "next/image"
import blurHashes from "@/data/blurHashes.json"
import { decode } from "blurhash"

export const CardReveal = () => {
    const {
        trueCard,
        imposterCard,
        imposterPlayerId,
        players,
        nextPhase
    } = useGameStore()
    const [currentPlayerIdx, setCurrenPlayerIdX] = useState<number>(0);
    const [currentPhase, setCurrentPhase] = useState<number>(0);
    const currentCard = players[currentPlayerIdx].id === imposterPlayerId ? imposterCard : trueCard
    
    // Convert BlurHash to data URL
    const blurDataURL = useMemo(() => {
        if (!currentCard) return "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAwIiBoZWlnaHQ9IjUwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNTAwIiBoZWlnaHQ9IjUwMCIgZmlsbD0iIzMzMyIvPjwvc3ZnPg==";
        
        const hash = blurHashes[currentCard as keyof typeof blurHashes];
        if (!hash) return "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAwIiBoZWlnaHQ9IjUwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNTAwIiBoZWlnaHQ9IjUwMCIgZmlsbD0iIzMzMyIvPjwvc3ZnPg==";
        
        try {
            const pixels = decode(hash, 32, 32);
            const canvas = document.createElement('canvas');
            canvas.width = 32;
            canvas.height = 32;
            const ctx = canvas.getContext('2d');
            if (!ctx) return "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAwIiBoZWlnaHQ9IjUwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNTAwIiBoZWlnaHQ9IjUwMCIgZmlsbD0iIzMzMyIvPjwvc3ZnPg==";
            
            const imageData = ctx.createImageData(32, 32);
            imageData.data.set(pixels);
            ctx.putImageData(imageData, 0, 0);
            return canvas.toDataURL();
        } catch (e) {
            return "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAwIiBoZWlnaHQ9IjUwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNTAwIiBoZWlnaHQ9IjUwMCIgZmlsbD0iIzMzMyIvPjwvc3ZnPg==";
        }
    }, [currentCard]);
    
    const nextPerson = () => {
        if (currentPlayerIdx == players.length - 1) {
            nextPhase()
        } else {
            setCurrenPlayerIdX(currentPlayerIdx + 1)
            setCurrentPhase(0)
        }
    }
    
    return (
        <div className="flex flex-col items-center justify-center gap-7 py-5"> 
            {currentPhase == 0 && (
                <>
                    <div className="flex items-center justify-center px-9 py-1 rounded-full border border-2 border-cr-gold bg-linear-to-b from-[#7acdff] to-[#1a6ed2]">
                        <p className="text-[60px] text-cr-gold">
                            {currentPlayerIdx + 1}
                        </p>
                    </div>
                    <div className="flex flex-col items-center justify-center gap-2">
                        <p className=" text-3xl text-effect text-cr-gold">Player {currentPlayerIdx+1}</p>
                        <p className="text-white text-center">Make sure no one else can see the screen!</p>
                    </div>
                    <Button type="yellow" onClick={() => setCurrentPhase(1)}>
                        <p className="text-white text-effect-black">Tap to reveal</p>
                    </Button>
                </>
            )}
            {currentPhase == 1 && (
                <>
                    <Image
                        src={`/images/cards/${currentCard}.webp`}
                        alt="card"
                        height={400}
                        width={500}
                        placeholder="blur"
                        blurDataURL={blurDataURL}
                        priority
                    />
                    <Button type="blue" onClick={nextPerson}>
                        <p className="text-white">Hide Card</p>
                    </Button>
                </>
            )}
            <div className="flex gap-3">
                {Array.from({length:2}, (_,index) => {
                    return (
                        <div key={index} className={`h-5 w-5 rounded-full bg-cr-gold ${index !== currentPhase && "opacity-30"}`}>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}