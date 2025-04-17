"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Github, ExternalLink, Lock } from "lucide-react"
import Image from "next/image"
import { Project } from '@/types'
import { cn } from "@/lib/utils"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

interface ProjectsGridProps {
    projects: Project[]
}

// 直接定义Card3D组件，确保与全局Card3D组件样式一致
const LocalCard3D = ({ children, className }: { children: React.ReactNode, className?: string }) => {
    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={cn(
                "group relative rounded-xl bg-card transition-all duration-300 h-full flex flex-col",
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

// 添加项目卡片组件
const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="h-full"
        >
            <TooltipProvider>
                <LocalCard3D className="premium-card card-hover-premium h-full">
                    <div className="flex flex-col h-full">
                        <div className="group relative aspect-video overflow-hidden rounded-t-xl">
                            <Image
                                src={project.coverImage?.asset?.url || `https://picsum.photos/seed/${project._id}/800/450`}
                                alt={project.coverImage?.alt || project.title}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110 object-center"
                                priority={index < 6}
                            />
                            <div
                                className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            />
                            <div className="absolute inset-0 p-4 flex flex-col justify-end transform translate-y-[calc(100%-3.5rem)] group-hover:translate-y-0 transition-all duration-500 ease-out">
                                <h3 className="text-2xl font-bold dark:text-white text-gray-900 neon-text relative z-10">{project.title}</h3>
                            </div>
                            <div className="absolute top-4 right-4">
                                <motion.div
                                    whileHover={{ rotate: 360 }}
                                    transition={{ duration: 0.6 }}
                                    className="bg-background/20 backdrop-blur-md p-2 rounded-full"
                                >
                                    {(project.githubUrl || project.github) ? (
                                        <a href={project.githubUrl || project.github} target="_blank" rel="noopener noreferrer">
                                            <Github className="h-5 w-5 dark:text-white text-gray-900 hover:text-primary transition-colors" />
                                        </a>
                                    ) : (
                                        <Lock className="h-5 w-5 dark:text-white/70 text-gray-900/70" />
                                    )}
                                </motion.div>
                            </div>
                        </div>
                        <div className="p-4 flex-1 flex flex-col">
                            <div className="flex flex-wrap gap-2 mb-2 min-h-[32px] max-h-[64px] relative overflow-hidden">
                                {project.tags?.slice(0, 4).map((tag) => (
                                    <Badge
                                        key={tag}
                                        variant="secondary"
                                        className="bg-primary/10 hover:bg-primary/20 transition-colors"
                                    >
                                        {tag}
                                    </Badge>
                                ))}
                                {project.tags && project.tags.length > 4 && (
                                    <Badge
                                        variant="outline"
                                        className="bg-primary/5 hover:bg-primary/10 transition-colors"
                                    >
                                        +{project.tags.length - 4}
                                    </Badge>
                                )}
                            </div>

                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2 cursor-help hover:text-foreground/90 transition-colors h-[40px]">
                                        {project.description}
                                    </p>
                                </TooltipTrigger>
                                <TooltipContent side="top" className="max-w-[350px] p-4 bg-card/95 backdrop-blur-sm border-primary/20 shadow-lg z-[9999]">
                                    <p className="text-sm leading-relaxed">{project.description}</p>
                                    <div className="h-px w-full bg-primary/10 my-2"></div>
                                    <p className="text-xs text-muted-foreground">项目详情：{project.title}</p>
                                </TooltipContent>
                            </Tooltip>

                            <div className="flex gap-3 pt-3 mt-auto min-h-[40px]">
                                {(project.githubUrl || project.github) && (
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="flex-1 gap-2 group hover:border-primary/50"
                                        asChild
                                    >
                                        <a href={project.githubUrl || project.github} target="_blank" rel="noopener noreferrer">
                                            <Github className="h-4 w-4 group-hover:rotate-12 transition-transform" />
                                            <span>Source Code</span>
                                        </a>
                                    </Button>
                                )}
                                {(project.projectUrl || project.link) && (
                                    <Button
                                        variant="default"
                                        size="sm"
                                        className="flex-1 gap-2 group"
                                        asChild
                                    >
                                        <a href={project.projectUrl || project.link} target="_blank" rel="noopener noreferrer">
                                            <ExternalLink className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                            <span>Live Demo</span>
                                        </a>
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>
                </LocalCard3D>
            </TooltipProvider>
        </motion.div>
    )
}

// 添加网格布局组件（移除随机高度）
const MasonryGrid = ({ children }: { children: React.ReactNode[] }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {children.map((child, index) => (
                <div
                    key={index}
                    className="h-full"
                >
                    {child}
                </div>
            ))}
        </div>
    )
}

export function ProjectsGrid({ projects }: ProjectsGridProps) {
    return (
        <MasonryGrid>
            {projects.map((project, index) => (
                <ProjectCard key={project._id} project={project} index={index} />
            ))}
        </MasonryGrid>
    )
} 