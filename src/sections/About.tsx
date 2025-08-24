"use client";

import { SectionHeader } from "@/components/SectionHeader";
import { TechIcon } from "@/components/TechIcon";
import StarIcon from "@/assets/icons/star.svg";
import JavascriptIcon from "@/assets/icons/square-js.svg";
import HtmlIcon from "@/assets/icons/html5.svg";
import CssIcon from "@/assets/icons/css3.svg";
import ReactIcon from "@/assets/icons/react.svg";
import ChromeIcon from "@/assets/icons/chrome.svg";
import GithubIcon from "@/assets/icons/github.svg";
import PythonIcon from "@/assets/icons/Python-2.svg";
import CplusplusIcon from "@/assets/icons/c-plus-plus-svgrepo-com.svg";
import SqlIcon from "@/assets/icons/sql.svg";
import dynamic from "next/dynamic";
import { CardHeader } from "@/components/CardHeader";
import { ToolboxItems } from "@/components/TollboxItems";
import BentoCard from "@/components/BentoCard";
import { ScrapBook } from "@/components/ScrapBook";
import { WakaTimeStats } from "@/components/WakaTimeStats";
import { useEffect } from "react";
import { Card } from "@/components/Card";

const BentoItemMapLocation = dynamic(() => import("@/components/MapLocation"), {
	ssr: false,
});

const toolboxItems = [
	{
		title: "Python",
		iconType: PythonIcon,
	},
	{
		title: "C++",
		iconType: CplusplusIcon,
	},
	{
		title: "SQL",
		iconType: SqlIcon,
	},
	{
		title: "JavaScript",
		iconType: JavascriptIcon,
	},
	{
		title: "React",
		iconType: ReactIcon,
	},
	{
		title: "Github",
		iconType: GithubIcon,
	},
];

export const AboutSection = () => {
	useEffect(() => {
		const bento = document.getElementById("bento");

		if (!bento) return;

		const handleMouseMove = (e: MouseEvent) => {
			const cards = Array.from(document.getElementsByClassName("card"));
			for (const card of cards) {
				const rect = card.getBoundingClientRect();
				const x = e.clientX - rect.left;
				const y = e.clientY - rect.top;

				(card as HTMLDivElement).style.setProperty("--mouse-x", `${x}px`);
				(card as HTMLDivElement).style.setProperty("--mouse-y", `${y}px`);
			}
		};

		bento.addEventListener("mousemove", handleMouseMove);

		return () => {
			bento.removeEventListener("mousemove", handleMouseMove);
		};
	}, []);

	return (
		<div id="about" className="py-20 lg:py-28">
			<div className="container">
				<SectionHeader
					eyebrow="Explore My World"
					title="Tech Enthusiast"
					description="Building my knowledge stack one technology, one language, one industry at a time."
					link={{ href: "/about", text: "More About Me" }}
				/>
				<div id="bento" className="mt-20 flex flex-col gap-8">
					<div className="grid grid-cols-1 gap-8 md:grid-cols-5 lg:grid-cols-3">
						<BentoCard className="h-[320px] md:col-span-2 lg:col-span-1 [&>.card-content]:p-0 before:!opacity-0">
							<ScrapBook className="h-full w-full" />
						</BentoCard>

						<BentoCard className="h-[320px] md:col-span-3 lg:col-span-2">
							<CardHeader
								title="My Stack"
								description="Python, C++, AI, and web technologies across diverse projects."
								className=""
							/>

							<ToolboxItems
								items={toolboxItems}
								className=""
								itemsWrapperClassName="animate-[move-left_25s_linear_infinite]"
							/>
							<ToolboxItems
								items={toolboxItems}
								className="mt-6"
								itemsWrapperClassName="animate-[move-right_25s_linear_infinite]"
							/>
						</BentoCard>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-5 lg:grid-cols-3 gap-8">
						<BentoCard className="h-[320px] p-0 flex flex-col md:col-span-3 lg:col-span-2 [&>.card-content]:p-0">
							<BentoItemMapLocation className="rounded-3xl" />
						</BentoCard>

						<BentoCard className="h-[320px] md:col-span-2 lg:col-span-1">
							<WakaTimeStats />
						</BentoCard>
					</div>
				</div>
			</div>
		</div>
	);
};
