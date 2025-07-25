"use client";

import { useRef, useState, useEffect, useMemo } from "react";
import { Canvas, useLoader, useFrame } from "@react-three/fiber";
import { useFBX, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { OrbitControls as OrbitControlsImpl } from "three-stdlib";
// Responsive lighting that follows camera + auto‑rotates

function ResponsiveLights() {
	/* === refs === */
	const directionalLightRef = useRef<THREE.DirectionalLight>(null);
	const pointLight1Ref = useRef<THREE.PointLight>(null);

	// spotlight that drives the large gradient
	const sideSpotRef = useRef<THREE.SpotLight>(null);

	/* target object the spotlight looks at (must be in scene) */
	const sideTarget = useMemo(() => new THREE.Object3D(), []);

	/* === per‑frame update === */
	useFrame((state) => {
		const baseSpeed = (2 * Math.PI) / (52 * 60);
		const t = state.clock.elapsedTime * baseSpeed;

		const camDir = state.camera.position.clone().normalize();
		const autoDir = new THREE.Vector3(
			Math.cos(t),
			0.15,
			Math.sin(t)
		).normalize();

		const sunDir = camDir
			.clone()
			.multiplyScalar(0.1) // (smaller camera influence — tweak as you like)
			.add(autoDir.multiplyScalar(0.01))
			.normalize();

		/* low‑intensity directional (can stay zero) */
		if (directionalLightRef.current) {
			directionalLightRef.current.position.copy(
				sunDir.clone().multiplyScalar(15)
			);
			directionalLightRef.current.lookAt(0, 0, 0);
		}

		/* rim on night side */
		pointLight1Ref.current?.position.copy(
			sunDir.clone().negate().multiplyScalar(12)
		);

		/* side spotlight – 90° around sun + slight upward tilt */
		if (sideSpotRef.current) {
			const rawSide = new THREE.Vector3(-sunDir.z, 0.15, sunDir.x).normalize();
			const sideDir = rawSide.clone().lerp(sunDir, 0.4).normalize(); // ★ blend 40 % toward sun

			// ① move closer so cone footprint is larger
			sideSpotRef.current.position.copy(sideDir.clone().multiplyScalar(7)); // same radius

			// always aim at globe centre
			sideTarget.position.set(0, 0, 0);
			sideSpotRef.current.target = sideTarget;
		}
	});

	/* === lights === */
	return (
		<>
			<ambientLight intensity={0.02} />

			<hemisphereLight args={["#fff8e1", "#1a1a2e", 0.1]} />

			<directionalLight
				ref={directionalLightRef}
				color="#ffffff"
				intensity={0}
				castShadow
			/>

			<pointLight
				ref={pointLight1Ref}
				color="#ffee90"
				intensity={1}
				distance={14}
				decay={2}
			/>

			{/* spotlight covering ~¾ of globe */}
			<spotLight
				ref={sideSpotRef}
				color="#ffff9f"
				intensity={20}
				distance={40}
				angle={Math.PI / 2} /* 180° full cone */
				penumbra={1} /* soft edge for long gradient */
				decay={1} /* gentle fall‑off */
				castShadow={false}
			/>

			{/* spotlight target */}
			<primitive object={sideTarget} />
		</>
	);
}

function EarthModel({
	onLoaded,
	globeRef,
}: {
	onLoaded: () => void;
	globeRef: React.RefObject<THREE.Group>;
}) {
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

		// Apply texture & enhanced colors with clear day/night boundary
		clonedScene.traverse((child) => {
			if (child instanceof THREE.Mesh && child.material) {
				child.frustumCulled = true;
				child.matrixAutoUpdate = true;

				const mat = child.material as THREE.MeshStandardMaterial;
				mat.map = texture;
				mat.color = new THREE.Color(1.5, 2, 5); // Enhanced blues for oceans, deeper greens
				// mat.metalness = -1000; // Slight metallic for light reflection on water
				// mat.roughness = -1000; // Balanced roughness for boundary definition
				mat.emissive = new THREE.Color(0.3, -0.3, 0.3); // Subtle emissive for night visibility
				mat.emissiveIntensity = 0.08;
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
