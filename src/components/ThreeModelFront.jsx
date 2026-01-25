import React, { Suspense, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF, Center } from "@react-three/drei";



const BASE_MODEL = {
  scale: 20,
  position: [10, -37, 5],
  rotation: [5, Math.PI / 50, 54.80]
};

const CAMERA = {
  position: [-10, 1.3, 4.9],
  fov: 40,
  near: 0.1,
  far: 50
};

const CONTROLS = {
  autoRotate: false,
  enableZoom: false,
  enablePan: false,
  enableRotate: false
};


function getResponsiveModel(width) {
  
  if (width < 5) {
    return {
      scale: 1.4,
      position: [-0.1, 1.1, -0.3]
    };
  }

  // Tablet
  if (width < 8) {
    return {
      scale: 2.7,
      position: [-1.6, 2.2, -0.2]
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
