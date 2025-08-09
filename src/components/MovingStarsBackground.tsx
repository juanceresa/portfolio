"use client";
import StarsImage from "@/assets/images/stars.png";
import GridLinesImage from "@/assets/images/grid-lines.png";
import {
	motion,
	useMotionTemplate,
	useScroll,
	useTransform,
} from "framer-motion";
import { useRef } from "react";
import useRelativeMousePosition from "@/components/hooks/useRelativeMousePosition";

interface MovingStarsBackgroundProps {
	children: React.ReactNode;
	className?: string;
	id?: string;
}

export const MovingStarsBackground = ({ 
	children, 
	className = "",
	id
}: MovingStarsBackgroundProps) => {
	const sectionRef = useRef<HTMLElement>(null);
	const backgroundRef = useRef<HTMLDivElement>(null);
	
	const { scrollYProgress } = useScroll({
		target: sectionRef,
		offset: ["start end", "end start"],
	});

	const backgroundPositionY = useTransform(
		scrollYProgress,
		[0, 1],
		[-300, 300]
	);

	const [mouseX, mouseY] = useRelativeMousePosition(backgroundRef);
	const maskImage = useMotionTemplate`radial-gradient(50% 50% at ${mouseX}px ${mouseY}px, black, transparent)`;

	return (
		<section ref={sectionRef} className={`relative ${className}`} id={id}>
			<motion.div
				ref={backgroundRef}
				animate={{
					backgroundPositionX: StarsImage.width,
				}}
				transition={{
					repeat: Infinity,
					duration: 60,
					ease: "linear",
				}}
				style={{
					backgroundPositionY,
					backgroundImage: `url(${StarsImage.src})`,
				}}
				className="absolute inset-0 overflow-hidden group"
			>
				<div
					className="absolute inset-0 bg-[rgb(74,32,138)] bg-blend-overlay [mask-image:radial-gradient(50%_50%_at_50%_35%,black,transparent)] group-hover:opacity-0 transition duration-700"
					style={{
						backgroundImage: `url(${GridLinesImage.src})`,
					}}
				></div>
				<motion.div
					className="absolute inset-0 bg-[rgb(74,32,138)] bg-blend-overlay opacity-0 group-hover:opacity-100 transition duration-700"
					style={{
						maskImage,
						backgroundImage: `url(${GridLinesImage.src})`,
					}}
				></motion.div>
			</motion.div>
			<div className="relative z-10">
				{children}
			</div>
		</section>
	);
};