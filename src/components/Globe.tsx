"use client";

import { useRef, useState, useEffect } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { useFBX, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { OrbitControls as OrbitControlsImpl } from "three-stdlib";

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
				mat.color = new THREE.Color(1.3, 1.2, 1.1); // boost saturation
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
				{/* lighting */}
				<ambientLight intensity={0.6} />
				<directionalLight position={[5, 5, 5]} intensity={0.8} />

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
