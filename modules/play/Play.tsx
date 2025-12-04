'use client';


import { Button } from '@/components/common/Button';
import { CardReveal } from '@/components/play/CardReveal';
import { PlayerCount } from '@/components/play/PlayerCount';
import { Result } from '@/components/play/Result';
import { Voting } from '@/components/play/Voting';
import { useGameStore } from '@/store/gameStore';
import { useRouter } from 'next/navigation';

export default function Play() {
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
    resetGame,
    back
  } = useGameStore();
  const router = useRouter();
  
  // Start game with random cards (handled in store)
  const handleStartGame = () => {
    startGame();
  };


  const handleBack = () => {
    if (gamePhase == 'lobby') {
        router.push("/")
    } else {
        back()
    }
  }

  return (
    <div className="min-h-screen p-8">
        { gamePhase == 'lobby' && (
            <p onClick={handleBack} className='text-white cursor-pointer' >Back </p>
        )}
      {/* LOBBY PHASE */}
      {gamePhase === 'lobby' && (
        <PlayerCount handleStartGame={handleStartGame} />
      )}

      {/* CARD REVEAL PHASE */}
      {gamePhase === 'card-reveal' && (
        <CardReveal />
      )}

      {/* VOTING PHASE */}
      {gamePhase === 'voting' && (
        <Voting />
      )}

      {/* RESULTS PHASE */}
      {gamePhase === 'results' && (
        <Result />
      )}
    </div>
  );
}