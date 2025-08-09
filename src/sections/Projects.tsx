import React from "react";

import darkSaasLandingPage from "@/assets/images/dark-saas-landing-page.png";
import portfolio from "@/assets/images/portfolio.png";
import aiStartupLandingPage from "@/assets/images/ai-startup-landing-page.png";
import Image from "next/image";
import CheckCircleIcon from "@/assets/icons/check-circle.svg";
import ArrowUpRightIcon from "@/assets/icons/arrow-up-right.svg";
import { SectionHeader } from "@/components/SectionHeader";
import BentoCard from "@/components/BentoCard";

export const ProjectSection = () => {
	const portfolioProjects = [
		{
			company: "EC3 Research",
			year: "2025",
			title: "BigQuery Academic Research Data Pipeline",
			results: [
				{ title: "Automated ingestion of 120K+ academic records" },
				{ title: "Cross-database researcher matching (OpenAlex, Scopus)" },
				{
					title:
						"Eliminated manual workflows, saved 120 researcher hours/month",
				},
			],
			link: "https://github.com/juanceresa/BigQuery",
			image: darkSaasLandingPage,
		},
		{
			company: "JuanCeresa.com",
			year: "2025",
			title: "Portfolio Project",
			results: [
				{ title: "Implemented smooth 60fps 3D animations" },
				{ title: "Integrated live API data visualization" },
				{ title: "Optimized Core Web Vitals performance" },
			],
			link: "https://github.com/juanceresa/portfolio",
			image: portfolio,
		},
	];

	return (
		<section className="pb-16 lg:py-24">
			<div className="container">
				<SectionHeader
					title="Featured Work"
					eyebrow="Projects"
					description="AI experiments, full-stack solutions, and cross-domain technology projects."
					link={{ href: "/projects", text: "View All Projects" }}
				/>
				<div className="flex flex-col mt-10 gap-20">
					{portfolioProjects.map((project, projectindex) => (
						<BentoCard
							key={project.title}
							className="sticky bg-black [&>.card-content]:px-8 [&>.card-content]:pt-8 [&>.card-content]:pb-0 [&>.card-content]:md:pt-12 [&>.card-content]:md:px-10 [&>.card-content]:lg:pt-16 [&>.card-content]:lg:px-20"
							style={{
								top: `calc(64px + ${projectindex * 40}px)`,
							}}
						>
							<div className="lg:grid lg:grid-cols-2 lg:gap-16">
								<div className="lg:pb-16">
									<div className="bg-gradient-to-r from-emerald-300 to-sky-400 inline-flex gap-2 font-bold uppercase tracking-widest text-sm bg-clip-text text-transparent">
										<span>{project.company}</span>
										<span>&bull;</span>
										<span>{project.year}</span>
									</div>
									<h3 className="font-serif text-2xl mt-2 md:mt-5 md:text-4xl">
										{project.title}
									</h3>
									<hr className="border-t-2 border-white/5 mt-4 md:mt-5" />
									<ul className="flex flex-col gap-4 mt-4 md:mt-5">
										{project.results.map((result) => (
											<li
												key={result.title}
												className="flex gap-2 text-sm text-white/50 md:text-base"
											>
												<CheckCircleIcon className="size-5 md:size-6" />
												<span>{result.title}</span>
											</li>
										))}
									</ul>
									<a href={project.link}>
										<button className="bg-white text-gray-950 h-12 w-full rounded-xl font-semibold inline-flex items-center justify-center gap-2 mt-8 md:w-auto px-8">
											<span>Github</span>
											<ArrowUpRightIcon className="size-4" />
										</button>
									</a>
								</div>
								<div className="relative">
									<Image
										src={project.image}
										alt={project.title}
										className="mt-8 -mb-4 md:-mb-0 lg:mt-0 lg:absolute lg:h-full lg:w-auto lg:max-w-none"
									/>
								</div>
							</div>
						</BentoCard>
					))}
				</div>
			</div>
		</section>
	);
};
