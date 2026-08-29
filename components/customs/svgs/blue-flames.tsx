"use client"

import { motion } from 'motion/react'

export default function BlueFlame() {
    return (
        <div className="relative">
            <motion.div
                className="absolute h-40 w-40 rounded-full bg-yellow-400/80 blur-3xl"
                animate={{
                    x: [0, 30, -20, 0],
                    y: [0, -20, 25, 0],
                    scale: [1, 1.15, 0.9, 1],
                }}
                transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            <motion.div
                className="absolute h-24 w-24 rounded-full bg-orange-500/70 blur-2xl"
                animate={{
                    x: [0, -20, 25, 0],
                    y: [0, 25, -15, 0],
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />
        </div>
    )
}