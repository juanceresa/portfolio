import "./RayLight.css";

import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

const TYPE = {
	primary: "ray-light",
	secondary: "ray-light-secondary",
};

interface Props extends Pick<ComponentProps<"div">, "className"> {
	type?: keyof typeof TYPE;
}

const RayLight = ({ className, type }: Props) => {
	return (
		<div
			className={cn(
				"absolute h-[130px] w-[1190px] rounded-full",
				"left-[84px] -rotate-[32deg]",
				"opacity-30 blur-[48px]",
				type ? TYPE[type] : TYPE["primary"],
				className
			)}
		></div>
	);
};

export default RayLight;
