"use client";

import { Header } from "@/sections/Header";
import { HeroSection } from "@/sections/Hero";
import { AboutSection } from "@/sections/About";
import { ProjectSection } from "@/sections/Projects";
import Experience from "@/sections/Experience";


export default function Home() {
  return (
    <div className="bg-black">
      <Header />
      <HeroSection />
      <AboutSection />
      <Experience />
      <ProjectSection />
    </div>
  );
}
