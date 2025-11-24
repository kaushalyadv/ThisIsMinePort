import React, { useState, useEffect, useRef } from 'react';
import KaushalGPTChat from './KaushalGPTChat';
import './KaushalGPTChat.scss';

// 3D imports
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, OrbitControls, useAnimations } from "@react-three/drei";

function LauncherModel() {
  const modelRef = useRef();
  const gltf = useGLTF(`${process.env.PUBLIC_URL}/models/cute_robot.glb`);
  const { scene, animations } = gltf;
  const { actions } = useAnimations(animations, scene);

  useEffect(() => {
    const anim = actions["Animation"]; // 👈 Your GLB has ONLY this one animation
    if (!anim) return;

    // Start idle loop (includes default blinking)
    anim.reset().play();
    anim.timeScale = 1;

    // --- BLINK CONTROL ---
    const blinkStart = 0.60;
    const blinkEnd = 0.85;
    const rawDuration = blinkEnd - blinkStart;

    // ⭐ Make blink movement slower (0.1 = very slow)
    const blinkSpeed = 0.07;

    // How long the slow blink takes (ms)
    const slowBlinkDurationMS = (rawDuration / blinkSpeed) * 500;

    // ⭐ How long eyes stay closed before reopening
    const closedPause = 180; // ms

    let blinkTimeout;

    const triggerBlink = () => {
      // --- START BLINK ---
      anim.paused = true;
      anim.time = blinkStart;
      anim.timeScale = blinkSpeed;
      anim.paused = false;

      // --- KEEP EYELIDS CLOSED ---
      setTimeout(() => {
        anim.paused = true;
        anim.time = blinkEnd;
        anim.paused = false;

        // --- AFTER PAUSE, OPEN EYES + RESUME IDLE ---
        setTimeout(() => {
          anim.timeScale = 1; // back to normal
          anim.play();

          // Schedule next blink (2–4 seconds)
          const nextGap = 2000 + Math.random() * 2000;
          blinkTimeout = setTimeout(triggerBlink, nextGap);

        }, closedPause);

      }, slowBlinkDurationMS);
    };

    // Start first blink after ~2 sec
    blinkTimeout = setTimeout(triggerBlink, 2000);

    return () => clearTimeout(blinkTimeout);
  }, [actions]);

  // --- NODDING LEFT-RIGHT ("NO") ---
  useFrame((state) => {
  if (!modelRef.current) return;

  const t = state.clock.getElapsedTime();

  // --- 1. NODDING ("no") ---
  const nodRotation = Math.sin(t * 1.2) * 0.25;

  // --- 2. MOUSE POSITION TRACKING ---
  const mouseX = state.pointer.x; // -1 to 1
  const mouseY = state.pointer.y; // -1 to 1
  
  // Limit how much the robot can "look"
  const maxTurn = 0.3; // smaller = more subtle
  
  // Smooth movement (lerp)
  const currentY = modelRef.current.rotation.y;
  const targetY = nodRotation + Math.PI / -2 + mouseX * maxTurn;

  const currentX = modelRef.current.rotation.x;
  const targetX = mouseY * -maxTurn * 0.5; // looks up/down

  modelRef.current.rotation.y = currentY + (targetY - currentY) * 0.08;
  modelRef.current.rotation.x = currentX + (targetX - currentX) * 0.08;
});


  // Positioning
  scene.position.set(0, -3.7, 0);

  return <primitive ref={modelRef} object={scene} scale={3.5} />;
}

export default function KaushalGPTWidget() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <>
      <KaushalGPTChat 
        isOpen={isChatOpen} 
        onClose={() => setIsChatOpen(false)} 
      />

      <button 
        className="chat-launcher-button" 
        onClick={toggleChat}
        aria-label="Toggle chat"
      >

        {/* --- 🌟 GLB MODEL INSIDE BUTTON --- */}
        <div className="chat-launcher-3d">
          <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
            <ambientLight intensity={1} />
            <directionalLight position={[3, 3, 3]} intensity={1.2} />

            <LauncherModel />

            <OrbitControls 
              enableZoom={false} 
              enableRotate={false} 
              enablePan={false} 
            />
          </Canvas>
        </div>

        {/* --- 🌟 GLITTER EFFECT (UNCHANGED) --- */}
        <div className="glitter-wrapper">
          <div className="glitter"></div>
          <div className="glitter"></div>
          <div className="glitter"></div>
          <div className="glitter"></div>
          <div className="glitter"></div>
          <div className="glitter"></div>
          <div className="glitter"></div>
          <div className="glitter"></div>
          <div className="glitter"></div>
          <div className="glitter"></div>
        </div>

      </button>
    </>
  );
}
