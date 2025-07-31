"use client";

import { useEffect, useState } from "react";
import { CardHeader } from "./CardHeader";

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
					<h3 className="text-white text-lg font-semibold">Stats This Month</h3>
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
		<div className="h-full flex flex-col">
			{/* Elegant Title */}
			<div className="mb-4">
				<h3 className="text-white text-lg font-semibold">Stats This Month</h3>
			</div>

			<div className="flex-1 space-y-3">
				{/* Daily Average */}
				<div className="bg-white/5 rounded-lg p-3">
					<div className="flex items-center justify-between">
						<span className="text-white/80 text-sm font-medium">
							Daily Average
						</span>
						<span className="text-purple-400 text-sm font-mono">
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
							<span className="text-cyan-400 text-sm font-mono">
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
								<span className="text-emerald-400 text-sm font-mono">
									{stats.top_language.name}
								</span>
								<span className="text-white/60 text-xs">
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
								<span className="text-amber-400 text-sm font-mono">
									{stats.top_project.name}
								</span>
								<span className="text-white/60 text-xs">
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
