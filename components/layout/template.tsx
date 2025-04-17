"use client"

import { motion } from "framer-motion"
import { Navbar } from "./navbar"
import { usePathname } from 'next/navigation';

interface TemplateProps {
    children: React.ReactNode
}

export function Template({ children }: TemplateProps) {
    const pathname = usePathname();
    const showNavbar = !pathname.startsWith('/studio');

    return (
        <div className="min-h-screen bg-background">
            {showNavbar && <Navbar />}
            <motion.main
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                }}
                className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8"
            >
                {children}
            </motion.main>
        </div>
    )
} 