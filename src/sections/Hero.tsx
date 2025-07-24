// components/HeroSection.tsx
import memojiImage from "@/assets/images/memoji-computer.png";
import Image from "next/image";
import ArrowDown from "@/assets/icons/arrow-down.svg";
import grainImage from "@/assets/images/grain.jpg";
import StarIcon from "@/assets/icons/star.svg";
import SparkleIcon from "@/assets/icons/sparkle.svg";
import { HeroOrbit } from "@/components/HeroOrbit";
import Globe from "@/components/Globe";

export const HeroSection = () => {
	return (
		<div className="relative py-32 md:py-48 lg:py-60 overflow-hidden">
			<div className="container mx-auto relative">
				{/* BACKGROUND */}
				<div className="absolute inset-0 pointer-events-none">
					{/* grain overlay */}
					<div
						className="absolute inset-0 -z-30 opacity-5"
						style={{ backgroundImage: `url(${grainImage.src})` }}
					/>

					{/* rings */}
					<div className="size-[620px] hero-ring"></div>
					<div className="size-[820px] hero-ring"></div>
					<div className="size-[1020px] hero-ring"></div>
					<div className="size-[1220px] hero-ring"></div>

					{/* star orbits */}
					<HeroOrbit
						size={800}
						rotation={-72}
						shouldOrbit
						orbitDuration="48s"
						shouldSpin
						spinDuration="6s"
					>
						<StarIcon className="size-28 text-yellow-200 drop-shadow-[0_0_8px_rgba(255,255,224,0.4)]" />
					</HeroOrbit>
					<HeroOrbit
						size={550}
						rotation={20}
						shouldOrbit
						orbitDuration="38s"
						shouldSpin
						spinDuration="6s"
					>
						<StarIcon className="size-12 text-yellow-200 drop-shadow-[0_0_6px_rgba(255,255,224,0.3)]" />
					</HeroOrbit>
					<HeroOrbit
						size={590}
						rotation={98}
						shouldOrbit
						orbitDuration="40s"
						shouldSpin
						spinDuration="6s"
					>
						<StarIcon className="size-8 text-yellow-200 drop-shadow-[0_0_4px_rgba(255,255,224,0.3)]" />
					</HeroOrbit>

					{/* sparkle orbits */}
					<HeroOrbit
						size={430}
						rotation={-14}
						shouldOrbit
						orbitDuration="30s"
						shouldSpin
						spinDuration="3s"
					>
						<SparkleIcon className="size-8 text-white/40 drop-shadow-[0_0_3px_rgba(255,255,255,0.2)]" />
					</HeroOrbit>
					<HeroOrbit
						size={440}
						rotation={79}
						shouldOrbit
						orbitDuration="32s"
						shouldSpin
						spinDuration="3s"
					>
						<SparkleIcon className="size-5 text-white/40 drop-shadow-[0_0_2px_rgba(255,255,255,0.2)]" />
					</HeroOrbit>
					<HeroOrbit
						size={530}
						rotation={178}
						shouldOrbit
						orbitDuration="36s"
						shouldSpin
						spinDuration="3s"
					>
						<SparkleIcon className="size-10 text-white/40 drop-shadow-[0_0_4px_rgba(255,255,255,0.2)]" />
					</HeroOrbit>
					<HeroOrbit
						size={710}
						rotation={144}
						shouldOrbit
						orbitDuration="44s"
						shouldSpin
						spinDuration="3s"
					>
						<SparkleIcon className="size-14 text-white/40 drop-shadow-[0_0_5px_rgba(255,255,255,0.2)]" />
					</HeroOrbit>

					{/* tiny-dot orbits */}
					<HeroOrbit size={720} rotation={85} shouldOrbit orbitDuration="46s">
						<div className="size-3 rounded-full bg-white/50 shadow-[0_0_4px_rgba(255,255,255,0.3)]" />
					</HeroOrbit>
					<HeroOrbit size={520} rotation={-41} shouldOrbit orbitDuration="34s">
						<div className="size-2 rounded-full bg-white/50 shadow-[0_0_4px_rgba(255,255,255,0.3)]" />
					</HeroOrbit>
					<HeroOrbit size={650} rotation={-5} shouldOrbit orbitDuration="42s">
						<div className="size-2 rounded-full bg-white/50 shadow-[0_0_4px_rgba(255,255,255,0.3)]" />
					</HeroOrbit>

					{/* centered globe */}
					<div className="absolute inset-0 flex justify-center items-center pointer-events-auto">
						<div className="w-[600px] h-[600px]">
							<Globe />
						</div>
					</div>
				</div>

				{/* FOREGROUND CONTENT */}
				<div className="relative z-10 flex flex-col items-center text-center pointer-events-none">
					<Image
						src={memojiImage}
						alt="person behind laptop"
						className="w-[100px] h-[100px]"
					/>
					<div className="mt-4 bg-gray-950 border border-gray-800 px-4 py-1.5 inline-flex items-center gap-2 rounded-lg pointer-events-auto">
						<span className="block w-2.5 h-2.5 bg-green-500 rounded-full animate-ping-large" />
						<span className="text-sm font-medium">
							Available for new projects
						</span>
					</div>
					<h1 className="mt-8 font-serif text-3xl md:text-5xl tracking-wide">
						Hi, I&apos;m Juan Ceresa.
					</h1>
					<p className="mt-4 text-white/60 md:text-lg max-w-lg">
						I am a passionate developer dedicated to crafting seamless and
						engaging digital experiences.
					</p>
					<div className="mt-8 flex flex-col md:flex-row items-center gap-4 pointer-events-auto">
						<button className="flex items-center gap-2 border border-white/15 px-6 h-12 rounded-xl">
							<span className="font-semibold">Explore My Work</span>
							<ArrowDown className="w-4 h-4" />
						</button>
						<button className="flex items-center gap-2 border border-white bg-white text-gray-900 px-6 h-12 rounded-xl">
							<span>👋</span>
							<span className="font-semibold">Let&apos;s Connect</span>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
