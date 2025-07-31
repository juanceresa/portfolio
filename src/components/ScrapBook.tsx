"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

// Import scrapbook images
import family from "@/assets/images/family.png";
import headshot from "@/assets/images/Headshot.jpg";
import granada from "@/assets/images/fa92427f-ab81-42d9-8752-1245030905ef.jpg";
import swim from "@/assets/images/swim.JPG";
import hiking from "@/assets/images/IMG_6984.png";
import football from "@/assets/images/IMG_5002.jpg";
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
		title: "Welcome to my Portfolio",
		caption: "Tap to learn more about me",
		cropClass: "object-[center_20%]",
	},
	{
		src: swim,
		alt: "NCAA Division 1 Swimmer",
		caption: "Lifelong dream of swimming for U-M",
	},
	{
		src: family,
		alt: "Family",
		caption: "Senior Day, mission complete",
		cropClass: "object-center scale-110",
	},
	{
		src: granada,
		alt: "Granada",
		caption: "Then I went abroad, ask me about it!",
		location: "Granada, Spain",
	},
	{
		src: hiking,
		alt: "Hiking in the Canary Islands",
		caption: "Lover of the outdoors",
		location: "Tenerife, Canary Islands",
	},
	{
		src: football,
		alt: "Go Blue",
		caption: "Lover of Football (Big Ten Champs '20!)",
		location: "The Big House",
	},
];

interface ScrapBookProps {
	className?: string;
}

export const ScrapBook = ({ className }: ScrapBookProps) => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [translateX, setTranslateX] = useState(0);
	const [isTransitioning, setIsTransitioning] = useState(false);
	const [isTextFading, setIsTextFading] = useState(false);
	const [hasBeenClicked, setHasBeenClicked] = useState(false);
	const [isPaused, setIsPaused] = useState(false);
	const autoRotateRef = useRef<NodeJS.Timeout | null>(null);

	// Create infinite scroll by duplicating images
	const infiniteImages = [...scrapbookImages, ...scrapbookImages];

	// Auto-rotation logic
	const startAutoRotate = () => {
		if (autoRotateRef.current) clearInterval(autoRotateRef.current);
		autoRotateRef.current = setInterval(() => {
			if (!isPaused) {
				nextSlide();
			}
		}, 8000); // Auto-rotate every 8 seconds
	};

	const stopAutoRotate = () => {
		if (autoRotateRef.current) {
			clearInterval(autoRotateRef.current);
			autoRotateRef.current = null;
		}
	};

	const nextSlide = () => {
		if (isTransitioning) return;

		setIsTransitioning(true);
		const nextIndex = currentIndex + 1;

		if (nextIndex >= scrapbookImages.length) {
			// Moving from last to first - fade out text first
			setIsTextFading(true);
			
			// Wait a moment for text to fade, then start slide
			setTimeout(() => {
				setTranslateX(-(nextIndex * 100));
				setCurrentIndex(nextIndex);
				
				// After slide completes, snap back and fade text back in
				setTimeout(() => {
					setIsTransitioning(false);
					setTranslateX(0);
					setCurrentIndex(0);
					// Fade text back in
					setTimeout(() => {
						setIsTextFading(false);
					}, 150);
				}, 350);
			}, 200);
		} else {
			setTranslateX(-(nextIndex * 100));
			setCurrentIndex(nextIndex);
			setTimeout(() => setIsTransitioning(false), 700);
		}
	};

	useEffect(() => {
		startAutoRotate();
		return () => stopAutoRotate();
	}, [isPaused, isTransitioning]);

	const handleCardClick = () => {
		if (!hasBeenClicked) {
			setHasBeenClicked(true);
		}

		// Pause auto-rotation temporarily when user clicks
		setIsPaused(true);
		setTimeout(() => setIsPaused(false), 12000); // Resume after 12 seconds

		nextSlide();
	};

	const currentImage = scrapbookImages[currentIndex % scrapbookImages.length];

	return (
		<div
			className={`relative cursor-pointer group overflow-hidden ${className}`}
			onClick={handleCardClick}
			onMouseEnter={() => setIsPaused(true)}
			onMouseLeave={() => setIsPaused(false)}
		>
			{/* Sliding carousel container */}
			<div className="absolute inset-0 overflow-hidden">
				<div
					className={`flex h-full ${
						isTransitioning
							? "transition-transform duration-500 ease-in-out"
							: ""
					}`}
					style={{ transform: `translateX(${translateX}%)` }}
				>
					{infiniteImages.map((image, index) => (
						<div
							key={`${index}-${image.alt}`}
							className="w-full h-full flex-shrink-0 relative overflow-hidden"
						>
							<Image
								src={image.src}
								alt={image.alt}
								fill
								className={`object-cover ${image.cropClass || ""}`}
								sizes="(max-width: 768px) 100vw, 50vw"
							/>
						</div>
					))}
				</div>
			</div>

			{/* Dark overlay for better text readability */}
			<div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-300" />

			{/* Top title for headshot only */}
			{currentImage.title && (
				<div className={`absolute top-2 left-5 z-10 flex justify-center transition-opacity duration-300 ${isTextFading ? 'opacity-0' : 'opacity-90 group-hover:opacity-100'}`}>
					<h2 className="text-white text-2xl font-serif font-semibold drop-shadow-lg opacity-100">
						{currentImage.title}
					</h2>
				</div>
			)}

			{/* Content overlay */}
			<div className="relative z-10 h-full flex flex-col justify-end p-6">
				{/* Bottom content */}
				<div className="space-y-4">
					{/* Caption - subtle by default, more visible on hover */}
					{currentImage.caption && (
						<p className={`text-white font-medium drop-shadow-lg transition-opacity duration-300 ${isTextFading ? 'opacity-0' : 'opacity-20 group-hover:opacity-100'}`}>
							{currentImage.caption}
						</p>
					)}

					{/* Bottom row with dots left, location pin right */}
					<div className="flex items-center justify-between h-[28px]">
						{/* Dot Indicators - left side */}
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

						{/* Location Pin - right side (or empty space) */}
						<div className="min-w-0">
							{currentImage.location && (
								<div className="flex items-center gap-1.5 bg-black/60 rounded-full px-2.5 py-1.5 text-white text-sm font-medium opacity-60 group-hover:opacity-100 transition-opacity duration-300">
									{/* Pin Icon */}
									<svg
										className="w-3 h-3 text-red-400"
										fill="currentColor"
										viewBox="0 0 24 24"
									>
										<path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
									</svg>
									<span className="drop-shadow-lg">
										{currentImage.location}
									</span>
								</div>
							)}
						</div>
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
