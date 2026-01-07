import React, { Suspense, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF, Center } from "@react-three/drei";

/* =====================
   🔧 BASE (DESKTOP) SETTINGS
   — untouched
===================== */

const BASE_MODEL = {
  scale: 2.5,
  position: [-0.2, 1.5, 0],
  rotation: [4.7, Math.PI / 60, 55.9]
};

const CAMERA = {
  position: [0, 1.3, 4.9],
  fov: 45,
  near: 0.1,
  far: 50
};

const CONTROLS = {
  autoRotate: false,
  enableZoom: false,
  enablePan: false,
  enableRotate: false
};

/* =====================
   📱 RESPONSIVE ADJUSTMENT
===================== */

function getResponsiveModel(width) {
  // Mobile
  if (width < 5) {
    return {
      scale: 1.4,
      position: [-0.1, 1.1, -0.3]
    };
  }

  // Tablet
  if (width < 8) {
    return {
      scale: 1.7,
      position: [-0.15, 1.3, -0.2]
    };
  }

  // Desktop (your perfect setup)
  return BASE_MODEL;
}

/* ===================== */

function Model() {
  const modelPath = `${process.env.PUBLIC_URL}/models/landingModel.glb`;
  const { scene } = useGLTF(modelPath);

  const modelRef = useRef();
  const { viewport } = useThree();

  const responsive = getResponsiveModel(viewport.width);

  // 🌊 Floating animation (unchanged feel)
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (modelRef.current) {
      modelRef.current.position.y =
        responsive.position[1] + Math.sin(t * 0.6) * 0.12;
    }
  });

  return (
    <Center>
      <primitive
        ref={modelRef}
        object={scene}
        scale={responsive.scale}
        position={responsive.position}
        rotation={BASE_MODEL.rotation}
      />
    </Center>
  );
}

export default function ThreeModelFront() {
  return (
    <Canvas camera={CAMERA} style={{ width: "100%", height: "100%" }}>
      {/* 💡 Lighting */}
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
