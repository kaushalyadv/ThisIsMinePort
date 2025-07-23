// src/components/LottieAnimation.jsx (or wherever you put it)

import React, { useEffect, useRef } from 'react';
import lottie from 'lottie-web';

const LottieAnimation = ({ animationData, loop = true, autoplay = true, style, onComplete }) => {
  const animationContainer = useRef(null);
  const animInstance = useRef(null);

  useEffect(() => {
    if (animationContainer.current && animationData) {
      // Destroy any existing animation instance before loading a new one
      if (animInstance.current) {
        animInstance.current.destroy();
      }

      animInstance.current = lottie.loadAnimation({
        container: animationContainer.current, // The DOM element to render the animation
        renderer: 'svg',                     // Use 'svg' for scalability
        loop: loop,                          // Whether the animation should loop
        autoplay: autoplay,                  // Whether the animation should play automatically
        animationData: animationData         // The imported JSON animation data
      });

      // Attach onComplete listener if provided
      if (onComplete) {
        animInstance.current.addEventListener('complete', onComplete);
      }
    }

    // Clean up: destroy the animation instance and remove event listener when component unmounts
    return () => {
      if (animInstance.current) {
        if (onComplete) {
          animInstance.current.removeEventListener('complete', onComplete);
        }
        animInstance.current.destroy();
        animInstance.current = null; // Clear the ref
      }
    };
  }, [animationData, loop, autoplay, onComplete]); // Re-run effect if these props change

  return (
    <div
      ref={animationContainer}
      style={{ width: '100%', height: '100%', ...style }} // Default style, can be overridden
    ></div>
  );
};

export default LottieAnimation;