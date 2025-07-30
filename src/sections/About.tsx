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
		<div className="pb-96">
			<div className="container">
				<SectionHeader
					eyebrow="About Me"
					title="A Glimpse into My World"
					description="Learn more about who I am, what I do, and what inspires me."
				/>
				<div className="mt-20">
					<Card className="h-[320px]">
						<div className="flex flex-col">
							<div className="inline-flex items-center gap-2">
								<StarIcon className="size-9 text-yellow-400" />
								<h3 className="font-serif tex-3xl">My Reads</h3>
							</div>
							<p className="text-sm text-white/60 mt-2">
								Explore the books shaping my perspectives.
							</p>
						</div>
						<div className="w-40 mx-auto mt-8">
							<Image src={bookImage} alt="Book cover" />
						</div>
					</Card>

					<Card>
						<div>
							<StarIcon />
							<h3>My Toolbox</h3>
							<p>
								Explore the technologies and tools I use to craft digital
								experiences.
							</p>
						</div>
						<div>
							{toolboxItems.map((item) => (
								<div key={item.title}>
									<TechIcon component={item.iconType} />
									<span>{item.title}</span>
								</div>
							))}
						</div>
					</Card>
					<Card>
						<div>
							<StarIcon />
							<h3>Beyond the Code</h3>
							<p>
								Explore my interests, hobbies, and the things that inspire me
								outside of coding.
							</p>
						</div>
					</Card>
					<Card className="h-64">
						<BentoItemMapLocation className="rounded-3xl" />
					</Card>
				</div>
			</div>
		</div>
	);
};
