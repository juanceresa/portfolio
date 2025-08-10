import UnderConstruction from '../UnderConstruction'
import { Metadata } from 'next'

export function generateMetadata(): Metadata {
  return {
    title: "About Me - Coming Soon",
    description: "I'm crafting a comprehensive about page that will dive deep into my journey, experiences, and what makes me tick as a developer.",
  }
}

export default function AboutPage() {
  return (
    <UnderConstruction 
      pageTitle="About Me - Coming Soon"
      description="I'm crafting a comprehensive about page that will dive deep into my journey, experiences, and what makes me tick as a developer. This will include my background, skills, achievements, and the story behind my passion for technology. Stay tuned!"
    />
  )
}