import type { Metadata } from "next";
import { Inter, Calistoga } from "next/font/google";
import "./globals.css";
import { twMerge } from "tailwind-merge";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const calistoga = Calistoga({
	subsets: ["latin"],
	variable: "--font-serif",
	weight: "400",
});

export const metadata: Metadata = {
	title: {
		default: "Juan Ceresa | Software Engineer & Technology Consultant",
		template: "%s | Juan Ceresa"
	},
	description:
		"Bilingual Software Engineer exploring all facets of technology - from Python & C++ backends to AI, data analytics, and modern web development. Open to opportunities in software engineering, consulting, and global tech collaboration.",
	keywords: [
		"Juan Ceresa",
		"Software Engineer",
		"Technology Consultant",
		"Python Developer",
		"C++ Developer",
		"AI Engineer",
		"Data Analytics",
		"Backend Developer",
		"Full Stack Developer",
		"Bilingual Developer",
		"Spanish English Developer",
		"Machine Learning",
		"Software Architecture",
		"Technology Consulting",
		"Global Tech Collaboration",
		"Enterprise Software",
		"System Design",
		"DevOps",
		"Cloud Computing",
		"Database Design"
	],
	authors: [{ name: "Juan Ceresa", url: "https://juanceresa.dev" }],
	creator: "Juan Ceresa",
	publisher: "Juan Ceresa",
	formatDetection: {
		email: false,
		address: false,
		telephone: false,
	},
	metadataBase: new URL("https://juanceresa.dev"),
	alternates: {
		canonical: "/",
	},
	openGraph: {
		title: "Juan Ceresa | Software Engineer & Technology Consultant",
		description:
			"Bilingual Software Engineer exploring all facets of technology - from Python & C++ backends to AI, data analytics, and modern web development. Open to global tech opportunities.",
		url: "https://juanceresa.dev",
		siteName: "Juan Ceresa Portfolio",
		images: [
			{
				url: "/og-image.png",
				width: 1200,
				height: 630,
				alt: "Juan Ceresa - Software Engineer & Technology Consultant",
			},
		],
		locale: "en_US",
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		title: "Juan Ceresa | Software Engineer & Technology Consultant",
		description:
			"Bilingual Software Engineer exploring AI, data analytics, Python/C++ backends, and modern web technologies. Open to global collaboration.",
		images: ["/og-image.png"],
		creator: "@juanceresa",
	},
	robots: {
		index: true,
		follow: true,
		nocache: true,
		googleBot: {
			index: true,
			follow: false,
			noimageindex: true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
	category: "technology",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={twMerge(
					inter.variable,
					calistoga.variable,
					"bg-gray-900 text-white antialiased font-sans"
				)}
			>
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{
						__html: JSON.stringify({
							"@context": "https://schema.org",
							"@type": "Person",
							"name": "Juan Ceresa",
							"jobTitle": "Software Engineer & Technology Consultant",
							"description": "Bilingual Software Engineer exploring all facets of technology - from Python & C++ backends to AI, data analytics, and modern web development",
							"url": "https://juanceresa.dev",
							"knowsLanguage": [
								{
									"@type": "Language",
									"name": "English"
								},
								{
									"@type": "Language", 
									"name": "Spanish"
								}
							],
							"sameAs": [
								"https://github.com/juanceresa",
								"https://linkedin.com/in/juanceresa",
								"https://twitter.com/juanceresa"
							],
							"knowsAbout": [
								"Python",
								"C++",
								"Artificial Intelligence",
								"Machine Learning",
								"Data Analytics",
								"Backend Development",
								"Full Stack Development",
								"Software Architecture",
								"System Design",
								"DevOps",
								"Cloud Computing",
								"Database Design",
								"Technology Consulting",
								"Enterprise Software",
								"React",
								"Next.js",
								"JavaScript",
								"TypeScript"
							],
							"hasOccupation": {
								"@type": "Occupation",
								"name": "Software Engineer",
								"occupationLocation": {
									"@type": "Country",
									"name": "United States"
								},
								"skills": [
									"Python",
									"C++",
									"Artificial Intelligence",
									"Data Analytics",
									"Backend Development",
									"Full Stack Development",
									"Software Architecture",
									"DevOps",
									"Cloud Computing"
								]
							}
						})
					}}
				/>
				{children}
				<Analytics />
				<SpeedInsights />
			</body>
		</html>
	);
}
