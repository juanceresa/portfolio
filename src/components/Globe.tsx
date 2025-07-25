"use client";

import { useRef, useState, useEffect } from "react";
import { Canvas, useLoader, useFrame } from "@react-three/fiber";
import { useFBX, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { OrbitControls as OrbitControlsImpl } from "three-stdlib";

// Responsive lighting that follows camera + auto-rotates
function ResponsiveLights() {
	const directionalLightRef = useRef<THREE.DirectionalLight>(null);
	const pointLight1Ref = useRef<THREE.PointLight>(null);
	const pointLight2Ref = useRef<THREE.PointLight>(null);

	useFrame((state) => {
		// Base auto-rotation (52s cycle) to match star orbits
		const baseRotationSpeed = (2 * Math.PI) / (52 * 60);
		const baseTime = state.clock.elapsedTime * baseRotationSpeed;
		
		// Camera direction for instant responsiveness (ChatGPT's key insight)
		const cameraDirection = state.camera.position.clone().normalize();
		
		// Auto-rotation direction
		const autoDirection = new THREE.Vector3(
			Math.cos(baseTime),
			0.15,
			Math.sin(baseTime)
		).normalize();
		
		// Blend: 80% camera responsive + 20% auto-rotation
		const finalDirection = cameraDirection.clone()
			.multiplyScalar(0.8)
			.add(autoDirection.multiplyScalar(0.2))
			.normalize();

		// Position main sun light
		if (directionalLightRef.current) {
			const lightPosition = finalDirection.clone().multiplyScalar(15);
			directionalLightRef.current.position.copy(lightPosition);
			directionalLightRef.current.lookAt(0, 0, 0);
		}

		// Opposite side rim light
		if (pointLight1Ref.current) {
			const oppositePos = finalDirection.clone().negate().multiplyScalar(12);
			pointLight1Ref.current.position.copy(oppositePos);
		}

		// Side accent light  
		if (pointLight2Ref.current) {
			const sidePos = new THREE.Vector3(-finalDirection.z, 0, finalDirection.x)
				.normalize().multiplyScalar(10);
			pointLight2Ref.current.position.copy(sidePos);
		}
	});

	return (
		<>
			{/* DRAMATIC DAY/NIGHT TERMINATOR EFFECT */}
			{/* Very low ambient for deep shadows */}
			<ambientLight intensity={0.08} color="#0f0f1a" />
			
			{/* Balanced directional light for sharp terminator */}
			<directionalLight 
				ref={directionalLightRef}
				intensity={1.8}
				color="#fff5d6"
				castShadow
				shadow-mapSize-width={4096}
				shadow-mapSize-height={4096}
				shadow-camera-near={0.1}
				shadow-camera-far={50}
				shadow-camera-left={-12}
				shadow-camera-right={12}
				shadow-camera-top={12}
				shadow-camera-bottom={-12}
				shadow-bias={-0.0005}
			/>
			
			{/* Subtle night-side lighting for earth details */}
			<pointLight 
				ref={pointLight1Ref}
				intensity={0.06} 
				color="#2a4d8a"  
			/>
			<pointLight 
				ref={pointLight2Ref}
				intensity={0.04} 
				color="#1a2857"
			/>
		</>
	);
}

function EarthModel({ onLoaded, globeRef }: { onLoaded: () => void; globeRef: React.RefObject<THREE.Group> }) {
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

		// Apply texture & enhanced colors without whitewashing
		clonedScene.traverse((child) => {
			if (child instanceof THREE.Mesh && child.material) {
				child.frustumCulled = true;
				child.matrixAutoUpdate = true;

				const mat = child.material as THREE.MeshStandardMaterial;
				mat.map = texture;
				mat.color = new THREE.Color(0.95, 1.4, 1.6); // Deep blues/greens without oversaturation
				mat.metalness = 0.1; // Lower metalness for better color retention
				mat.roughness = 0.8; // Higher roughness for natural earth surface
				mat.emissive = new THREE.Color(0.02, 0.03, 0.05); // Minimal emissive to preserve shadows
				mat.emissiveIntensity = 0.05;
				mat.needsUpdate = true;
			}
		});

		// Recenter pivot so globe sits perfectly in view
		const bbox = new THREE.Box3().setFromObject(clonedScene);
		const center = bbox.getCenter(new THREE.Vector3());
		clonedScene.position.sub(center);

		// Set consistent initial rotation for reproducible loading
		if (globeRef.current) {
			globeRef.current.rotation.set(0, 0, 0);
		}

		// Signal that the globe is loaded
		onLoaded();
	}, [clonedScene, texture, onLoaded, globeRef]);

	return (
		<group ref={globeRef} scale={1.4} position={[0, 0, 0]}>
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
	const controlsRef = useRef<OrbitControlsImpl>(null);
	const globeGroupRef = useRef<THREE.Group>(null);

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
				{/* responsive lighting system */}
				<ResponsiveLights />

				{/* our Earth */}
				<EarthModel
					globeRef={globeGroupRef}
					onLoaded={() => {
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