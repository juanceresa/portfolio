import darkSaasLandingPage from "@/assets/images/dark-saas-landing-page.png";
import lightSaasLandingPage from "@/assets/images/light-saas-landing-page.png";
import aiStartupLandingPage from "@/assets/images/ai-startup-landing-page.png";

const portfolioProjects = [
	{
		company: "Acme Corp",
		year: "2022",
		title: "Dark Saas Landing Page",
		results: [
			{ title: "Enhanced user experience by 40%" },
			{ title: "Improved site speed by 50%" },
			{ title: "Increased mobile traffic by 35%" },
		],
		link: "https://youtu.be/4k7IdSLxh6w",
		image: darkSaasLandingPage,
	},
	{
		company: "Innovative Co",
		year: "2021",
		title: "Light Saas Landing Page",
		results: [
			{ title: "Boosted sales by 20%" },
			{ title: "Expanded customer reach by 35%" },
			{ title: "Increased brand awareness by 15%" },
		],
		link: "https://youtu.be/7hi5zwO75yc",
		image: lightSaasLandingPage,
	},
	{
		company: "Quantum Dynamics",
		year: "2023",
		title: "AI Startup Landing Page",
		results: [
			{ title: "Enhanced user experience by 40%" },
			{ title: "Improved site speed by 50%" },
			{ title: "Increased mobile traffic by 35%" },
		],
		link: "https://youtu.be/Z7I5uSRHMHg",
		image: aiStartupLandingPage,
	},
];

export const ProjectsSection = () => {
	return (
		<div>
			<div className="container">
				<p> Real World Results </p>
				<h2> Featured Projects </h2>
				<p className="text-center md:text-lg lg:text-xl text-white/60 mt-4 max-w-md mx-auto">
					Here are some of my recent projects that showcase my skills and the
					impact Ive made.
				</p>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1"></div>
			</div>
		</div>
	);
};
