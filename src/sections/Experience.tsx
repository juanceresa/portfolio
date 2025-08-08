import React, { useEffect } from "react";
import { Button } from "@/components/MovingBorders";
import { SectionHeader } from "@/components/SectionHeader";

export const workExperience = [
	{
		id: 1,
		title: "Frontend Engineer Intern",
		desc: "Assisted in the development of a web-based platform using React.js, enhancing interactivity.",
		className: "md:col-span-2",
		thumbnail: "/exp1.svg",
	},
	{
		id: 2,
		title: "Mobile App Dev - JSM Tech",
		desc: "Designed and developed mobile app for both iOS & Android platforms using React Native.",
		className: "md:col-span-2",
		thumbnail: "/exp2.svg",
	},
	{
		id: 3,
		title: "Freelance App Dev Project",
		desc: "Led the dev of a mobile app for a client, from initial concept to deployment on app stores.",
		className: "md:col-span-2",
		thumbnail: "/exp3.svg",
	},
	{
		id: 4,
		title: "Lead Frontend Developer",
		desc: "Developed and maintained user-facing features using modern frontend technologies.",
		className: "md:col-span-2",
		thumbnail: "/exp4.svg",
	},
];

const Experience = () => {
	useEffect(() => {
		const experienceSection = document.getElementById("experience");

		if (!experienceSection) return;

		const handleMouseMove = (e: MouseEvent) => {
			const cards = Array.from(experienceSection.getElementsByClassName("card"));
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
					title="My Work Experience"
					eyebrow="Career Journey"
					description="Explore the milestones and achievements that have shaped my professional path."
				/>

				<div className="w-full mt-12 grid lg:grid-cols-4 grid-cols-1 gap-10">
				{workExperience.map((card) => (
					<Button
						key={card.id}
						duration={Math.floor(Math.random() * 10000) + 10000}
						borderRadius="1.75rem"
						style={{
							borderRadius: `calc(1.75rem* 0.96)`,
						}}
						className="flex-1 text-black dark:text-white border-neutral-200 dark:border-slate-800"
					>
						<div className="flex lg:flex-row flex-col lg:items-center p-3 py-6 md:p-5 lg:p-10 gap-2">
							<img
								src={card.thumbnail}
								alt={card.thumbnail}
								className="lg:w-32 md:w-20 w-16"
							/>
							<div className="lg:ms-5">
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

