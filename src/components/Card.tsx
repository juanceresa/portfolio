import grainImage from "@/assets/images/grain.jpg";
import { twMerge } from "tailwind-merge";
import { PropsWithChildren } from "react";

export const Card = ({
	className,
	children,
}: PropsWithChildren<{ className?: string }>) => {
	return (
		<div
			className={twMerge(
				"bg-gray-800 rounded-3xl relative z-0 overflow-hidden after:z-10 after:content-[''] after:absolute after:inset-0 after:border-2 after:border-white/20 after:rounded-3xl after:pointer-events-none",
				className
			)}
		>
			<div
				className="absolute inset-0 -z-10 opacity-5"
				style={{ backgroundImage: `url(${grainImage.src})` }}
			></div>
			{children}
		</div>
	);
};
