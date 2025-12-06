'use client';

import { Button } from "@/components/common/Button"
import Image from "next/image"
import { motion } from "framer-motion"

export const Home = () => {
    return (
        <div className="h-full flex flex-col items-center justify-center p-20 gap-5">
            <motion.div 
                className="flex flex-col items-center justify-center gap-5"
                animate={{ 
                    y: [0, -20, 0],
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            >
                <Image 
                    src={`/images/improyale-fav.png`}
                    height={200}
                    width={200}
                    alt="Imposter Royale"
                    className="rounded-lg shadow-2xl border-cr-gold"
                />
                <p className="text-[2.5rem] text-center text-cr-gold text-effect"><span className="text-red-400 text-effect-red">Imposter</span> Royale</p>
            </motion.div>
            <motion.a 
                href="/play"
                animate={{
                    boxShadow: [
                        "0 0 0px #ffd700",
                        "0 0 30px #ffd700",
                        "0 0 0px #ffd700"
                    ]
                }}
                transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="rounded-lg"
            >
                <Button type="yellow">
                    <p className="text-black">Play</p>
                </Button>
            </motion.a>
        </div>
    )
}