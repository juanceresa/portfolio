"use client";

import { useEffect, useState } from "react";
import { CardHeader } from "./CardHeader";

interface WakaTimeProject {
	name: string;
	total_seconds: number;
	text: string; // human readable total from API
	hours: number;
	minutes: number;
	percent: number;
}

interface WakaTimeBestDay {
	date: string;
	text: string; // human readable from API
	total_seconds: number;
}

interface WakaTimeStats {
	daily_average_seconds: number;
	daily_average_text: string;
	best_day: WakaTimeBestDay | null;
	all_time_projects: WakaTimeProject[];
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
				<CardHeader
					title="Coding Activity"
					description="My development stats and project breakdown"
				/>
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
			{/* <CardHeader
        title="Coding Activity"
        description="My development stats and project breakdown"
      /> */}

			<div className="flex-1 space-y-4 mt-4">
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
								year: "numeric",
								month: "long",
								day: "numeric",
							})}
						</div>
					</div>
				)}

				{/* Project Breakdown */}
				<div>
					<h4 className="text-white/90 text-sm font-medium mb-2">
						Project Breakdown (All Time)
					</h4>
					<div className="space-y-2 max-h-40 overflow-y-auto">
						{stats.all_time_projects.slice(0, 6).map((project, index) => (
							<div
								key={project.name}
								className="flex items-center justify-between bg-white/5 rounded-lg p-2"
							>
								<div className="flex items-center space-x-2">
									<div
										className="w-2 h-2 rounded-full"
										style={{ backgroundColor: getProjectColor(index) }}
									/>
									<span className="text-white/80 text-xs truncate max-w-[120px]">
										{project.name}
									</span>
								</div>
								<span className="text-white/60 text-xs font-mono">
									{project.text}
								</span>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

function getProjectColor(index: number): string {
	const colors = [
		"#8b5cf6", // purple-500
		"#06b6d4", // cyan-500
		"#10b981", // emerald-500
		"#f59e0b", // amber-500
		"#ef4444", // red-500
		"#3b82f6", // blue-500
	];

	return colors[index % colors.length];
}
