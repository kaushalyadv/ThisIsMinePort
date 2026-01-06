import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

function Model() {
  const { scene } = useGLTF("/assets/3d/landingModel.glb");
  return <primitive object={scene} scale={1.5} />;
}

export default function ThreeModel() {
  return (
    <Canvas
      camera={{ position: [0, 1.5, 4], fov: 45 }}
      style={{ height: "100%", width: "100%" }}
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <Suspense fallback={null}>
        <Model />
      </Suspense>
      <OrbitControls enableZoom={false} />
    </Canvas>
  );
}
