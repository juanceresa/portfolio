// components/Globe.tsx
"use client";

import { useRef, useState, useEffect } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { useFBX, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

function EarthModel() {
	const groupRef = useRef<THREE.Group>(null);

	// Load model + texture
	const fbx = useFBX("/assets/models/low-poly-planet-earth/source/Planet.fbx");
	const texture = useLoader(
		THREE.TextureLoader,
		"/assets/models/low-poly-planet-earth/textures/Texture_Planet.png"
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
	}, [clonedScene, texture]);

	return (
		<group ref={groupRef} scale={1.4} position={[0, 0, 0]}>
			<primitive object={clonedScene} />
		</group>
	);
}

// Preload for faster startup
useFBX.preload("/assets/models/low-poly-planet-earth/source/Planet.fbx");

export default function Globe() {
	const [mounted, setMounted] = useState(false);
	useEffect(() => void setMounted(true), []);

	if (!mounted) {
		return <div className="absolute inset-0 -z-10" />;
	}

	return (
		<div className="w-[600px] h-[600px] z-0 pointer-events-auto">
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
				<EarthModel />

				{/* controls with momentum & “weight” */}
				<OrbitControls
					enableZoom={false}
					enablePan={false}
					enableRotate
					rotateSpeed={0.8} // limits how fast it can spin
					enableDamping
					dampingFactor={0.05} // low damping = longer momentum
					autoRotate // gentle auto‑spin when idle
					autoRotateSpeed={0.2} // slow auto‑rotate rate
					maxPolarAngle={Math.PI * 0.8}
					minPolarAngle={Math.PI * 0.2}
					makeDefault
				/>
			</Canvas>
		</div>
	);
}
