import React, { Suspense, useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Stars } from "@react-three/drei";
import * as THREE from "three";

// The Model component now accepts a scrollPosition prop
function Model({ scrollPosition }) {
  const ref = useRef();
  const modelPath = `${process.env.PUBLIC_URL}/models/spaceStation.glb`;
  
  const { scene } = useGLTF(modelPath);

  useEffect(() => {
    if (scene) {
      const box = new THREE.Box3().setFromObject(scene);
      const size = box.getSize(new THREE.Vector3()).length();
      const center = box.getCenter(new THREE.Vector3());

      scene.position.sub(center);
      const scaleFactor = 5 / size; 
      scene.scale.setScalar(scaleFactor);
    }
  }, [scene]);

  useFrame((state, delta) => {
    if (!ref.current) return;

    // Use the passed scrollPosition prop instead of window.scrollY
    const currentScrollY = scrollPosition; 
    const scrollRangeForScale = 2000;
    const minScale = 1;
    const maxScale = 5;

    const scrollProgress = Math.min(currentScrollY / scrollRangeForScale, 1);
    const targetScale = minScale + (maxScale - minScale) * scrollProgress;

    ref.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.05);

    const rotationThreshold = 1000;
    const rotationRamp = 1500;
    const baseSpeed = 0.0005;
    const fastSpeed = 0.008;

    const spinFactor = Math.min(Math.max((currentScrollY - rotationThreshold) / rotationRamp, 0), 1);
    const spinSpeed = baseSpeed + (fastSpeed - baseSpeed) * spinFactor;
    
    ref.current.rotation.y += spinSpeed;
    ref.current.rotation.x += spinSpeed * 0.2;
    // You should now see this value increasing as you scroll
    console.log("Current ScrollY:", currentScrollY); 
  });

  return scene ? <primitive ref={ref} object={scene} position={[0, 0, 0]} /> : null;
}

// ThreeDBackground component now accepts scrollPosition and passes it to Model
export default function ThreeDBackground({ scrollPosition }) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getCameraFov = () => {
    if (windowWidth <= 768) {
      return 75;
    }
    if (windowWidth <= 1024) {
      return 65;
    }
    return 60;
  };

  const getStarsProps = () => {
    if (windowWidth <= 768) {
      return { radius: 100, depth: 30, count: 2000, factor: 3 };
    }
    if (windowWidth <= 1024) {
      return { radius: 150, depth: 45, count: 3500, factor: 3.5 };
    }
    return { radius: 200, depth: 60, count: 5000, factor: 4 };
  };

  const starsProps = getStarsProps();

  return (
    <Canvas
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        background: "black",
      }}
      camera={{ position: [0, 0, 10], fov: getCameraFov() }}
    >
      <ambientLight intensity={1.5} />
      <directionalLight position={[5, 5, 5]} intensity={2.5} />

      <Suspense fallback={null}>
        {/* Pass the scrollPosition prop to the Model component */}
        <Model scrollPosition={scrollPosition} />
      </Suspense>
      
      <Stars
        radius={starsProps.radius}
        depth={starsProps.depth}
        count={starsProps.count}
        factor={starsProps.factor}
        saturation={0}
      />
    </Canvas>
  );
}
