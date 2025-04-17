"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export interface Card3DProps {
    children: React.ReactNode
    className?: string
}

export function Card3D({ children, className }: Card3DProps) {
    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={cn(
                "group relative rounded-xl overflow-hidden bg-card transition-all duration-300",
                "hover:shadow-md border border-border/30 hover:border-primary/40",
                className
            )}
        >
            <motion.div
                className="relative z-10 h-full flex flex-col"
            >
                {children}
            </motion.div>
            {/* 使用边框亮度提升替代光晕效果 */}
            <div className="absolute inset-0 rounded-xl bg-primary/[0.01] opacity-0 group-hover:opacity-100 transition-all duration-500" />
        </motion.div>
    )
} 