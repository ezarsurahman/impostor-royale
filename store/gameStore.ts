import { create } from 'zustand';
import imposterData from '@/data/imposter.json';

interface Card {
  name: string;
}

interface GameStore {
  trueCard: string | null;
  imposterCard: string | null;
  playerCount: number;
  players: Array<{ id: string; name: string; isAlive: boolean }>;
  votedOutPlayer: string | null;
  gamePhase: 'lobby' | 'card-reveal' | 'voting' | 'results';
  imposterPlayerId: string | null;
  winner: 'imposters' | 'crew' | null;
  
  // Actions
  setPlayerCount: (count: number) => void;
  startGame: () => void;
  votePlayer: (playerId: string) => void; // Single vote for the group
  nextPhase: () => void;
  resetGame: () => void;
  playAgain: () => void;
  back: () => void;
}

export const useGameStore = create<GameStore>((set, get) => ({
  trueCard: null,
  imposterCard: null,
  playerCount: 3,
  players: [],
  votedOutPlayer: null,
  gamePhase: 'lobby',
  imposterPlayerId: null,
  winner: null,

  setPlayerCount: (count) => set({ playerCount: count }),

  startGame: () => {
    const { playerCount } = get();
    
    // Select random cards
    const cardNames = Object.keys(imposterData);
    const randomIndex = Math.floor(Math.random() * cardNames.length);
    const trueCard = cardNames[randomIndex];
    const imposters = imposterData[trueCard as keyof typeof imposterData];
    const randomImposterIndex = Math.floor(Math.random() * imposters.length);
    const imposterCard = imposters[randomImposterIndex];
    
    // Create players
    const players = Array.from({ length: playerCount }, (_, i) => ({
      id: `player-${i + 1}`,
      name: `Player ${i + 1}`,
      isAlive: true,
    }));

    // Select random imposter
    const imposterIndex = Math.floor(Math.random() * players.length);

    set({
      trueCard,
      imposterCard,
      players,
      imposterPlayerId: players[imposterIndex].id,
      gamePhase: 'card-reveal',
      votedOutPlayer: null,
      winner: null,
    });
  },

  votePlayer: (playerId) =>
    set((state) => {
      // Check if imposter was voted out
      const imposterVotedOut = playerId === state.imposterPlayerId;

      if (imposterVotedOut) {
        // Crew wins!
        return {
          ...state,
          votedOutPlayer: playerId,
          winner: 'crew' as const,
          gamePhase: 'results' as const,
        };
      }

      // Eliminate player
      const updatedPlayers = state.players.map((p) =>
        p.id === playerId ? { ...p, isAlive: false } : p
      );

      const alivePlayers = updatedPlayers.filter((p) => p.isAlive);

      // Check if only 2 players left (imposter wins)
      if (alivePlayers.length <= 2) {
        return {
          ...state,
          players: updatedPlayers,
          votedOutPlayer: playerId,
          winner: 'imposters' as const,
          gamePhase: 'results' as const,
        };
      }

      // Continue game - go back to voting for next round
      return {
        ...state,
        players: updatedPlayers,
        votedOutPlayer: playerId,
        gamePhase: 'voting' as const,
      };
    }),

  nextPhase: () =>
    set((state) => {
      if (state.gamePhase === 'card-reveal') {
        return { gamePhase: 'voting' as const };
      }
      if (state.gamePhase === 'results') {
        return { gamePhase: 'lobby' as const };
      }
      return state;
    }),

  resetGame: () =>
    set({
      trueCard: null,
      imposterCard: null,
      playerCount: 3,
      players: [],
      votedOutPlayer: null,
      gamePhase: 'lobby',
      imposterPlayerId: null,
      winner: null,
    }),

  playAgain: () => {
    const { playerCount } = get();
    
    // Select random cards
    const cardNames = Object.keys(imposterData);
    const randomIndex = Math.floor(Math.random() * cardNames.length);
    const trueCard = cardNames[randomIndex];
    const imposters = imposterData[trueCard as keyof typeof imposterData];
    const randomImposterIndex = Math.floor(Math.random() * imposters.length);
    const imposterCard = imposters[randomImposterIndex];
    
    // Create players
    const players = Array.from({ length: playerCount }, (_, i) => ({
      id: `player-${i + 1}`,
      name: `Player ${i + 1}`,
      isAlive: true,
    }));

    // Select random imposter
    const imposterIndex = Math.floor(Math.random() * players.length);

    set({
      trueCard,
      imposterCard,
      players,
      imposterPlayerId: players[imposterIndex].id,
      gamePhase: 'card-reveal',
      votedOutPlayer: null,
      winner: null,
    });
  },

  back : () => {
        set((state) => {
      if (state.gamePhase === 'card-reveal') {
        return { gamePhase: 'lobby' as const };
      }
      if (state.gamePhase === 'voting') {
        return { gamePhase: 'card-reveal' as const };
      }
      return state;
    })}
}));