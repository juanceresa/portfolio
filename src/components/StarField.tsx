"use client";
import StarsImage from "@/assets/images/stars.png";

export const StarField = () => {
	return (
		<div
			style={{
				backgroundImage: `url(${StarsImage.src})`,
				animation: `moveStars 60s linear infinite`,
				'--stars-width': `${StarsImage.width}px`,
			} as React.CSSProperties}
			className="absolute inset-0 pointer-events-none"
		/>
	);
};