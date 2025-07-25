"use client";

import { Header } from "@/sections/Header";
import { HeroSection } from "@/sections/Hero";
import { AboutSection } from "@/sections/About";


export default function Home() {
  return (
    <div className="bg-black">
      <Header />
      <HeroSection />
      <AboutSection />
    </div>
  );
}
