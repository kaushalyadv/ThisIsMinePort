import React, { Suspense, useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

/* ===================== */
/* 1. CONFIGURATION      */
/* ===================== */

// Your specific settings (Active on Desktop > 1024px)
const BASE_MODEL = {
  scale: 5.2,
  position: [-4.3, 0.5, 0],
  rotation: [4.7, Math.PI / 35, -0.7]
};

const CAMERA = {
  position: [0, 3, 15],
  fov: 40,
  near: 0.1,
  far: 200
};

const CONTROLS = {
  autoRotate: false,
  enableZoom: false,
  enablePan: false,
  enableRotate: false
};

/* ===================== */
/* 2. RESPONSIVE HELPERS */
/* ===================== */

function useScreenWidth() {
  // Initialize with window width if available
  const [width, setWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);

  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return width;
}

function getResponsiveModel(width) {
  // --- Mobile (< 768px) ---
  if (width < 768) {
    return {
      scale: 7,
      position: [-4.3, 0.5, 0] // ⬇️ Pushed further down to clear phone screens
    };
  }

  // --- Tablet / Narrow Desktop (< 1024px) ---
  // The Issue in your screenshot was here. 
  // We change X to 0 (center) and Y to -1.5 (down) to clear the text.
  if (width < 1024) {
    return {
      scale: 8,            // Slightly smaller than desktop
      position: [-4.3, 0.5, 0] // ⬇️ Moves model UNDER the text/buttons
    };
  }

  // --- Large Desktop (>= 1024px) ---
  // Your original preferred settings
  return BASE_MODEL;
}

/* ===================== */
/* 3. MODEL COMPONENT    */
/* ===================== */

function Model() {
  const modelPath = `${process.env.PUBLIC_URL}/models/landingModel.glb`;
  const { scene } = useGLTF(modelPath);
  
  const modelRef = useRef();
  const baseY = useRef(BASE_MODEL.position[1]); // Store the current base Y for animation
  
  const screenWidth = useScreenWidth();
  const responsive = getResponsiveModel(screenWidth);

  // Update position/scale when screen size changes
  useEffect(() => {
    if (modelRef.current) {
      modelRef.current.scale.setScalar(responsive.scale);
      modelRef.current.position.set(
        responsive.position[0],
        responsive.position[1],
        responsive.position[2]
      );
      
      // Update the base Y reference so the floating animation happens 
      // relative to the new responsive position, not the old one.
      baseY.current = responsive.position[1];
    }
  }, [responsive]);

  // Floating Animation
  useFrame(({ clock }) => {
    if (!modelRef.current) return;
    
    const t = clock.getElapsedTime();
    // Float relative to the current responsive Y base
    modelRef.current.position.y = baseY.current + Math.sin(t * 0.6) * 0.12;
  });

  return (
    <primitive 
      ref={modelRef} 
      object={scene} 
      rotation={BASE_MODEL.rotation} 
    />
  );
}

/* ===================== */
/* 4. MAIN SCENE         */
/* ===================== */

export default function ThreeModelFront() {
  return (
    <Canvas camera={CAMERA} style={{ width: "100%", height: "100%" }}>
      {/* Lighting Setup */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} />
      <directionalLight position={[-5, 3, -5]} intensity={0.6} />

      <Suspense fallback={null}>
        <Model />
      </Suspense>

      <OrbitControls {...CONTROLS} />
    </Canvas>
  );
}

// Preload the GLTF to prevent pop-in
useGLTF.preload(`${process.env.PUBLIC_URL}/models/landingModel.glb`);