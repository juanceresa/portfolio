"use client";

import { useEffect, useState, useRef } from "react";
import { CardHeader } from "./CardHeader";
import StarIcon from "@/assets/icons/star.svg";
import { gsap } from "gsap";
import SplitType from "split-type";

interface WakaTimeBestDay {
	date: string;
	text: string; // human readable from API
	total_seconds: number;
}

interface WakaTimeLanguage {
	name: string;
	text: string;
	hours: number;
	minutes: number;
}

interface WakaTimeProject {
	name: string;
	text: string;
	hours: number;
	minutes: number;
}

interface WakaTimeStats {
	daily_average_text: string;
	best_day: WakaTimeBestDay | null;
	top_project: WakaTimeProject | null;
	top_language: WakaTimeLanguage | null;
}

export const WakaTimeStats = () => {
	const [stats, setStats] = useState<WakaTimeStats | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const fetchWakaTimeStats = async () => {
			try {
				const response = await fetch("/api/wakatime");
				if (!response.ok) {
					throw new Error("Failed to fetch WakaTime stats");
				}
				const data = await response.json();
				setStats(data);
			} catch (err) {
				setError(err instanceof Error ? err.message : "Failed to fetch stats");
			} finally {
				setLoading(false);
			}
		};

		fetchWakaTimeStats();
	}, []);

	// GSAP cascading ripple animation effect
	useEffect(() => {
		if (!stats || !containerRef.current) return;

		const triggerCascadingRipple = () => {
			// Get all stat value elements in order
			const statElements = containerRef.current?.querySelectorAll('.stat-value');
			if (!statElements) return;

			// Convert to array for easier handling
			const elementsArray = Array.from(statElements);
			
			// Animate each stat element with a delay to create cascading effect
			elementsArray.forEach((element, index) => {
				// Split the text into characters
				const split = new SplitType(element as HTMLElement, { types: 'chars' });
				
				// Create wave animation - only one character up at a time
				gsap.set(split.chars, { y: 0 }); // Reset all characters to baseline
				
				split.chars?.forEach((char, charIndex) => {
					gsap.to(char, {
						y: -12,
						duration: 0.15,
						ease: "power2.out",
						delay: index * 0.8 + charIndex * 0.1, // Stat delay + character delay
					});
					
					// Bring character back down after brief pause
					gsap.to(char, {
						y: 0,
						duration: 0.15,
						ease: "power2.in",
						delay: index * 0.8 + charIndex * 0.1 + 0.15, // After the up animation
					});
				});
			});
		};

		// Trigger first animation quickly, then every 11 seconds
		const firstTimeout = setTimeout(triggerCascadingRipple, 2000); // First animation after 2 seconds
		const interval = setInterval(triggerCascadingRipple, 11000); // Every 11 seconds
		
		return () => {
			clearTimeout(firstTimeout);
			clearInterval(interval);
		};
	}, [stats]);

	if (loading) {
		return (
			<div className="h-full flex items-center justify-center">
				<div className="text-white/60">Loading WakaTime stats...</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="h-full flex flex-col">
				<div className="mb-4">
					<h3 className="text-white text-lg font-serif font-semibold">Stats This Month</h3>
				</div>
				<div className="flex items-center justify-center flex-1">
					<div className="text-white/60 text-sm">{error}</div>
				</div>
			</div>
		);
	}

	if (!stats) {
		return (
			<div className="h-full flex items-center justify-center">
				<div className="text-white/60">No stats available</div>
			</div>
		);
	}

	return (
		<div ref={containerRef} className="h-full flex flex-col">
			{/* Elegant Title */}
			<div className="mb-4">
        <div className="inline-flex items-center gap-2">
				  <StarIcon className="size-9 text-yellow-400" />
          <h3 className="text-white text-xl font-serif">Stats This Month</h3>
        </div>
			</div>

			<div className="flex-1 space-y-3">
				{/* Daily Average */}
				<div className="bg-white/5 rounded-lg p-3">
					<div className="flex items-center justify-between">
						<span className="text-white/80 text-sm font-medium">
							Daily Average
						</span>
						<span className="text-purple-400 text-sm font-mono stat-value">
							{stats.daily_average_text}
						</span>
					</div>
				</div>

				{/* Best Day */}
				{stats.best_day && (
					<div className="bg-white/5 rounded-lg p-3">
						<div className="flex items-center justify-between mb-1">
							<span className="text-white/80 text-sm font-medium">
								Best Day
							</span>
							<span className="text-cyan-400 text-sm font-mono stat-value">
								{stats.best_day.text}
							</span>
						</div>
						<div className="text-white/60 text-xs">
							{new Date(stats.best_day.date).toLocaleDateString("en-US", {
								weekday: "long",
								month: "long",
								day: "numeric",
							})}
						</div>
					</div>
				)}

				{/* Top Language */}
				{stats.top_language && (
					<div className="bg-white/5 rounded-lg p-3">
						<div className="flex items-center justify-between">
							<span className="text-white/80 text-sm font-medium">
								Top Language
							</span>
							<div className="flex items-center space-x-2">
								<span className="text-emerald-400 text-sm font-mono stat-value">
									{stats.top_language.name}
								</span>
								<span className="text-white/60 text-xs stat-value">
									{stats.top_language.hours}h {stats.top_language.minutes}m
								</span>
							</div>
						</div>
					</div>
				)}

				{/* Top Project */}
				{stats.top_project && (
					<div className="bg-white/5 rounded-lg p-3">
						<div className="flex items-center justify-between">
							<span className="text-white/80 text-sm font-medium">
								Top Project
							</span>
							<div className="flex items-center space-x-2">
								<span className="text-amber-400 text-sm font-mono stat-value">
									{stats.top_project.name}
								</span>
								<span className="text-white/60 text-xs stat-value">
									{stats.top_project.hours}h {stats.top_project.minutes}m
								</span>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};
