import React, { useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/MovingBorders";
import { SectionHeader } from "@/components/SectionHeader";

export const workExperience = [
	{
		id: 1,
		title: "Backend Systems",
		desc: "Automated ingestion of 100K+ academic records, eliminating manual workflows and saving 120 researcher hours/month.",
		className: "lg:col-span-2", // Changed from md to lg for proper spanning
		thumbnail: "/UGR_(3).svg",
	},
	{
		id: 2,
		title: "Strategy",
		desc: "Sized ulcerative colitis market and mapped 3 high-value patient segments for Omvoh launch strategy.",
		className: "lg:col-span-2",
		thumbnail: "/Eli_Lilly_and_Company.svg",
	},
	{
		id: 3,
		title: "Gen-AI",
		desc: "Audited 10K+ lines of model-generated Python, ranking in top 5% for accuracy over 4-month project cycle.",
		className: "lg:col-span-2",
		thumbnail: "/logo.svg",
	},
	{
		id: 4,
		title: "Consulting",
		desc: "Advised premium gifts strategy on customer experience optimization, delivering insights that contributed to $4M in donor commitments.",
		className: "lg:col-span-2",
		thumbnail: "/university-of-michigan-3.svg",
	},
];

const Experience = () => {
	useEffect(() => {
		const experienceSection = document.getElementById("experience");

		if (!experienceSection) return;

		const handleMouseMove = (e: MouseEvent) => {
			const cards = Array.from(
				experienceSection.getElementsByClassName("card")
			);
			for (const card of cards) {
				const rect = card.getBoundingClientRect();
				const x = e.clientX - rect.left;
				const y = e.clientY - rect.top;

				(card as HTMLDivElement).style.setProperty("--mouse-x", `${x}px`);
				(card as HTMLDivElement).style.setProperty("--mouse-y", `${y}px`);
			}
		};

		experienceSection.addEventListener("mousemove", handleMouseMove);

		return () => {
			experienceSection.removeEventListener("mousemove", handleMouseMove);
		};
	}, []);

	return (
		<section id="experience" className="py-20">
			<div className="container">
				<SectionHeader
					title="Cross-Industry Impact"
					eyebrow="Experience"
					description="Healthcare strategy, AI engineering, and backend systems across diverse industries."
				/>

				<div className="w-full mt-12 grid lg:grid-cols-4 grid-cols-1 gap-6">
					{workExperience.map((card, index) => (
						<Button
							key={card.id}
							// Pass the className to containerClassName to apply grid spans
							containerClassName={card.className}
							// Vary the duration for different speeds (in seconds)
							duration={Math.floor(Math.random() * 10) + 20}
							borderRadius="1.75rem"
							className="text-black dark:text-white border-neutral-200 dark:border-slate-800"
						>
							<div className="flex lg:flex-row flex-col lg:items-center p-4 md:p-5 lg:p-6 gap-4 h-full">
								<Image
									src={card.thumbnail}
									alt={card.title}
									width={128}
									height={128}
									className="lg:w-28 md:w-24 w-20 object-contain flex-shrink-0"
								/>
								<div className="lg:ms-4 flex flex-col justify-center">
									<h3 className="font-serif text-xl md:text-2xl text-white font-bold text-start">
										{card.title}
									</h3>
									<p className="text-sm lg:text-base text-white/60 mt-2 text-start">
										{card.desc}
									</p>
								</div>
							</div>
						</Button>
					))}
				</div>
			</div>
		</section>
	);
};

export default Experience;
