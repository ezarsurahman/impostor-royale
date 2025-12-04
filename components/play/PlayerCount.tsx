import { useGameStore } from "@/store/gameStore";
import { Button } from "../common/Button"

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
            <h1 className="text-4xl font-cr text-cr-gold text-effect text-center">How many players?</h1>
            
            <div className="flex flex-col rounded-xl border-2 border-cr-gold px-10 py-5 bg-linear-to-b from-[#ffe27a] to-[#d28f1a] gap-5">
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
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2 max-w-screen">
                {Array.from({length:playerCount}, (_,index) => {
                    return (
                        <div key={index} className="h-10 w-10 flex border-2 items-center justify-center text-center rounded-full  border-cr-gold bg-linear-to-b from-[#ffe27a] to-[#d28f1a] ">
                            <p className="text-white text-effect-white">{index+1}</p>
                        </div>
                    )
                })}
            </div>

            <Button type="yellow" className="" onClick={handleStartGame}>
            <p className="text-white text-effect-black">Start Game</p>
            </Button>
        </div>
    )
}