"use client";

import { SectionHeader } from "@/components/SectionHeader";
import { Card } from "@/components/Card";
import { TechIcon } from "@/components/TechIcon";
import StarIcon from "@/assets/icons/star.svg";
import bookImage from "@/assets/images/book-cover.png";
import Image from "next/image";
import JavascriptIcon from "@/assets/icons/square-js.svg";
import HtmlIcon from "@/assets/icons/html5.svg";
import CssIcon from "@/assets/icons/css3.svg";
import ReactIcon from "@/assets/icons/react.svg";
import ChromeIcon from "@/assets/icons/chrome.svg";
import GithubIcon from "@/assets/icons/github.svg";
import dynamic from "next/dynamic";
import { CardHeader } from "@/components/CardHeader";
import { ToolboxItems } from "@/components/TollboxItems";

const BentoItemMapLocation = dynamic(() => import("@/components/MapLocation"), {
	ssr: false,
});

const toolboxItems = [
	{
		title: "JavaScript",
		iconType: JavascriptIcon,
	},
	{
		title: "HTML5",
		iconType: HtmlIcon,
	},
	{
		title: "CSS3",
		iconType: CssIcon,
	},
	{
		title: "React",
		iconType: ReactIcon,
	},
	{
		title: "Chrome",
		iconType: ChromeIcon,
	},
	{
		title: "Github",
		iconType: GithubIcon,
	},
];

export const AboutSection = () => {
	return (
		<div className="py-20 lg:py-28">
			<div className="container">
				<SectionHeader
					eyebrow="About Me"
					title="A Glimpse into My World"
					description="Learn more about who I am, what I do, and what inspires me."
				/>
				<div className="mt-20 flex flex-col gap-8">
					<div className="grid grid-cols-1 gap-8 md:grid-cols-5 lg:grid-cols-3">
						<Card className="h-[320px] md:col-span-2 lg:col-span-1">
							<CardHeader
								title="My Reads"
								description="Explore the books shaping my perspectives."
							/>
							<div className="w-40 mx-auto mt-2 md:mt-0">
								<Image src={bookImage} alt="Book cover" />
							</div>
						</Card>

						<Card className="h-[320px] md:col-span-3 lg:col-span-2">
							<CardHeader
								title="My Toolbox"
								description="Explore the technologies and tools I use to craft digital
								experiences."
								className=""
							/>

							<ToolboxItems items={toolboxItems} className="" />
							<ToolboxItems
								items={toolboxItems}
								className="mt-6"
								itemsWrapperClassName="-translate-x-1/2"
							/>
						</Card>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-5 lg:grid-cols-3 gap-8">
						<Card className="h-[320px] p-0 flex flex-col md:col-span-3 lg:col-span-2">
							<BentoItemMapLocation className="rounded-3xl" />
						</Card>

						<Card className="h-[320px] p-0 relative md:col-span-2 lg:col-span-1">
							<CardHeader // PLACEHOLDER -- MAYBE GITHUB STATS CARD
								title="Beyond the Code"
								description="Explore my interests, hobbies, and the things that inspire me
								outside of coding."
							/>
						</Card>
					</div>
				</div>
			</div>
		</div>
	);
};
