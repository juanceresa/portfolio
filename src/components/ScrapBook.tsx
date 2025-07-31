"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

// Import scrapbook images
import family from "@/assets/images/family.png";
import headshot from "@/assets/images/Headshot.jpg";
import granada from "@/assets/images/fa92427f-ab81-42d9-8752-1245030905ef.jpg";
import swim from "@/assets/images/swim.JPG";
import memojiAvatar5 from "@/assets/images/memoji-avatar-5.png";
import memojiComputer from "@/assets/images/memoji-computer.png";
import memojiSmile from "@/assets/images/memoji-smile.png";
import aiStartup from "@/assets/images/ai-startup-landing-page.png";
import darkSaas from "@/assets/images/dark-saas-landing-page.png";
import lightSaas from "@/assets/images/light-saas-landing-page.png";

const scrapbookImages = [
	{
		src: headshot,
		alt: "Juan Ceresa",
		caption: "Welcome to my portfolio!",
		cropClass: "object-[center_20%]",
	},
	{
		src: swim,
		alt: "NCAA Division 1 Swimmer",
		caption: "Completed my lifelong dream of swimming for U-M",
	},
	{
		src: family,
		alt: "Family",
		caption: "Senior Day, one of my proudest moments",
		cropClass: "object-center scale-110",
	},
	{
		src: granada,
		alt: "Granada",
		caption: "Ask me about my study abroad in Granada, Spain!",
	},
	{
		src: darkSaas,
		alt: "Dark SaaS Landing Page",
		caption: "Dark theme SaaS",
	},
	{
		src: lightSaas,
		alt: "Light SaaS Landing Page",
		caption: "Light theme SaaS",
	},
];

interface ScrapBookProps {
	className?: string;
}

export const ScrapBook = ({ className }: ScrapBookProps) => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isTransitioning, setIsTransitioning] = useState(false);
	const [hasBeenClicked, setHasBeenClicked] = useState(false);
	const [isPaused, setIsPaused] = useState(false);
	const autoRotateRef = useRef<NodeJS.Timeout | null>(null);

	// Auto-rotation logic
	const startAutoRotate = () => {
		if (autoRotateRef.current) clearInterval(autoRotateRef.current);
		autoRotateRef.current = setInterval(() => {
			if (!isPaused && !isTransitioning) {
				setIsTransitioning(true);
				setTimeout(() => {
					setCurrentIndex((prev) => (prev + 1) % scrapbookImages.length);
					setIsTransitioning(false);
				}, 400);
			}
		}, 8000); // Auto-rotate every 8 seconds
	};

	const stopAutoRotate = () => {
		if (autoRotateRef.current) {
			clearInterval(autoRotateRef.current);
			autoRotateRef.current = null;
		}
	};

	useEffect(() => {
		startAutoRotate();
		return () => stopAutoRotate();
	}, [isPaused, isTransitioning]);

	const handleCardClick = () => {
		if (isTransitioning) return;

		if (!hasBeenClicked) {
			setHasBeenClicked(true);
		}

		// Pause auto-rotation temporarily when user clicks
		setIsPaused(true);
		setTimeout(() => setIsPaused(false), 12000); // Resume after 12 seconds

		setIsTransitioning(true);
		setTimeout(() => {
			setCurrentIndex((prev) => (prev + 1) % scrapbookImages.length);
			setIsTransitioning(false);
		}, 200);
	};

	const currentImage = scrapbookImages[currentIndex];

	return (
		<div
			className={`relative cursor-pointer group overflow-hidden ${className}`}
			onClick={handleCardClick}
			onMouseEnter={() => setIsPaused(true)}
			onMouseLeave={() => setIsPaused(false)}
		>
			{/* Full-screen background image - fill completely */}
			<div className="absolute inset-0">
				<Image
					src={currentImage.src}
					alt={currentImage.alt}
					fill
					className={`object-cover w-full h-full ${
						currentImage.alt === "Juan Ceresa"
							? `${currentImage.cropClass || ""}`
							: `transition-all duration-700 ${
									isTransitioning
										? "opacity-0 scale-110"
										: "opacity-100 scale-100"
							  } group-hover:scale-105 ${currentImage.cropClass || ""}`
					}`}
					sizes="(max-width: 768px) 100vw, 50vw"
				/>
			</div>

			{/* Dark overlay for better text readability */}
			<div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-300" />

			{/* Content overlay */}
			<div className="relative z-10 h-full flex flex-col justify-end p-6">
				{/* Bottom content */}
				<div className="space-y-4">
					{/* Caption - subtle by default, more visible on hover */}
					<p className="text-white font-medium drop-shadow-lg transition-opacity duration-300 opacity-20 group-hover:opacity-100">
						{currentImage.caption}
					</p>

					{/* Dot Indicators - each dot handles its own opacity */}
					<div className="flex gap-2">
						{scrapbookImages.map((_, index) => (
							<div
								key={index}
								className={`w-2 h-2 rounded-full transition-all duration-300 ${
									index === currentIndex
										? "bg-white scale-125 opacity-70"
										: "bg-white/40 opacity-60 group-hover:opacity-100"
								}`}
							/>
						))}
					</div>
				</div>
			</div>

			{/* Subtle click indicator - only show after title fades */}
			<div
				className={`absolute top-4 right-4 transition-opacity duration-300 ${
					hasBeenClicked ? "opacity-0 group-hover:opacity-100" : "opacity-0"
				}`}
			>
				<div className="bg-black/30 backdrop-blur-sm rounded-full p-2">
					<svg
						className="w-4 h-4 text-white"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M9 5l7 7-7 7"
						/>
					</svg>
				</div>
			</div>
		</div>
	);
};
