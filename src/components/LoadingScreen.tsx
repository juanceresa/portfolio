// components/LoadingScreen.tsx
"use client";

export default function LoadingScreen() {
	return (
		<div className="fixed inset-0 bg-gray-950 flex items-center justify-center z-50">
			<div className="flex flex-col items-center gap-4">
				{/* Loading spinner */}
				<div className="relative size-16">
					<div className="absolute inset-0 rounded-full border-4 border-emerald-300/20"></div>
					<div className="absolute inset-0 rounded-full border-4 border-transparent border-t-emerald-300 animate-spin"></div>
				</div>
				
				{/* Loading text */}
				<div className="text-white/60 text-sm font-medium">
					Loading 3D Globe...
				</div>
			</div>
		</div>
	);
}