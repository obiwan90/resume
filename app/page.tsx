import { getRecentProjects, getCurrentExperience } from '@/sanity/lib/api'
import { PortfolioPage } from "@/components/portfolio-page"
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Portfolio | Home',
  description: 'Welcome to my portfolio website showcasing my projects, skills, and experience.',
  alternates: {
    languages: {
      'en-US': '/',
      'zh-CN': '/zh',
    },
  },
}

export default async function Page() {
  const [recentProjects, currentExperience] = await Promise.all([
    getRecentProjects(),
    getCurrentExperience()
  ])

  return <PortfolioPage
    recentProjects={recentProjects}
    currentExperience={currentExperience}
  />
}