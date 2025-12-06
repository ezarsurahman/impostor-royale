'use client';

import { useGameStore } from "@/store/gameStore"
import { decode } from "blurhash"
import Image from "next/image"
import blurHashes from "@/data/blurHashes.json"
import { Button } from "../common/Button"
import { motion } from "framer-motion"
import Confetti from 'react-confetti'
import { useEffect, useState } from "react"

export const Result = () => {
    const {
        imposterCard,
        trueCard,
        winner,
        players,
        resetGame,
        playAgain

    } = useGameStore()

    const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })

    useEffect(() => {
        const updateSize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight
            })
        }
        
        updateSize()
        window.addEventListener('resize', updateSize)
        return () => window.removeEventListener('resize', updateSize)
    }, [])
// 
    const isCrew = winner == "crew"

    const blurDataURL = (card:string | null) => {
        if (!card) return "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAwIiBoZWlnaHQ9IjUwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNTAwIiBoZWlnaHQ9IjUwMCIgZmlsbD0iIzMzMyIvPjwvc3ZnPg==";
        
        const hash = blurHashes[card as keyof typeof blurHashes];
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
    };

    return (
        <div className="h-full flex flex-col py-5 items-center justify-center gap-10 md:px-40">
            {/* Gold confetti for crew wins */}
            {isCrew && (
                <Confetti
                    width={windowSize.width}
                    height={windowSize.height}
                    colors={['#FFD700', '#FFA500', '#FFED4E', '#d28f1a', '#ffe27a']}
                    numberOfPieces={300}
                    recycle={true}
                    gravity={0.3}
                />
            )}
            
            {/* Red falling particles for impostor wins */}
            {!isCrew && (
                <Confetti
                    width={windowSize.width}
                    height={windowSize.height}
                    colors={['#ff0000', '#cc0000', '#990000', '#ff3333', '#8B0000']}
                    numberOfPieces={200}
                    recycle={true}
                    gravity={0.5}
                    wind={0}
                    initialVelocityY={20}
                />
            )}

            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ 
                    delay: 0,
                    type: "spring",
                    stiffness: 150,
                    damping: 30
                }}
                className="w-full"
            >
                {isCrew ? (
                    <div className="bg-linear-to-b from-[#ffe27a] w-full py-5 to-[#d28f1a] border-2 border-cr-gold rounded-lg flex items-center justify-center">
                        <p className="text-white text-effect-black text-4xl text-center">Victory!</p>
                    </div>
                ) : (
                    <div className="bg-linear-to-b from-[#ff7a7a] w-full py-5 to-[#d21a1a] border-2 border-red-500 rounded-lg flex items-center justify-center">
                        <p className="text-white text-effect-black text-4xl text-center">Impostor Wins!</p>
                    </div>
                )}
            </motion.div>

            <motion.div 
                className="grid grid-cols-2"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ 
                    delay: 0.3,
                    type: "spring",
                    stiffness: 150,
                    damping: 30
                }}
            >
                <div className="flex flex-col">
                    <p className="text-white text-effect-black text-center">True Card</p>
                    <Image
                        src={`/images/cards/${trueCard}.webp`}
                        alt="card"
                        height={500}
                        width={500}
                        placeholder="blur"
                        blurDataURL={blurDataURL(trueCard)}
                        priority
                        className="md:h-[400px] md:object-contain"
                    />
                </div>
                <div className="flex flex-col">
                    <p className="text-white text-effect-black text-center">Impostor Card</p>
                    <Image
                        src={`/images/cards/${imposterCard}.webp`}
                        alt="card"
                        height={500}
                        width={500}
                        placeholder="blur"
                        blurDataURL={blurDataURL(imposterCard)}
                        priority
                        className="md:h-[400px] md:object-contain"
                    />
                </div>
            </motion.div>

            <motion.div 
                className="flex flex-col gap-2 items-center text-center"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ 
                    delay: 0.6,
                    type: "spring",
                    stiffness: 150,
                    damping: 30
                }}
            >
                <p className="text-white text-xl">
                    The imposter was: 
                </p>
                <p className="text-2xl text-red-400 text-effect-red">{players.find(p => p.id === useGameStore.getState().imposterPlayerId)?.name}</p>
            </motion.div>

            <motion.div 
                className="flex flex-col gap-3 items-center justify-center w-full md:px-50"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ 
                    delay: 0.9,
                    type: "spring",
                    stiffness: 150,
                    damping: 30
                }}
            >
                <Button type="yellow" className="w-full" onClick={playAgain}>
                    <p className="text-2xl text-white text-effect-black">Play Again</p>
                </Button>
                <Button type="blue" className="w-full" onClick={resetGame}>
                    <p className="text-2xl text-white text-effect-black">Home</p>
                </Button>
            </motion.div>
        </div>
    )
}