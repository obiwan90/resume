"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import React from "react"
import {
  SiReact,
  SiTypescript,
  SiTailwindcss,
  SiNodedotjs,
  SiGithub,
  SiLinkedin,
  SiSpring,
  SiJavascript,
  SiHtml5,
  SiCss3,
  SiVuedotjs,
  SiMysql,
  SiRedis,
  SiElasticsearch,
  SiAmazon,
  SiDocker,
  SiKubernetes,
  SiGithubactions,
  SiTerraform,
  SiGit,
  SiFigma,
  SiPostman,
  SiJira,
  SiDiscord,
  SiSolidity,
  SiEthereum,
  SiWeb3Dotjs,
  SiHuggingface,
  SiN8N,
  SiOpenai,
  SiPython,
  SiMongodb,
  SiFlutter,
  SiNextdotjs,
} from 'react-icons/si'
import { FaJava, FaBrain, FaEthereum, FaRobot, FaVectorSquare } from 'react-icons/fa'
import { HiMail } from 'react-icons/hi'
import { Github, ExternalLink, Code2, Rocket, Star, ChevronRight, Briefcase, Award, ChevronUp, Shield, Terminal, Smartphone, TerminalSquare, Lock } from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Card3D } from "@/components/ui/card-3d"

import { cn } from "@/lib/utils"

// 添加全局样式
const globalStyles = `
  .custom-scrollbar::-webkit-scrollbar {
    width: 6px;
  }
  
  .custom-scrollbar::-webkit-scrollbar-track {
    background: transparent;
  }
  
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background-color: hsl(var(--primary) / 0.2);
    border-radius: 20px;
  }
  
  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background-color: hsl(var(--primary) / 0.4);
  }
`;

const socialLinks = [
  {
    icon: HiMail,
    href: "mailto:obiwanycj@gmail.com",
    label: "Email",
    ariaLabel: "Send me an email",
    description: "Contact me directly via email"
  },
  {
    icon: SiLinkedin,
    href: "https://www.linkedin.com/feed/",
    label: "LinkedIn",
    ariaLabel: "Visit my LinkedIn profile",
    description: "View my professional experience and skills"
  },
  {
    icon: SiGithub,
    href: "https://github.com/obiwan90",
    label: "GitHub",
    ariaLabel: "Check out my GitHub profile",
    description: "Browse my open source projects and code"
  },
  {
    icon: SiDiscord,
    href: "https://discord.gg/VxkGUMNK",
    label: "Discord",
    ariaLabel: "Join my Discord server",
    description: "Join my community discussions"
  },
]

const skills = {
  title: "Technical Arsenal",
  sections: {
    frontend: {
      title: "Frontend & Mobile Essentials",
      description: "Mastering core web and mobile technologies and modern frameworks",
      items: [
        { name: "HTML5", icon: SiHtml5, color: "#E34F26" },
        { name: "CSS3", icon: SiCss3, color: "#1572B6" },
        { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
        { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
        { name: "React", icon: SiReact, color: "#61DAFB" },
        { name: "Next.js", icon: SiNextdotjs, color: "#000000" },
        { name: "Vue.js", icon: SiVuedotjs, color: "#4FC08D" },
        { name: "Tailwind", icon: SiTailwindcss, color: "#06B6D4" },
        { name: "UniApp", icon: Smartphone, color: "#2B9939" },
        { name: "Flutter", icon: SiFlutter, color: "#02569B" },
      ]
    },
    backend: {
      title: "Backend Engineering",
      description: "Architecting robust and scalable server solutions",
      items: [
        { name: "Java", icon: FaJava, color: "#007396" },
        { name: "Spring", icon: SiSpring, color: "#6DB33F" },
        { name: "MySQL", icon: SiMysql, color: "#4479A1" },
        { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
        { name: "Redis", icon: SiRedis, color: "#DC382D" },
        { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
        { name: "Elasticsearch", icon: SiElasticsearch, color: "#005571" }
      ]
    },
    web3: {
      title: "Web3 & Blockchain",
      description: "Building decentralized applications and smart contracts",
      items: [
        { name: "Solidity", icon: SiSolidity, color: "#363636" },
        { name: "ZKApp (Mina)", icon: Shield, color: "#4F46E5" },
        { name: "Ethereum", icon: SiEthereum, color: "#627EEA" },
        { name: "Web3.js", icon: SiWeb3Dotjs, color: "#F16822" },
        { name: "Hardhat", icon: Terminal, color: "#FFF100" },
        { name: "Smart Contracts", icon: FaEthereum, color: "#FF9900" }
      ]
    },
    ai: {
      title: "AI & Large Models",
      description: "Leveraging cutting-edge AI technologies for innovative solutions",
      items: [
        { name: "DeepSeek Deploy", icon: FaRobot, color: "#FF4B4B" },
        { name: "RAG Systems", icon: FaBrain, color: "#00BFFF" },
        { name: "Vector", icon: FaVectorSquare, color: "#9C27B0" },
        { name: "Fine-tuning", icon: SiHuggingface, color: "#FFD166" },
        { name: "n8n Automation", icon: SiN8N, color: "#FF6B6B" },
        { name: "crawl4AI", icon: SiOpenai, color: "#10B981" },
        { name: "MCP Workflows", icon: SiPython, color: "#3776AB" }
      ]
    }
  }
}

const skillChartData = [
  {
    category: "Frontend Development",
    skills: [
      { name: "React/Next.js", value: 90, color: "#61DAFB" },
      { name: "TypeScript", value: 85, color: "#3178C6" },
      { name: "Vue.js", value: 82, color: "#4FC08D" },
      { name: "UI/UX Design", value: 85, color: "#FF4088" },
      { name: "Tailwind CSS", value: 88, color: "#06B6D4" }
    ]
  },
  {
    category: "Backend Development",
    skills: [
      { name: "Node.js", value: 85, color: "#339933" },
      { name: "Spring Boot", value: 80, color: "#6DB33F" },
      { name: "Database Design", value: 88, color: "#336791" },
      { name: "System Design", value: 82, color: "#FF6B6B" },
      { name: "API Development", value: 88, color: "#38BDF8" }
    ]
  },
  {
    category: "Web3 & Blockchain",
    skills: [
      { name: "Solidity", value: 85, color: "#363636" },
      { name: "zkApp (Mina)", value: 80, color: "#4F46E5" },
      { name: "Smart Contracts", value: 82, color: "#FF9900" },
      { name: "Hardhat/Truffle", value: 78, color: "#FFF100" },
      { name: "Web3 Integration", value: 83, color: "#627EEA" }
    ]
  },
  {
    category: "AI & Large Models",
    skills: [
      { name: "RAG Development", value: 87, color: "#00BFFF" },
      { name: "LLM Fine-tuning", value: 82, color: "#FFD166" },
      { name: "DeepSeek Deploy", value: 85, color: "#FF4B4B" },
      { name: "n8n Workflows", value: 80, color: "#FF6B6B" },
      { name: "AI Integration", value: 84, color: "#10B981" }
    ]
  }
]

interface Project {
  _id: string
  title: string
  description: string
  coverImage: {
    asset: {
      url: string
    }
    alt: string
  }
  projectUrl?: string
  githubUrl?: string
  tags: string[]
  isRecentUpdate: boolean
}

interface Experience {
  _id: string
  company: string
  position: string
  startDate: string
  endDate: string
  isCurrentRole: boolean
  description: string
  projects: {
    name: string
    description: string
    background: {
      problem: string
      solution: string
      impact: string
    }
    responsibilities: string[]
    techStack: string[]
  }[]
  skills: string[]
  achievements: string[]
}

interface PortfolioPageProps {
  recentProjects: Project[]
  currentExperience: Experience
}

// 添加滚动指示器组件
const ScrollIndicator = () => {
  const [scroll, setScroll] = useState(0)

  useEffect(() => {
    const calculateScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollPosition = window.scrollY
      setScroll((scrollPosition / totalHeight) * 100)
    }

    window.addEventListener('scroll', calculateScroll)
    return () => window.removeEventListener('scroll', calculateScroll)
  }, [])

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-primary/20 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      <motion.div
        className="h-full bg-gradient-to-r from-primary via-primary/80 to-primary"
        style={{ width: `${scroll}%` }}
      />
    </motion.div>
  )
}

// 添加交互式背景组件
const InteractiveBackground = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="fixed inset-0 -z-10">
      <motion.div
        className="absolute top-0 left-0 w-full h-full"
        style={{
          background: `radial-gradient(circle at ${50 + mousePosition.x * 10}% ${50 + mousePosition.y * 10}%, 
            hsl(var(--primary) / 0.1) 0%, 
            transparent 50%)`
        }}
        animate={{
          opacity: [0.5, 0.3, 0.5],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  )
}

// 修改 Featured Skills 部分的图表组件
const SkillChart = ({ skillSet }: { skillSet: typeof skillChartData[0] }) => {
  return (
    <Card3D>
      <div className="p-8">
        <h3 className="text-xl font-bold mb-8 flex items-center gap-3">
          <div className="h-8 w-1 rounded-full bg-gradient-to-b from-primary to-primary/20" />
          {skillSet.category}
        </h3>
        <div className="space-y-6">
          {skillSet.skills.map((skill) => (
            <motion.div
              key={skill.name}
              className="space-y-2"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">{skill.name}</span>
                <span className="text-sm text-muted-foreground">{skill.value}%</span>
              </div>
              <div className="h-2 bg-accent/50 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: skill.color }}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.value}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Card3D>
  )
}

// 添加滚动到顶部按钮组件
const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-3 rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-colors duration-300 backdrop-blur-sm z-50"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronUp className="h-6 w-6" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}

// 添加页面加载动画组件
const PageLoadingAnimation = () => {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (!isLoading) return null

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-background flex items-center justify-center"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      onAnimationComplete={() => setIsLoading(false)}
    >
      <motion.div
        initial={{ scale: 0.5 }}
        animate={{ scale: 1 }}
        transition={{
          duration: 0.5,
          type: "spring",
          stiffness: 260,
          damping: 20
        }}
      >
        <Code2 className="h-16 w-16 text-primary animate-pulse" />
      </motion.div>
    </motion.div>
  )
}

// 修改 Hero Section 组件，添加打字机效果和更多动画
const HeroSection = ({ typedName, fullName }: { typedName: string; fullName: string }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false)

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="relative min-h-[80vh] flex items-center subtle-background"
    >
      <div className="absolute inset-0 -z-10">
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-secondary/5 rounded-full blur-3xl" />
        </motion.div>
      </div>

      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{
              opacity: isImageLoaded ? 1 : 0,
              scale: isImageLoaded ? 1 : 0.5
            }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: 0.2
            }}
            className="relative"
          >
            <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-2xl overflow-hidden">
              <Image
                alt="Profile"
                className="object-cover"
                fill
                priority
                src="https://picsum.photos/400/400?random=1"
                onLoadingComplete={() => setIsImageLoaded(true)}
              />
              <motion.div
                className="absolute inset-0 bg-primary/10"
                initial={{ opacity: 0.5 }}
                animate={{ opacity: 0 }}
                transition={{ duration: 1 }}
              />
              {/* Status Indicator */}
              <motion.div
                className="absolute bottom-2 right-2 w-4 h-4 rounded-full bg-green-500 border-2 border-background shadow-md"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                  delay: 0.6
                }}
                // Add pulse animation
                whileHover={{ scale: 1.2 }}
              >
                <motion.div
                  className="absolute inset-0 rounded-full bg-green-400 opacity-75"
                  animate={{ scale: [1, 1.5, 1], opacity: [0.75, 0, 0.75] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                />
              </motion.div>
            </div>
          </motion.div>

          <div className="flex-1 space-y-6 text-center md:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <motion.h1
                className="text-4xl md:text-6xl font-bold tracking-tight mb-4 neon-text"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                {typedName}
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
                  className="inline-block ml-1"
                >
                  |
                </motion.span>
              </motion.h1>
              <p className="text-xl md:text-2xl text-muted-foreground">
                Full Stack Developer
              </p>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg text-muted-foreground max-w-2xl mx-auto md:mx-0"
            >
              Passionate about creating elegant user interfaces and high-performance applications.
              Always eager to explore new technologies and apply them to solve practical problems.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-4 justify-center md:justify-start"
            >
              {socialLinks.map((link, index) => (
                <SocialLink
                  key={link.label}
                  href={link.href}
                  icon={link.icon}
                  label={link.label}
                />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  )
}

// 创建一个简单的SectionHeading组件
const SectionHeading = ({
  title,
  subtitle,
  description
}: {
  title: string;
  subtitle: string;
  description: string;
}) => {
  return (
    <div className="flex flex-col items-center text-center mb-10">
      <div className="p-3 rounded-xl bg-primary/10 mb-4">
        <TerminalSquare className="h-10 w-10 text-primary" />
      </div>
      <h2 className="text-3xl font-bold mb-2">{title}</h2>
      <p className="text-xl text-muted-foreground mb-3">{subtitle}</p>
      <p className="text-muted-foreground max-w-2xl">{description}</p>
    </div>
  );
};

// 添加一个专门的SocialLink组件
const SocialLink = ({ href, icon: Icon, label }: { href: string, icon: any, label: string }) => {
  // 判断是否为邮件链接
  const isMailto = href.startsWith('mailto:');

  if (isMailto) {
    const handleMailClick = (e: React.MouseEvent) => {
      e.preventDefault();
      window.location.href = href;
    };

    return (
      <div
        onClick={handleMailClick}
        className="relative z-10 px-4 py-2 rounded-md border border-border hover:border-primary flex items-center gap-2 bg-card hover:bg-primary/10 transition-all duration-200 cursor-pointer"
      >
        <Icon className="h-5 w-5 text-primary" />
        <span>{label}</span>
      </div>
    );
  }

  // 其他链接使用标准a标签
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="relative z-10 px-4 py-2 rounded-md border border-border hover:border-primary flex items-center gap-2 bg-card hover:bg-primary/10 transition-all duration-200"
    >
      <Icon className="h-5 w-5 text-primary" />
      <span>{label}</span>
    </a>
  );
};

export function PortfolioPage({ recentProjects, currentExperience }: PortfolioPageProps) {
  const [typedName, setTypedName] = useState("")
  const fullName = "Hi, I'm Obiwan"

  // 添加全局样式
  useEffect(() => {
    // 创建一个style元素并添加到head
    const styleEl = document.createElement('style')
    styleEl.innerHTML = globalStyles
    document.head.appendChild(styleEl)

    // 清理函数
    return () => {
      document.head.removeChild(styleEl)
    }
  }, [])

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (typedName.length < fullName.length) {
        setTypedName(fullName.slice(0, typedName.length + 1))
      }
    }, 100)

    return () => clearTimeout(timeout)
  }, [typedName])

  return (
    <>
      <PageLoadingAnimation />
      <InteractiveBackground />
      <div className="min-h-screen ">
        <ScrollIndicator />
        <ScrollToTopButton />

        <main className="relative z-10">
          <HeroSection typedName={typedName} fullName={fullName} />

          {/* Technical Arsenal Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            id="skills"
            className="relative py-24"
          >
            <div className="absolute inset-0 -z-10">
              <div className="absolute inset-0 bg-gradient-radial from-background via-background/80 to-background/20" />
              <div className="absolute left-0 top-1/3 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
              <div className="absolute right-0 bottom-1/3 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
            </div>

            <div className="container mx-auto px-4">
              <div className="flex flex-col gap-3 mb-10">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="space-y-2"
                >
                  <div className="flex items-center gap-2">
                    <div className="h-px w-8 bg-primary/60"></div>
                    <h2 className="text-3xl font-bold gradient-text">Technical Arsenal</h2>
                  </div>
                  <p className="text-muted-foreground max-w-2xl">
                    Skills and tools accumulated across different domains, helping me build high-quality solutions
                  </p>
                </motion.div>
              </div>

              <div className="mt-10">
                <motion.div
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ staggerChildren: 0.1 }}
                >
                  {Object.entries(skills.sections).map(([key, section]) => (
                    <motion.div
                      key={key}
                      className="flex flex-col bg-card border border-border/40 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 gradient-border"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                    >
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="h-44 p-6 flex flex-col justify-center bg-gradient-to-br from-primary/20 to-primary/5 cursor-help">
                              <h3 className="text-lg font-bold mb-2">{section.title}</h3>
                              <p className="text-xs text-muted-foreground line-clamp-2">{section.description}</p>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent side="bottom" className="max-w-[250px] text-xs">
                            <p>{section.description}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>

                      <div className="p-4 flex-grow">
                        <div className="grid grid-cols-2 gap-3">
                          {section.items.map((skill) => (
                            <motion.div
                              key={skill.name}
                              className="flex flex-col items-center justify-center p-3 rounded-lg bg-background/60 border border-border/30 hover:border-primary/50 hover:bg-primary/10 transition-all duration-300 shimmer"
                              whileHover={{ scale: 1.05 }}
                            >
                              {React.createElement(skill.icon, {
                                className: "w-8 h-8 mb-2",
                                style: { color: skill.color }
                              })}
                              <span className="text-xs font-medium text-center">{skill.name}</span>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>
          </motion.section>

          {/* Current Role Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative py-24"
          >
            <div className="container mx-auto px-4">
              <div className="flex flex-col gap-3 mb-10">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="space-y-2"
                >
                  <div className="flex items-center gap-2">
                    <div className="h-px w-8 bg-primary/60"></div>
                    <h2 className="text-3xl font-bold gradient-text">Current Role</h2>
                  </div>
                  <p className="text-muted-foreground max-w-2xl">
                    My current position and responsibilities in the software development and engineering field
                  </p>
                </motion.div>
              </div>

              <Card3D>
                <div className="p-8 space-y-6">
                  <div className="flex flex-col md:flex-row justify-between gap-6">
                    <div>
                      <h3 className="text-2xl font-bold text-primary mb-2">
                        {currentExperience.position}
                      </h3>
                      <p className="text-xl text-muted-foreground">
                        {currentExperience.company}
                      </p>
                      <p className="text-sm text-muted-foreground mt-2">
                        {new Date(currentExperience.startDate).toLocaleDateString()} - Present
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {currentExperience.skills?.map((skill, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="px-3 py-1 bg-primary/10 hover:bg-primary/20 transition-colors"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="prose dark:prose-invert max-w-none">
                    <p className="text-muted-foreground leading-relaxed">
                      {currentExperience.description}
                    </p>
                  </div>

                  {currentExperience.achievements && (
                    <div className="space-y-4 bg-primary/5 rounded-xl p-6">
                      <h4 className="text-lg font-semibold flex items-center gap-2">
                        <Award className="h-5 w-5 text-primary" />
                        Key Achievements
                      </h4>
                      <ul className="grid gap-3 pl-4">
                        {currentExperience.achievements.map((achievement, index) => (
                          <li
                            key={index}
                            className="flex items-start gap-3 text-muted-foreground"
                          >
                            <span className="h-2 w-2 rounded-full bg-primary/60 mt-2"></span>
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="flex justify-end pt-4">
                    <Button asChild>
                      <Link href="/experience" className="flex items-center gap-2">
                        View Full Experience
                        <ChevronRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </Card3D>
            </div>
          </motion.section>

          {/* Recent Projects Section */}
          <motion.section
            id="projects"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="pt-24 pb-16"
          >
            <div className="container max-w-7xl mx-auto px-4 sm:px-6">
              <div className="flex flex-col gap-3 mb-10">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="space-y-2"
                >
                  <div className="flex items-center gap-2">
                    <div className="h-px w-8 bg-primary/60"></div>
                    <h2 className="text-3xl font-bold gradient-text">Recent Projects</h2>
                  </div>
                  <p className="text-muted-foreground max-w-2xl">
                    My latest projects, including web applications, design projects, and cutting-edge technology experiments.
                  </p>
                </motion.div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {recentProjects.map((project, index) => (
                  <motion.div
                    key={project._id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.1,
                      ease: "easeOut"
                    }}
                  >
                    <Card3D className="premium-card card-hover-premium h-full">
                      <div className="flex flex-col h-full">
                        <div className="group relative aspect-video overflow-hidden rounded-t-xl">
                          <Image
                            src={project.coverImage?.asset?.url || `https://picsum.photos/seed/${project._id}/800/450`}
                            alt={project.coverImage?.alt || project.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110 object-center"
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
                              {project.githubUrl ? (
                                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                                  <Github className="h-5 w-5 dark:text-white text-gray-900 hover:text-primary transition-colors" />
                                </a>
                              ) : (
                                <Lock className="h-5 w-5 dark:text-white/70 text-gray-900/70" />
                              )}
                            </motion.div>
                          </div>
                        </div>
                        <div className="p-4 flex-1 flex flex-col">
                          <div className="flex flex-wrap gap-2 mb-2">
                            {project.tags?.map((tag) => (
                              <Badge
                                key={tag}
                                variant="secondary"
                                className="bg-primary/10 hover:bg-primary/20 transition-colors"
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>

                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <p className="text-sm text-muted-foreground mb-3 line-clamp-2 cursor-help hover:text-foreground/90 transition-colors">
                                  {project.description}
                                </p>
                              </TooltipTrigger>
                              <TooltipContent side="top" className="max-w-[350px] p-4 bg-card/95 backdrop-blur-sm border-primary/20 shadow-lg">
                                <p className="text-sm leading-relaxed">{project.description}</p>
                                <div className="h-px w-full bg-primary/10 my-2"></div>
                                <p className="text-xs text-muted-foreground">项目详情：{project.title}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>

                          <div className="flex gap-3 pt-3 mt-auto">
                            {project.githubUrl && (
                              <Button
                                variant="outline"
                                size="sm"
                                className="flex-1 gap-2 group hover:border-primary/50"
                                asChild
                              >
                                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                                  <Github className="h-4 w-4 group-hover:rotate-12 transition-transform" />
                                  <span>Source Code</span>
                                </a>
                              </Button>
                            )}
                            {project.projectUrl && (
                              <Button
                                variant="default"
                                size="sm"
                                className="flex-1 gap-2 group"
                                asChild
                              >
                                <a href={project.projectUrl} target="_blank" rel="noopener noreferrer">
                                  <ExternalLink className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                  <span>Live Demo</span>
                                </a>
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </Card3D>
                  </motion.div>
                ))}
              </div>

              <motion.div
                className="flex justify-center mt-16"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Button asChild variant="outline" size="lg" className="group relative overflow-hidden">
                  <Link href="/projects" className="flex items-center gap-2 z-10">
                    View All Projects
                    <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </motion.div>
            </div>
          </motion.section>

          {/* Footer Quote */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center py-12"
          >
            <motion.div
              className="flex items-center justify-center gap-4"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className="h-[1px] w-12 bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
              <p className="text-lg font-medium gradient-text">
                Building the future, one line at a time
              </p>
              <div className="h-[1px] w-12 bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
            </motion.div>
          </motion.div>
        </main>
      </div>
    </>
  )
}