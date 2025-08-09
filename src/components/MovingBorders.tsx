"use client";
import React, { useEffect } from "react";
import {
	motion,
	useMotionValue,
	useMotionTemplate,
	animate,
} from "framer-motion";
import { cn } from "@/lib/utils";

export function Button({
	borderRadius = "1.75rem",
	children,
	as: Component = "button",
	containerClassName,
	borderClassName,
	duration = 8,
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
	// Motion values for gradient animation
	const gradientAngle = useMotionValue(0);

	// Create a motion template for the gradient
	const backgroundImage = useMotionTemplate`conic-gradient(from ${gradientAngle}deg at 50% 50%,
		transparent 0deg,
		transparent 80deg,
		#10b981 85deg,
		#ffffff 90deg,
		#10b981 95deg,
		transparent 100deg,
		transparent 360deg)`;

	useEffect(() => {
		// Animate the gradient rotation continuously
		const controls = animate(gradientAngle, 360, {
			duration: duration,
			ease: "linear",
			repeat: Infinity,
			repeatType: "loop",
		});

		return () => controls.stop();
	}, [duration, gradientAngle]);

	return (
		<Component
			className={cn("relative overflow-hidden z-0", containerClassName)}
			style={{
				borderRadius: borderRadius,
			}}
			{...otherProps}
		>
			{/* Animated gradient border */}
			<motion.div
				className="absolute inset-0 z-0 pointer-events-none"
				style={{
					backgroundImage,
					borderRadius: borderRadius,
				}}
			/>

			{/* Content Layer */}
			<div
				className={cn(
					"card group rounded-3xl relative overflow-hidden h-full w-full z-10",
					"border border-white/10",
					"before:absolute before:inset-0 before:opacity-0 before:transition-opacity before:duration-500 before:z-20",
					"before:bg-[radial-gradient(600px_circle_at_var(--mouse-x)_var(--mouse-y),rgba(255,255,255,0.1),transparent_40%)]",
					"hover:before:opacity-100"
				)}
				style={{
					borderRadius: `calc(${borderRadius} * 0.96)`,
				}}
			>
				{/* Solid dark background */}
				<div
					className="absolute inset-0 bg-black rounded-3xl z-0"
					style={{ borderRadius: `calc(${borderRadius} * 0.96)` }}
				/>

				{/* Blur overlay */}
				<div
					className="absolute inset-0 bg-black/50 backdrop-blur-sm rounded-3xl z-5"
					style={{ borderRadius: `calc(${borderRadius} * 0.96)` }}
				/>

				<div className={cn("card-content relative z-30 h-full", className)}>
					{children}
				</div>
			</div>
		</Component>
	);
}

// Alternative implementation with moving dot border
export function ButtonWithMovingDot({
	borderRadius = "1.75rem",
	children,
	as: Component = "button",
	containerClassName,
	borderClassName,
	duration = 3,
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
	// Motion values for the moving light position
	const angle = useMotionValue(0);

	// Calculate x and y positions based on angle
	const backgroundImage = useMotionTemplate`radial-gradient(circle at ${angle}% 50%, #10b981 0%, #ffffff 2%, #10b981 4%, transparent 8%, transparent 100%)`;

	useEffect(() => {
		// Animate the position around the border
		const controls = animate(angle, [0, 25, 50, 75, 100], {
			duration: duration,
			ease: "linear",
			repeat: Infinity,
			repeatType: "loop",
		});

		return () => controls.stop();
	}, [duration, angle]);

	return (
		<Component
			className={cn("relative overflow-hidden z-0", containerClassName)}
			style={{
				borderRadius: borderRadius,
			}}
			{...otherProps}
		>
			{/* Animated gradient border */}
			<motion.div
				className="absolute inset-0 z-0 pointer-events-none"
				style={{
					background: backgroundImage,
					borderRadius: borderRadius,
				}}
			/>

			{/* Content Layer */}
			<div
				className={cn(
					"card group rounded-3xl relative overflow-hidden h-full w-full z-10",
					"border border-white/10",
					"before:absolute before:inset-0 before:opacity-0 before:transition-opacity before:duration-500 before:z-20",
					"before:bg-[radial-gradient(600px_circle_at_var(--mouse-x)_var(--mouse-y),rgba(255,255,255,0.1),transparent_40%)]",
					"hover:before:opacity-100"
				)}
				style={{
					borderRadius: `calc(${borderRadius} * 0.96)`,
				}}
			>
				{/* Solid dark background */}
				<div
					className="absolute inset-0 bg-black rounded-3xl z-0"
					style={{ borderRadius: `calc(${borderRadius} * 0.96)` }}
				/>

				{/* Blur overlay */}
				<div
					className="absolute inset-0 bg-black/50 backdrop-blur-sm rounded-3xl z-5"
					style={{ borderRadius: `calc(${borderRadius} * 0.96)` }}
				/>

				<div className={cn("card-content relative z-30 h-full", className)}>
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
	const pathRef = React.useRef<SVGRectElement>(null);
	const progress = useMotionValue(0);

	useEffect(() => {
		if (!pathRef.current) return;

		const length = pathRef.current.getTotalLength();

		const controls = animate(progress, length, {
			duration: duration / 1000,
			ease: "linear",
			repeat: Infinity,
			repeatType: "loop",
		});

		return () => controls.stop();
	}, [duration, progress]);

	const x = useMotionValue(0);
	const y = useMotionValue(0);

	useEffect(() => {
		const unsubscribe = progress.on("change", (val) => {
			if (!pathRef.current) return;
			const point = pathRef.current.getPointAtLength(
				val % pathRef.current.getTotalLength()
			);
			x.set(point.x);
			y.set(point.y);
		});

		return unsubscribe;
	}, [progress, x, y]);

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
