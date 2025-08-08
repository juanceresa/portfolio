"use client";
import React from "react";
import {
	motion,
	useAnimationFrame,
	useMotionTemplate,
	useMotionValue,
	useTransform,
} from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

export function Button({
	borderRadius = "1.75rem",
	children,
	as: Component = "button",
	containerClassName,
	borderClassName,
	duration,
	className,
	...otherProps
}: {
	borderRadius?: string;
	children: React.ReactNode;
	as?: any;
	containerClassName?: string;
	borderClassName?: string;
	duration?: number;
	className?: string;
	[key: string]: any;
}) {
	return (
		<Component
			className={cn(
				// Container - static, no animation
				"relative overflow-hidden p-[2px] md:col-span-2 md:row-span-1 z-0",
				containerClassName
			)}
			style={{
				borderRadius: borderRadius,
				background: `conic-gradient(from 0deg, transparent 0%, transparent 12%, #10b981 16%, #ffffff 18%, #10b981 20%, transparent 24%, transparent 100%)`,
			}}
			{...otherProps}
		>
			{/* Rotating gradient overlay - only this spins */}
			<div
				className="absolute inset-0 animate-spin z-0 pointer-events-none"
				style={{
					background: `conic-gradient(from 0deg, transparent 0%, transparent 12%, #10b981 16%, #ffffff 18%, #10b981 20%, transparent 24%, transparent 100%)`,
					borderRadius: borderRadius,
					animationDuration: `${duration || 4000}ms`,
				}}
			></div>

			{/* Content Layer - BentoCard that maintains full height */}
			<div 
				className={cn(
					// Exact BentoCard structure with mouse lighting - full height maintained
					"card group rounded-3xl relative overflow-hidden h-full w-full z-10",
					"bg-gray-900 border border-white/10", // Solid background to cover center
					"before:absolute before:inset-0 before:opacity-0 before:transition-opacity before:duration-500 before:z-20",
					"before:bg-[radial-gradient(600px_circle_at_var(--mouse-x)_var(--mouse-y),rgba(255,255,255,0.1),transparent_40%)]",
					"hover:before:opacity-100"
				)}
				style={{ 
					borderRadius: `calc(${borderRadius} * 0.95)`,
				}}
			>
				<div className={cn("card-content relative z-30 h-full p-6", className)}>
					{children}
				</div>
			</div>
		</Component>
	);
}

export const MovingBorder = ({
	children,
	duration = 2000,
	rx,
	ry,
	...otherProps
}: {
	children: React.ReactNode;
	duration?: number;
	rx?: string;
	ry?: string;
	[key: string]: any;
}) => {
	const pathRef = useRef<any>();
	const progress = useMotionValue<number>(0);

	useAnimationFrame((time) => {
		const length = pathRef.current?.getTotalLength();
		if (length) {
			const pxPerMillisecond = length / duration;
			progress.set((time * pxPerMillisecond) % length);
		}
	});

	const x = useTransform(
		progress,
		(val) => pathRef.current?.getPointAtLength(val).x
	);
	const y = useTransform(
		progress,
		(val) => pathRef.current?.getPointAtLength(val).y
	);

	const transform = useMotionTemplate`translateX(${x}px) translateY(${y}px) translateX(-50%) translateY(-50%)`;

	return (
		<>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				preserveAspectRatio="none"
				className="absolute h-full w-full"
				width="100%"
				height="100%"
				{...otherProps}
			>
				<rect
					fill="none"
					width="100%"
					height="100%"
					rx={rx}
					ry={ry}
					ref={pathRef}
				/>
			</svg>
			<motion.div
				style={{
					position: "absolute",
					top: 0,
					left: 0,
					display: "inline-block",
					transform,
				}}
			>
				{children}
			</motion.div>
		</>
	);
};
