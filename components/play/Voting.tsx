'use client'
import { useGameStore } from "@/store/gameStore"
import { Button } from "../common/Button"
import { useState } from "react"

export const Voting = () => {
    const {
        players,
        votePlayer,
        imposterPlayerId
    } = useGameStore()

    const [showModal, setShowModal] = useState(false)
    const [notImpostorName, setNotImpostorName] = useState<string | null>()
    const [showNotImpostorModal, setShowNotImpostorModal] = useState(false)
    const [selectedPlayer, setSelectedPlayer] = useState<{ id: string; name: string } | null>(null)

    const handleVoteClick = (player: { id: string; name: string }) => {
        setSelectedPlayer(player)
        setShowModal(true)
    }

    const confirmVote = () => {
        if (selectedPlayer) {
            votePlayer(selectedPlayer.id)
        }
        setShowModal(false)
        setSelectedPlayer(null)

        const alivePlayers = players.filter((p) => p.isAlive);
        if(selectedPlayer?.id !== imposterPlayerId && alivePlayers.length > 2) {
            setShowNotImpostorModal(true)
            setNotImpostorName(selectedPlayer?.name || "")
        }
    }

    const closeNotImpostorModal = () => {
        setNotImpostorName(null)
        setShowNotImpostorModal(false)
    }

    const cancelVote = () => {
        setShowModal(false)
        setSelectedPlayer(null)
    }

    return (
        <>
            <div className="flex flex-col h-full py-20 gap-10 items-center justify-center">
                <p className="text-cr-gold text-effect text-3xl text-center">Who is the Impostor?</p>
                <div className="flex flex-col justify-center items-center text-white gap-3">
                    {players.map((player) => (
                        <Button 
                            key={player.id} 
                            className="flex" 
                            type="blue"
                            onClick={() => handleVoteClick(player)}
                            disabled={!player.isAlive}
                        >
                            <p className="text-2xl text-effect-white">{player.name}</p>
                        </Button>
                    ))}
                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/40 bg-opacity-70 flex items-center justify-center z-50">
                    <div className="bg-gradient-to-b from-[#ffe27a] to-[#d28f1a] border-2 border-cr-gold rounded-xl p-8 flex flex-col gap-6 items-center max-w-md">
                        <p className="text-2xl text-center font-cr ">
                            Are you sure you want to vote out <span className="font-bold">{selectedPlayer?.name}</span>?
                        </p>
                        <div className="flex gap-4">
                            <Button type="blue" onClick={confirmVote}>
                                <p className="text-white text-xl text-effect-black">Yes</p>
                            </Button>
                            <Button type="yellow" onClick={cancelVote}>
                                <p className="text-black text-xl text-effect-white">No</p>
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {showNotImpostorModal && (
                <div className="fixed inset-0 bg-black/40 bg-opacity-70 flex items-center justify-center z-50">
                    <div className="bg-gradient-to-b from-[#ff7a7a] to-[#d21a1a] border-2 border-red-500 rounded-xl p-8 flex flex-col gap-6 items-center max-w-md">
                        <p className="text-3xl text-center font-cr text-white text-effect-black">
                            Wrong Choice!
                        </p>
                        <p className="text-xl text-center font-cr text-white">
                            <span className="font-bold">{notImpostorName}</span> is NOT the Impostor!
                        </p>
                        <Button type="blue" onClick={closeNotImpostorModal}>
                            <p className="text-white text-xl text-effect-black">Continue</p>
                        </Button>
                    </div>
                </div>
            )}
        </>
    )
}