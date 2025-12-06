import { useGameStore } from "@/store/gameStore";
import { Button } from "../common/Button"
import { motion } from "framer-motion"

interface PlayerCountProps {    
    handleStartGame : () => void
}



export const PlayerCount = ({ handleStartGame } : PlayerCountProps) => {
    const { 
        gamePhase, 
        playerCount, 
        players,
        trueCard,
        imposterCard,
        winner,
        setPlayerCount, 
        startGame,
        votePlayer,
        nextPhase,
        resetGame
      } = useGameStore();

      const decPlayerCount = () => {
        if (playerCount - 1 < 3) {
            return
        }
        setPlayerCount(playerCount-1)
      }
      const incPlayerCount = () => {
        if (playerCount + 1 > 10) {
            return
        }
        setPlayerCount(playerCount+1)
      }

    return (
        <div className="py-20 px-10 flex flex-col items-center justify-center gap-4">
            <motion.h1 
                className="text-4xl font-cr text-cr-gold text-effect text-center"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ 
                    type: "spring",
                    stiffness: 500,
                    damping: 15
                }}
            >
                How many players?
            </motion.h1>
            
            <motion.div 
                className="flex flex-col rounded-xl border-2 border-cr-gold px-10 py-5 bg-linear-to-b from-[#ffe27a] to-[#d28f1a] gap-5"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ 
                    delay: 0.2,
                    type: "spring",
                    stiffness: 500,
                    damping: 15
                }}
            >
                <div className="flex gap-5">
                    <Button
                        type="blue"
                        onClick={decPlayerCount}
                        className=""
                    >
                        <p className="text-white">—</p>
                    </Button>
                    <Button
                        type="blue"
                        className="border-cr-gold hover:scale-100! " 
                    >
                        <p className="text-white text-effect-white">{playerCount}</p>
                    </Button>
                    <Button
                        type="blue"
                        onClick={incPlayerCount}
                    >
                        <p className="text-white">+</p>
                    </Button>
                </div>
                <p className="text-blue text-center text-white text-effect-white">3 - 10 Players</p>
            </motion.div>

            <div className="flex flex-wrap items-center justify-center gap-2 max-w-screen">
                {Array.from({length:playerCount}, (_,index) => {
                    return (
                        <motion.div 
                            key={index} 
                            className="h-10 w-10 flex border-2 items-center justify-center text-center rounded-full  border-cr-gold bg-linear-to-b from-[#ffe27a] to-[#d28f1a] "
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ 
                                delay: 0.4 + (index * 0.1),
                                type: "spring",
                                stiffness: 500,
                                damping: 15
                            }}
                        >
                            <p className="text-white text-effect-white">{index+1}</p>
                        </motion.div>
                    )
                })}
            </div>

            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ 
                    delay: 0.4 + (playerCount * 0.1),
                    type: "spring",
                    stiffness: 500,
                    damping: 15
                }}
            >
                <Button type="yellow" className="" onClick={handleStartGame}>
                    <p className="text-white text-effect-black">Start Game</p>
                </Button>
            </motion.div>
        </div>
    )
}