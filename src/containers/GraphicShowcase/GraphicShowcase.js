import React, { useState, useRef, useEffect } from 'react';
// Assuming the SCSS file is in the same directory
import './GraphicShowcase.scss'; 
import sahg from '../../assets/images/tshirtupdt.jpg';
import hph from '../../assets/images/headph_png_fnl.jpg';
import moon from '../../assets/images/MOON_YK.jpg';
import boi from '../../assets/images/nowigpne.jpg';
import pol from '../../assets/images/godbye.jpg';


// --- Mock Image Imports ---
// Using placeholders for demonstration.
// const sahg = "https://placehold.co/800x600/ffadad/111?text=T-Shirt";
// const hph = "https://placehold.co/800x600/ffd6a5/111?text=Headphones";
// const moon = "https://placehold.co/800x600/caffbf/111?text=Moon+Art";
// const boi = "https://placehold.co/800x600/9bf6ff/111?text=Car+Art";
// const pol = "https://placehold.co/800x600/a0c4ff/111?text=Poster";

const sectionsData = [
  {
    id: 1,
    title: 'KYD Premium Cotton Tee',
    description: 'Minimal yet impactful merchandise mockup, highlighting 100% premium cotton with a sleek, monochrome aesthetic for a luxury streetwear vibe',
    image: sahg,
  },
  {
    id: 2,
    title: 'Pulse 30',
    description: 'Showcasing design for premium over-ear headphones, built around 30-hour battery life and rapid USB-C charging. Uses sharp contrast and a vibrant palette to balance tech elegance with bold energy',
    image: hph,
  },
  {
    id: 3,
    title: 'Yours, Beyond Time | Film Festival Key Art',
    description: 'Cinematic key art concept for a fictional film festival, combining surreal space imagery with poetic typography.',
    image: moon,
  },
  {
    id: 4,
    title: 'Industrial Reality | Editorial Poster',
    description: 'A striking editorial poster on urban pollution, blending bold typography with atmospheric photography. Designed for a policy-focused magazine, it uses visual tension to convey urgency while staying minimal',
    image: boi,
  },
  {
    id: 5,
    title: 'Automotive Lifestyle Adventure Art',
    description: 'A bold, high-contrast poster design capturing the thrill of road trips and the freedom of open highways.',
    image: pol,
  },
];

export default function GraphicShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const rightPanelRef = useRef(null);
  const isScrolling = useRef(false);
  const touchStartY = useRef(0); // For tracking touch swipe start position

  useEffect(() => {
    const changeSlide = (direction) => {
      if (isScrolling.current) return;
      isScrolling.current = true;

      if (direction === 'down') {
        setActiveIndex((prev) => Math.min(prev + 1, sectionsData.length - 1));
      } else {
        setActiveIndex((prev) => Math.max(prev - 1, 0));
      }

      setTimeout(() => {
        isScrolling.current = false;
      }, 700); // Corresponds to animation time
    };

    // --- Mouse Wheel Handler ---
    const handleWheel = (e) => {
      e.preventDefault();
      const direction = e.deltaY > 0 ? 'down' : 'up';
      changeSlide(direction);
    };

    // --- Touch Handlers for Mobile ---
    const handleTouchStart = (e) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
      e.preventDefault(); // Prevent page scroll while swiping on the element
      const touchEndY = e.touches[0].clientY;
      const deltaY = touchStartY.current - touchEndY;

      // Only trigger if the swipe is significant enough
      if (Math.abs(deltaY) > 50) {
        const direction = deltaY > 0 ? 'down' : 'up';
        changeSlide(direction);
        // Reset start Y to prevent multiple triggers from one swipe
        touchStartY.current = touchEndY;
      }
    };

    const currentPanel = rightPanelRef.current;
    if (currentPanel) {
      currentPanel.addEventListener('wheel', handleWheel, { passive: false });
      currentPanel.addEventListener('touchstart', handleTouchStart, { passive: false });
      currentPanel.addEventListener('touchmove', handleTouchMove, { passive: false });
    }

    return () => {
      if (currentPanel) {
        currentPanel.removeEventListener('wheel', handleWheel);
        currentPanel.removeEventListener('touchstart', handleTouchStart);
        currentPanel.removeEventListener('touchmove', handleTouchMove);
      }
    };
  }, []); // Empty dependency array ensures this runs only once

  return (
    <div className="graphic-showcase"> 
      <header className="main-header">
        <span>PIXELCRAFT WORKS</span>
      </header>
      <div className="maingrph">
        {/* ===== LEFT PANEL: Image Showcase ===== */}
        <div className="leftgrph">
          {sectionsData.map((section, index) => (
            <div
              key={section.id}
              className={`left-content-wrapper ${index === activeIndex ? 'active' : ''}`}
            >
              <div className="left-content-background"></div>
              <img
                src={section.image}
                alt={section.title}
                className="left-content-image"
                onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/600x400/111/FFF?text=Image+Not+Found"; }}
              />
            </div>
          ))}
        </div>

        {/* ===== RIGHT PANEL: Stacking Content ===== */}
        <div className="rightgrph" ref={rightPanelRef}>
          <div className="rightgrph-inner">
            {sectionsData.map((section, index) => {
              const offset = index - activeIndex;
              const isActive = offset === 0;
              const style = {
                transform: `translateY(${offset * 15}%) scale(${1 - Math.abs(offset) * 0.15})`,
                filter: `blur(${isActive ? 0 : 3}px)`,
                opacity: isActive ? 1 : 0.4,
                zIndex: sectionsData.length - Math.abs(offset),
              };
              return (
                <div key={section.id} className="right-item" style={style}>
                  <h3>{section.title}</h3>
                  <p>{section.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
