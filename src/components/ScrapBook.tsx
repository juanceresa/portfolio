"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Typed from "typed.js";

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
	const [showIntro, setShowIntro] = useState(false);
	const [introComplete, setIntroComplete] = useState(false);
	const [isFirstVisit, setIsFirstVisit] = useState(true);
	const [hasEnteredView, setHasEnteredView] = useState(false);
	const [showBlankTerminal, setShowBlankTerminal] = useState(true);
	const [showTerminalScreen, setShowTerminalScreen] = useState(false);
	const [terminalSlideUp, setTerminalSlideUp] = useState(false);
	const [imageSlideUp, setImageSlideUp] = useState(true); // Start visible, hide during intro
	const autoRotateRef = useRef<NodeJS.Timeout | null>(null);
	const typedRef = useRef<HTMLSpanElement>(null);
	const terminalTypedRef = useRef<HTMLSpanElement>(null);
	const typedInstance = useRef<Typed | null>(null);
	const terminalTypedInstance = useRef<Typed | null>(null);
	const containerRef = useRef<HTMLDivElement>(null);

	// Create infinite scroll by duplicating images
	const infiniteImages = [...scrapbookImages, ...scrapbookImages];

	// Auto-rotation logic
	const startAutoRotate = () => {
		if (autoRotateRef.current) clearInterval(autoRotateRef.current);
		autoRotateRef.current = setInterval(() => {
			if (!isPaused) {
				nextSlide();
			}
		}, 20000); // Auto-rotate every 20 seconds
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
			// Moving from last to first - immediately show intro without flash
			setIsTextFading(true);

			// Immediately set intro states before any slide animation
			setShowIntro(true);
			setIntroComplete(false);
			// Mark as replay for subsequent visits
			setIsFirstVisit(false);

			// Reset terminal animation states for restart
			setShowTerminalScreen(false);
			setTerminalSlideUp(false);
			setImageSlideUp(false); // Hide image for slide-up effect

			// Destroy existing typed instances so they can be recreated
			if (typedInstance.current) {
				try {
					typedInstance.current.destroy();
				} catch (e) {
					console.warn("Error destroying typedInstance:", e);
				} finally {
					typedInstance.current = null;
				}
			}
			if (terminalTypedInstance.current) {
				try {
					terminalTypedInstance.current.destroy();
				} catch (e) {
					console.warn("Error destroying terminalTypedInstance:", e);
				} finally {
					terminalTypedInstance.current = null;
				}
			}

			// Start slide transition
			setTranslateX(-(nextIndex * 100));
			setCurrentIndex(nextIndex);

			// After slide animation, snap back
			setTimeout(() => {
				setIsTransitioning(false);
				setTranslateX(0);
				setCurrentIndex(0);
				setIsTextFading(false);
			}, 350);
		} else {
			// Check if transitioning from first slide (title) to second slide (caption)
			if (currentIndex === 0) {
				// Fade out title first
				setIsTextFading(true);

				setTimeout(() => {
					setTranslateX(-(nextIndex * 100));
					setCurrentIndex(nextIndex);

					setTimeout(() => {
						setIsTransitioning(false);
						// Fade text back in
						setTimeout(() => {
							setIsTextFading(false);
						}, 150);
					}, 500);
				}, 200);
			} else {
				// Normal transition for other slides
				setTranslateX(-(nextIndex * 100));
				setCurrentIndex(nextIndex);
				setTimeout(() => setIsTransitioning(false), 700);
			}
		}
	};

	// Intersection Observer to detect when ScrapBook enters viewport
	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				const [entry] = entries;
				if (entry.isIntersecting && !hasEnteredView && isFirstVisit) {
					// First time entering view - hide blank terminal and trigger intro animation
					setHasEnteredView(true);
					setShowBlankTerminal(false);
					setShowIntro(true);
					setIntroComplete(false);
					// Hide image initially for slide-up effect later
					setImageSlideUp(false);
				}
			},
			{ threshold: 0.6 } // Trigger when 60% of component is visible (more centered)
		);

		if (containerRef.current) {
			observer.observe(containerRef.current);
		}

		return () => {
			if (containerRef.current) {
				observer.unobserve(containerRef.current);
			}
		};
	}, [hasEnteredView, isFirstVisit]);

	// Initialize TypedJS intro animation
	useEffect(() => {
		if (showIntro && typedRef.current && !typedInstance.current) {
			// Different animations for first visit vs replays
			const firstVisitStrings = [
				"Welcome to my Portfolio^1000",
				"Welcome to my Portfolio^500...<br>Opening scrapbook^1000",
			];

			const replayStrings = [
				"Memory overflow detected^1000",
				"Memory overflow detected^500... <br>Attempting restart...^1000",
			];

			typedInstance.current = new Typed(typedRef.current, {
				strings: isFirstVisit ? firstVisitStrings : replayStrings,
				typeSpeed: 25,
				backSpeed: 25,
				backDelay: 200,
				startDelay: 125,
				loop: false,
				showCursor: true,
				cursorChar: "_",
				contentType: "html",
				onComplete: () => {
					// Wait a moment then show terminal screen
					setTimeout(() => {
						setShowIntro(false);
						setShowTerminalScreen(true);
						// Trigger terminal slide-up after screen shows
						setTimeout(() => {
							setTerminalSlideUp(true);
						}, 100);
					}, 800);
				},
			});
		}

		return () => {
			if (typedInstance.current) {
				typedInstance.current.destroy();
				typedInstance.current = null;
			}
		};
	}, [showIntro]);

	// Initialize Terminal screen typing animation
	useEffect(() => {
		if (
			terminalSlideUp &&
			terminalTypedRef.current &&
			!terminalTypedInstance.current
		) {
			const firstVisitTerminalStrings = ["./scrapbook -interactive^1000"];

			const restartTerminalStrings = ["./scrapbook --restart^1000"];

			terminalTypedInstance.current = new Typed(terminalTypedRef.current, {
				strings: isFirstVisit
					? firstVisitTerminalStrings
					: restartTerminalStrings,
				typeSpeed: 25,
				backSpeed: 25,
				backDelay: 200,
				startDelay: 500,
				loop: false,
				showCursor: true,
				cursorChar: "_",
				contentType: "html",
				onComplete: () => {
					// Wait a moment then start image slide-up and fade out black overlay simultaneously
					setTimeout(() => {
						setImageSlideUp(true);
						setIntroComplete(true); // Fade out black overlay at same time as image slides up
						// Ensure we're on the first image after intro
						setCurrentIndex(0);
						setTranslateX(0);
						// Hide terminal after fade-out completes
						setTimeout(() => {
							setShowTerminalScreen(false);
						}, 1000);
					}, 800);
				},
			});
		}

		return () => {
			if (terminalTypedInstance.current) {
				terminalTypedInstance.current.destroy();
				terminalTypedInstance.current = null;
			}
		};
	}, [terminalSlideUp, isFirstVisit]);

	useEffect(() => {
		if (!showIntro && !showTerminalScreen) {
			// If we're not in intro flow, make sure image is visible
			setImageSlideUp(true);
			startAutoRotate();
		}
		return () => stopAutoRotate();
	}, [isPaused, isTransitioning, showIntro, showTerminalScreen]);

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
			ref={containerRef}
			className={`relative cursor-pointer group overflow-hidden ${className}`}
			onClick={!showIntro && !showTerminalScreen ? handleCardClick : undefined}
			onMouseEnter={() =>
				!showIntro && !showTerminalScreen && setIsPaused(true)
			}
			onMouseLeave={() =>
				!showIntro && !showTerminalScreen && setIsPaused(false)
			}
		>
			{/* Blank Terminal Screen - shown before scroll trigger */}
			{showBlankTerminal && (
				<div className="absolute inset-0 z-[60] bg-black flex items-center justify-center">
					<div className="font-mono text-green-400 text-lg md:text-xl p-8 max-w-2xl">
						<span className="animate-pulse">_</span>
					</div>
				</div>
			)}

			{/* Intro Terminal Screen */}
			{showIntro && (
				<div
					className={`absolute inset-0 z-[60] bg-black flex items-center justify-center transition-opacity duration-1000 ${
						introComplete ? "opacity-0" : "opacity-100"
					}`}
				>
					<div className="font-mono text-green-400 text-lg md:text-xl p-8 max-w-2xl">
						<span ref={typedRef}></span>
					</div>
				</div>
			)}

			{/* Terminal Window - slides up from bottom */}
			{showTerminalScreen && (
				<div
					className="absolute inset-0 z-[60] bg-black flex flex-col items-center justify-center transition-opacity duration-1000 ease-in-out"
					style={{
						opacity: imageSlideUp ? 0 : 1,
					}}
				>
					{/* Keep the green text visible - only for first visit */}
					{isFirstVisit && (
						<div className="font-mono text-green-400 text-lg md:text-xl p-8 max-w-2xl">
							<span>Welcome to my Portfolio... Opening scrapbook</span>
						</div>
					)}
					{!isFirstVisit && (
						<div className="font-mono text-green-400 text-lg md:text-xl p-8 max-w-2xl">
							<span> Memory overflow detected... Attempting restart. </span>
						</div>
					)}

					{/* Small Terminal Window */}
					<div
						className="bg-gray-900 border border-gray-700 rounded-lg shadow-2xl transition-all duration-700 ease-out"
						style={{
							width: "350px",
							height: "140px",
							transform: terminalSlideUp
								? "translateY(0)"
								: "translateY(120px)",
							opacity: terminalSlideUp ? 1 : 0,
						}}
					>
						{/* Terminal Header */}
						<div className="bg-gray-800 px-4 py-2 rounded-t-lg flex items-center gap-2">
							<div className="w-3 h-3 bg-red-500 rounded-full"></div>
							<div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
							<div className="w-3 h-3 bg-green-500 rounded-full"></div>
							<span className="text-gray-400 text-xs ml-2">portfolio.sh</span>
						</div>
						{/* Terminal Content */}
						<div className="p-3 font-mono text-green-400 text-xs leading-relaxed whitespace-pre-line h-full overflow-hidden">
							<span className="text-blue-400">juan@portfolio:~$ </span>
							<span ref={terminalTypedRef}></span>
						</div>
					</div>
				</div>
			)}

			{/* Sliding carousel container */}
			<div
				className="absolute inset-0 overflow-hidden transition-all duration-1000 ease-in-out"
				style={{
					transform: imageSlideUp ? "translateY(0)" : "translateY(100%)",
					zIndex: showTerminalScreen ? 10 : 20, // Stay behind terminal when terminal is showing
				}}
			>
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

			{/* Fade overlay for smooth intro transitions */}
			<div
				className={`absolute inset-0 z-[55] bg-black transition-opacity duration-1000 ${
					showIntro && !introComplete
						? "opacity-100"
						: "opacity-0 pointer-events-none"
				}`}
			/>

			{/* Dark overlay for better text readability */}
			<div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-300" />

			{/* Top title for headshot only - hidden since intro covers this */}
			{currentImage.title && false && (
				<div
					className={`absolute top-2 left-6 right-6 z-10 flex justify-center transition-opacity duration-300 ${
						isTextFading ? "opacity-0" : "opacity-90 group-hover:opacity-100"
					}`}
				>
					<h2 className="text-white text-2xl font-serif font-semibold drop-shadow-lg opacity-100">
						{currentImage.title}
					</h2>
				</div>
			)}

			{/* Content overlay */}
			<div className="relative z-30 h-full flex flex-col justify-end p-6">
				{/* Bottom content */}
				<div className="space-y-4">
					{/* Caption - subtle by default, more visible on hover */}
					{currentImage.caption && (
						<p
							className={`text-white font-medium drop-shadow-lg transition-opacity duration-300 ${
								isTextFading
									? "opacity-0"
									: "opacity-20 group-hover:opacity-100"
							}`}
						>
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
