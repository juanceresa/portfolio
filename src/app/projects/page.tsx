import UnderConstruction from '../UnderConstruction'
import { Metadata } from 'next'

export function generateMetadata(): Metadata {
  return {
    title: "Projects Coming Soon",
    description: "I'm currently working on showcasing my projects in a beautiful way. This comprehensive projects page will feature detailed case studies, live demos, and the stories behind each creation.",
  }
}

export default function ProjectsPage() {
  return (
    <UnderConstruction 
      pageTitle="Projects Coming Soon"
      description="I'm currently working on showcasing my projects in a beautiful way. This comprehensive projects page will feature detailed case studies, live demos, and the stories behind each creation. Stay tuned!"
    />
  )
}