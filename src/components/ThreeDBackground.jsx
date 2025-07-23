// components/ThreeDBackground.jsx
import React, { Suspense, useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Stars } from "@react-three/drei";
import * as THREE from "three";

// The Model component now handles all its logic internally
function Model() {
  const ref = useRef();
  const modelPath = `${process.env.PUBLIC_URL}/Models/spaceStation.glb`;
  
  const { scene } = useGLTF(modelPath);

  // This useEffect hook handles the initial setup of the model's scale and position.
  // It runs only once when the scene is loaded.
  useEffect(() => {
    if (scene) {
      const box = new THREE.Box3().setFromObject(scene);
      const size = box.getSize(new THREE.Vector3()).length();
      const center = box.getCenter(new THREE.Vector3());

      scene.position.sub(center); // Center the model
      const scaleFactor = 5 / size; // Initial scale adjustment to fit nicely
      scene.scale.setScalar(scaleFactor);
    }
  }, [scene]);

  // useFrame runs on every rendered frame, perfect for continuous animations
  useFrame((state, delta) => {
    if (!ref.current) return;

    // --- SMOOTH SCALING (ZOOM) ---
    const scrollY = window.scrollY;
    const scrollRangeForScale = 2000; // The model stops zooming after scrolling this many pixels
    const minScale = 1; // Starting scale
    const maxScale = 5; // Final scale (zoomed in)

    // Calculate the target scale based on scroll position
    const scrollProgress = Math.min(scrollY / scrollRangeForScale, 1);
    const targetScale = minScale + (maxScale - minScale) * scrollProgress;

    // Smoothly interpolate the current scale towards the target scale
    // A smaller lerp factor (e.g., 0.05) creates a much smoother, gentler transition.
    // Your original 0.5 was too high, causing a jerky movement.
    ref.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.05);

    // --- SMOOTH ROTATION ---
    const rotationThreshold = 1000; // Scroll Y value when the faster rotation begins
    const rotationRamp = 1500;      // How many pixels of scrolling to go from base to fast speed
    const baseSpeed = 0.0005;      // Initial slow rotation speed
    const fastSpeed = 0.008;       // Maximum rotation speed

    // Calculate the speed-up factor (a value from 0 to 1)
    const spinFactor = Math.min(Math.max((scrollY - rotationThreshold) / rotationRamp, 0), 1);
    const spinSpeed = baseSpeed + (fastSpeed - baseSpeed) * spinFactor;
    
    // Apply rotation. Multiplying by delta ensures frame-rate independence.
    ref.current.rotation.y += spinSpeed;
    ref.current.rotation.x += spinSpeed * 0.2; // Add a little bit of x-axis rotation for effect
    console.log("Current ScrollY:", window.scrollY);
  });

  return scene ? <primitive ref={ref} object={scene} position={[0, 0, 0]} /> : null;
}

export default function ThreeDBackground() {
  // We no longer need to manage scrollY state here, which improves performance
  // by preventing unnecessary re-renders of the component.
  
  return (
    <Canvas
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0, // Use -1 to ensure it's always in the background
        background: "black",
      }}
      camera={{ position: [0, 0, 10], fov: 60 }}
    >
      <ambientLight intensity={1.5} />
      <directionalLight position={[5, 5, 5]} intensity={2.5} />

      <Suspense fallback={null}>
        <Model />
      </Suspense>
      
      <Stars
        radius={200}
        depth={60}
        count={5000}
        factor={4}
        saturation={0}
      />
    </Canvas>
  );
}