import Play from "@/modules/play/Play"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Play Game - Impostor Royale",
  description: "Play Impostor Royale - Find the impostor card among Clash Royale characters. Multiplayer party game for 3-10 players.",
  openGraph: {
    title: "Play Game - Impostor Royale",
    description: "Join the game and find the impostor! Clash Royale party game.",
    url: "https://www.improyale.my.id/play",
  },
}

export const PlayPage = () => {
    return <Play/>
}
export default PlayPage;