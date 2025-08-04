"use client";

import memojiImage from "@/assets/images/memoji-computer.png";
import Image from "next/image";
import ArrowDown from "@/assets/icons/arrow-down.svg";
import spaceImage from "@/assets/images/space.png";
import StarIcon from "@/assets/icons/star.svg";
import SparkleIcon from "@/assets/icons/sparkle.svg";
import { HeroOrbit } from "@/components/HeroOrbit";
import Globe from "@/components/Globe";
import { FaLocationArrow } from "react-icons/fa6";
import MagicButton from "@/components/MagicButton";
import LoadingScreen from "@/components/LoadingScreen";
import { useState } from "react";

export const HeroSection = () => {
	const [globeReady, setGlobeReady] = useState(false);
	const [textAnimated, setTextAnimated] = useState(false);

	const handleGlobeLoaded = () => {
		// Add delay to ensure OrbitControls are properly positioned before showing
		setTimeout(() => {
			setGlobeReady(true);
			// Trigger text animation shortly after globe is ready
			setTimeout(() => {
				setTextAnimated(true);
			}, 300);
		}, 150);
	};

	return (
		<>
			{!globeReady && <LoadingScreen />}
			<div
				className={`relative py-64 sm:py-80 md:py-80 lg:py-96 overflow-hidden transition-opacity duration-500 ${
					globeReady ? "opacity-100" : "opacity-0"
				}`}
			>
				{/* Space background with opacity overlay */}
				<div
					className="absolute inset-0"
					style={{
						backgroundImage: `url(${spaceImage.src})`,
						backgroundSize: "cover",
						backgroundPosition: "center",
						backgroundRepeat: "no-repeat",
					}}
				/>
				<div className="absolute inset-0 bg-black/60" />
				{/* Gradient blend to rest of website - sharp transition */}
				<div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-b from-transparent via-black/20 via-black/60 to-black z-[5]" />

				{/* AVAILABILITY BADGE - Top Left of entire screen with animation */}
				<div
					className={`fixed top-4 left-4 z-30 transition-all duration-1000 ease-out delay-700 ${
						textAnimated
							? "translate-y-0 opacity-100"
							: "-translate-y-8 opacity-0"
					}`}
				>
					<div className="bg-gray-950 border border-gray-800 px-2 py-0.5 md:px-4 md:py-1.5 inline-flex items-center gap-1 md:gap-2 rounded-md md:rounded-lg pointer-events-auto">
						<div className="relative size-1.5 md:size-3">
							<div className="absolute size-full animate-ping rounded-full bg-green-300 opacity-65"></div>
							<div className="size-full rounded-full bg-green-400 drop-shadow-[0_0_4px_rgba(34,197,94,0.5)]"></div>
						</div>
						<span className="text-[10px] md:text-sm font-medium">
							Available for new projects
						</span>
					</div>
				</div>

				<div className="container mx-auto relative">
					{/* BACKGROUND */}
					<div className="absolute inset-0 pointer-events-none z-0">
						{/* rings */}
						<div className="size-[620px] hero-ring"></div>
						<div className="size-[820px] hero-ring"></div>
						<div className="size-[1020px] hero-ring"></div>
						<div className="size-[1220px] hero-ring"></div>

						{/* star orbits */}
						<HeroOrbit
							size={620}
							rotation={-72}
							shouldOrbit
							orbitDuration="52s"
							shouldSpin
							spinDuration="6s"
						>
							<StarIcon className="size-28 text-yellow-200 drop-shadow-[0_0_8px_rgba(255,255,224,0.4)]" />
						</HeroOrbit>
						<HeroOrbit
							size={550}
							rotation={20}
							shouldOrbit
							orbitDuration="52s"
							shouldSpin
							spinDuration="6s"
						>
							<StarIcon className="size-12 text-yellow-200 drop-shadow-[0_0_6px_rgba(255,255,224,0.3)]" />
						</HeroOrbit>
						<HeroOrbit
							size={590}
							rotation={98}
							shouldOrbit
							orbitDuration="52s"
							shouldSpin
							spinDuration="6s"
						>
							<StarIcon className="size-8 text-yellow-200 drop-shadow-[0_0_4px_rgba(255,255,224,0.3)]" />
						</HeroOrbit>

						{/* sparkle orbits - cosmic colors */}
						<HeroOrbit
							size={430}
							rotation={-14}
							shouldOrbit
							orbitDuration="52s"
							shouldSpin
							spinDuration="3s"
						>
							<SparkleIcon className="size-8 text-purple-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.6)]" />
						</HeroOrbit>
						<HeroOrbit
							size={440}
							rotation={79}
							shouldOrbit
							orbitDuration="52s"
							shouldSpin
							spinDuration="3s"
						>
							<SparkleIcon className="size-5 text-cyan-300 drop-shadow-[0_0_6px_rgba(103,232,249,0.5)]" />
						</HeroOrbit>
						<HeroOrbit
							size={530}
							rotation={178}
							shouldOrbit
							orbitDuration="48s"
							shouldSpin
							spinDuration="3s"
						>
							<SparkleIcon className="size-10 text-emerald-400 drop-shadow-[0_0_10px_rgba(52,211,153,0.6)]" />
						</HeroOrbit>
						<HeroOrbit
							size={710}
							rotation={144}
							shouldOrbit
							orbitDuration="48s"
							shouldSpin
							spinDuration="3s"
						>
							<SparkleIcon className="size-14 text-blue-400 drop-shadow-[0_0_12px_rgba(96,165,250,0.7)]" />
						</HeroOrbit>

						{/* tiny-dot orbits - cosmic dots */}
						<HeroOrbit size={720} rotation={85} shouldOrbit orbitDuration="48s">
							<div className="size-3 rounded-full bg-violet-400/80 shadow-[0_0_8px_rgba(139,92,246,0.6)]" />
						</HeroOrbit>
						<HeroOrbit
							size={520}
							rotation={-41}
							shouldOrbit
							orbitDuration="48s"
						>
							<div className="size-2 rounded-full bg-teal-400/80 shadow-[0_0_6px_rgba(45,212,191,0.5)]" />
						</HeroOrbit>
						<HeroOrbit size={650} rotation={-5} shouldOrbit orbitDuration="48s">
							<div className="size-2 rounded-full bg-indigo-400/80 shadow-[0_0_6px_rgba(129,140,248,0.5)]" />
						</HeroOrbit>

						{/* centered globe - responsive sizing for mobile */}
						<div className="absolute inset-0 flex justify-center items-center pointer-events-auto z-[8]">
							<div className="w-[350px] h-[350px] sm:w-[550px] sm:h-[550px] md:w-[600px] md:h-[600px] lg:w-[700px] lg:h-[700px] pointer-events-auto">
								<Globe onGlobeLoaded={handleGlobeLoaded} />
							</div>
						</div>
					</div>

					{/* FOREGROUND CONTENT - Mobile centered position, desktop left aligned */}
					<div className="absolute left-1/2 -translate-x-1/2 md:left-4 lg:left-8 xl:left-12 md:translate-x-0 top-1/2 -translate-y-1/2 z-10 flex flex-col items-start text-left pointer-events-auto max-w-xs md:max-w-sm lg:max-w-md">
						{/* <Image
							src={memojiImage}
							alt="person behind laptop"
							className="w-[100px] h-[100px]"
						/> */}

						<h1
							className={`mt-8 font-serif text-3xl md:text-5xl tracking-wide transition-all duration-1000 ease-out ${
								textAnimated
									? "translate-y-0 opacity-100"
									: "translate-y-12 opacity-0"
							}`}
						>
							Hi, I&apos;m Juan Ceresa.
						</h1>
						<p
							className={`mt-4 text-white/60 text-sm sm:text-base md:text-lg transition-all duration-1000 ease-out delay-200 ${
								textAnimated
									? "translate-y-0 opacity-100"
									: "translate-y-12 opacity-0"
							}`}
						>
							Bilingual technologist with a track record of turning complex
							problems into real-world impact.
						</p>

						{/* BUTTON - Below description with animation */}
						<div
							className={`mt-4 transition-all duration-1000 ease-out delay-500 ${
								textAnimated
									? "translate-y-0 opacity-100"
									: "translate-y-12 opacity-0"
							}`}
						>
							<a href="#about">
								<MagicButton
									title="Show my work"
									icon={<FaLocationArrow />}
									position="right"
								/>
							</a>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
