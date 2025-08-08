"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface Props {
	children: React.ReactNode;
	className?: string;
	style?: React.CSSProperties;
}

const BentoCard = (props: Props) => {
	const { children, className, ...rest } = props;

	return (
		<div 
			className={cn(
				"card group rounded-3xl relative overflow-hidden",
				"bg-gray-900/50 border border-white/10",
				"before:absolute before:inset-0 before:opacity-0 before:transition-opacity before:duration-500",
				"before:bg-[radial-gradient(600px_circle_at_var(--mouse-x)_var(--mouse-y),rgba(255,255,255,0.1),transparent_40%)]",
				"hover:before:opacity-100",
				className
			)} 
			{...rest}
		>
			<div className="card-content relative z-10 h-full p-6">
				{children}
			</div>
		</div>
	);
};

export default BentoCard;