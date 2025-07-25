"use client";

import { useRef, useState, useEffect } from "react";
import { Canvas, useLoader, useFrame } from "@react-three/fiber";
import { useFBX, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { OrbitControls as OrbitControlsImpl } from "three-stdlib";

function RotatingLights() {
	const directionalLightRef = useRef<THREE.DirectionalLight>(null);
	const pointLight1Ref = useRef<THREE.PointLight>(null);
	const pointLight2Ref = useRef<THREE.PointLight>(null);

	useFrame((state) => {
		// Match the star rotation duration (52s) - same as in Hero.tsx
		const rotationSpeed = (2 * Math.PI) / (52 * 60); // 52 seconds in frames (60fps)
		const time = state.clock.elapsedTime * rotationSpeed;

		// Rotate main directional light around the globe
		if (directionalLightRef.current) {
			const radius = 8;
			directionalLightRef.current.position.set(
				Math.cos(time) * radius,
				5,
				Math.sin(time) * radius
			);
			// Make light always point toward the globe center
			directionalLightRef.current.lookAt(0, 0, 0);
		}

		// Rotate accent lights in opposite direction for dynamic shadows
		if (pointLight1Ref.current) {
			const radius1 = 6;
			pointLight1Ref.current.position.set(
				Math.cos(-time + Math.PI/3) * radius1,
				4,
				Math.sin(-time + Math.PI/3) * radius1
			);
		}

		if (pointLight2Ref.current) {
			const radius2 = 7;
			pointLight2Ref.current.position.set(
				Math.cos(time + Math.PI) * radius2,
				-3,
				Math.sin(time + Math.PI) * radius2
			);
		}
	});

	return (
		<>
			{/* Base ambient light */}
			<ambientLight intensity={0.4} />
			
			{/* Main rotating directional light - creates primary shadows */}
			<directionalLight 
				ref={directionalLightRef}
				intensity={1.0}
				color="#ffffff"
				castShadow
				shadow-mapSize-width={2048}
				shadow-mapSize-height={2048}
			/>
			
			{/* Rotating accent lights for depth */}
			<pointLight 
				ref={pointLight1Ref}
				intensity={0.3} 
				color="#87ceeb"  
			/>
			<pointLight 
				ref={pointLight2Ref}
				intensity={0.2} 
				color="#fff8dc"
			/>
		</>
	);
}

function EarthModel({ onLoaded }: { onLoaded: () => void }) {
	const groupRef = useRef<THREE.Group>(null);

	// Load model + texture
	const fbx = useFBX("/models/low-poly-planet-earth/source/Planet.fbx");
	const texture = useLoader(
		THREE.TextureLoader,
		"/models/low-poly-planet-earth/textures/Texture_Planet.png"
	);
	const clonedScene = fbx.clone();

	useEffect(() => {
		// Optimize texture
		texture.colorSpace = THREE.SRGBColorSpace;
		texture.generateMipmaps = true;
		texture.minFilter = THREE.LinearMipmapLinearFilter;
		texture.magFilter = THREE.LinearFilter;

		// Apply texture & color boost
		clonedScene.traverse((child) => {
			if (child instanceof THREE.Mesh && child.material) {
				child.frustumCulled = true;
				child.matrixAutoUpdate = true;

				const mat = child.material as THREE.MeshStandardMaterial;
				mat.map = texture;
				mat.color = new THREE.Color(0.9, 1.8, 3.2); // dark blue seas with deep greens
				mat.metalness = 0.2; // reduce metallic to preserve colors
				mat.roughness = 0.5; // slightly more rough to hold texture colors
				mat.emissive = new THREE.Color(0.05, 0.08, 0.1); // reduce emissive glow
				mat.emissiveIntensity = 0.05;
				mat.needsUpdate = true;
			}
		});

		// Recenter pivot so globe sits perfectly in view
		const bbox = new THREE.Box3().setFromObject(clonedScene);
		const center = bbox.getCenter(new THREE.Vector3());
		clonedScene.position.sub(center);

		// Set consistent initial rotation for reproducible loading
		if (groupRef.current) {
			groupRef.current.rotation.set(0, 0, 0);
		}

		// Signal that the globe is loaded
		onLoaded();
	}, [clonedScene, texture, onLoaded]);

	return (
		<group ref={groupRef} scale={1.4} position={[0, 0, 0]}>
			<primitive object={clonedScene} />
		</group>
	);
}

// Preload for faster startup
useFBX.preload("/models/low-poly-planet-earth/source/Planet.fbx");

// Create a context for globe loading state
export const useGlobeLoading = () => {
	const [globeLoaded, setGlobeLoaded] = useState(false);
	return { globeLoaded, setGlobeLoaded };
};

export default function Globe({
	onGlobeLoaded,
}: {
	onGlobeLoaded?: () => void;
}) {
	const [mounted, setMounted] = useState(false);
	const [globeLoaded, setGlobeLoaded] = useState(false);
	const controlsRef = useRef<OrbitControlsImpl>(null);

	useEffect(() => {
		setMounted(true);
	}, []);

	// Reset controls to consistent state on mount
	useEffect(() => {
		if (controlsRef.current && mounted) {
			// Use a small delay to ensure controls are fully initialized
			const timer = setTimeout(() => {
				if (controlsRef.current) {
					// Reset to consistent initial state
					controlsRef.current.reset();
					controlsRef.current.target.set(0, -0.5, 0); // Slightly lower target to center globe
					controlsRef.current.object.position.set(0, 0, 5);
					controlsRef.current.update();
				}
			}, 50);

			return () => clearTimeout(timer);
		}
	}, [mounted]);

	if (!mounted) {
		return <div className="absolute inset-0 -z-10" />;
	}

	return (
		<div className="w-full h-full z-0 pointer-events-auto">
			<Canvas
				camera={{ position: [0, 0, 5], fov: 50 }}
				gl={{
					antialias: true,
					alpha: true,
					powerPreference: "high-performance",
					stencil: false,
					depth: true,
				}}
				frameloop="always"
				performance={{ min: 0.8 }}
				dpr={[1, 1.5]}
			>
				{/* rotating lighting system */}
				<RotatingLights />

				{/* our Earth */}
				<EarthModel
					onLoaded={() => {
						setGlobeLoaded(true);
						onGlobeLoaded?.();
					}}
				/>

				{/* controls with momentum & "weight" */}
				<OrbitControls
					ref={controlsRef}
					enableZoom={false}
					enablePan={false}
					enableRotate
					rotateSpeed={1.5} // faster rotation speed
					enableDamping
					dampingFactor={0.02} // very low damping = much more momentum
					autoRotate // gentle auto‑spin when idle
					autoRotateSpeed={0.9} // faster auto‑rotate rate
					maxPolarAngle={Math.PI * 0.8}
					minPolarAngle={Math.PI * 0.2}
					target={[0, -0.5, 0]} // consistent target - slightly lower to center globe
					makeDefault
				/>
			</Canvas>
		</div>
	);
}
