import React, { useState, useRef, useEffect } from 'react';
import './GraphicShowcase.scss'; 

import sahg from '../../assets/images/tshirtupdt.jpg';
import hph from '../../assets/images/headph_png_fnl.jpg';
import moon from '../../assets/images/MOON_YK.jpg';
import boi from '../../assets/images/nowigpne.jpg';
import pol from '../../assets/images/godbye.jpg';

// ✅ UPDATED DATA SECTIONS
const sectionsData = [
  {
    id: 1,
    title: 'Newspaper Recruitment Advertisement',
    description:
      'Designed a newspaper recruitment advertisement for Minerva Progressive School aimed at hiring teaching and administrative staff. The design emphasized clear information hierarchy, emotional connection, and print-friendly readability to ensure strong visibility and engagement in a citywide newspaper publication.',
    type: 'pdf',
    // ⬇️ FIX: Removed "/pdf/" and added the extra underscores to match your filename
    media: `${process.env.PUBLIC_URL}/Minerva___white__final.pdf`,
  },
  {
    id: 2,
    title: 'Brand Awareness Calendar Design',
    description:
      'Created a citywide gifting calendar for Minerva Progressive School as part of a brand awareness initiative.The design focused on professionalism, clarity, and brand recall, helping introduce the school to families across the city through everyday visual engagement.',
    type: 'pdf',
    // ⬇️ FIX: Updated this path to root as well, just in case you use it later
    media: `${process.env.PUBLIC_URL}/Minerva_calendar_.pdf`, 
  },

  {
  id: 3,
  title: 'School Admission Brochure Design',
  description:
    'Designed an informative and visually engaging school brochure for Busy Bees School, Haldwani, to help parents understand the school’s philosophy, facilities, and learning approach before admissions. The brochure focused on clarity, warm visual storytelling, and parent-friendly layout to communicate trust, transparency, and the overall school environment effectively.',
  type: 'pdf',
  media: `${process.env.PUBLIC_URL}/BusyBees_Brochure.pdf`,
},

  {
    id: 4,
    title: 'KYD Premium Cotton Tee',
    description:
      'Minimal yet impactful merchandise mockup, highlighting 100% premium cotton with a sleek, monochrome aesthetic for a luxury streetwear vibe',
    type: 'image',
    media: sahg,
  },
  {
    id: 5,
    title: 'Pulse 30',
    description:
      'Showcasing design for premium over-ear headphones, built around 30-hour battery life and rapid USB-C charging.',
    type: 'image',
    media: hph,
  },
  {
    id: 6,
    title: 'Yours, Beyond Time | Film Festival Key Art',
    description:
      'Cinematic key art concept for a fictional film festival, combining surreal space imagery with poetic typography.',
    type: 'image',
    media: moon,
  },
  {
    id: 7,
    title: 'Industrial Reality | Editorial Poster',
    description:
      'A striking editorial poster on urban pollution, blending bold typography with atmospheric photography.',
    type: 'image',
    media: boi,
  },
  {
    id: 8,
    title: 'Automotive Lifestyle Adventure Art',
    description:
      'A bold, high-contrast poster design capturing the thrill of road trips and the freedom of open highways.',
    type: 'image',
    media: pol,
  },
];

export default function GraphicShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const rightPanelRef = useRef(null);
  const isScrolling = useRef(false);
  const touchStartY = useRef(0);

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
      }, 700);
    };

    const handleWheel = (e) => {
      e.preventDefault();
      const direction = e.deltaY > 0 ? 'down' : 'up';
      changeSlide(direction);
    };

    const handleTouchStart = (e) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
      e.preventDefault();
      const touchEndY = e.touches[0].clientY;
      const deltaY = touchStartY.current - touchEndY;

      if (Math.abs(deltaY) > 50) {
        const direction = deltaY > 0 ? 'down' : 'up';
        changeSlide(direction);
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
  }, []);

  return (
    <div className="graphic-showcase"> 
      <header className="main-header">
        <span>Graphic Design Works</span>
      </header>

      <div className="maingrph">
        <div className="leftgrph">
          {sectionsData.map((section, index) => (
            <div
              key={section.id}
              className={`left-content-wrapper ${index === activeIndex ? 'active' : ''}`}
              style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <div className="left-content-background"></div>

              {/* IMAGE DISPLAY */}
              {section.type === 'image' && (
                <img
                  src={section.media}
                  alt={section.title}
                  className="left-content-image"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      'https://placehold.co/600x400/111/FFF?text=Image+Not+Found';
                  }}
                />
              )}

              {/* ----- CLEAN PDF VIEWER (NO TOOLBAR) ----- */}
              {section.type === 'pdf' && (
                <div 
                  className="modern-pdf-container"
                  style={{
                    position: 'relative',
                    width: '90%',
                    height: '80vh',
                    maxHeight: '800px',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    background: '#1a1a1a',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                    border: '1px solid rgba(255,255,255,0.1)'
                  }}
                >
                  <iframe
                    // Added unique key to force re-render if media changes
                    key={section.media} 
                    src={`${section.media}#toolbar=0&navpanes=0&scrollbar=0`}
                    title={section.title}
                    width="100%"
                    height="100%"
                    style={{ border: 'none', display: 'block' }}
                  />

                  {/* ATTRACTIVE FLOATING BUTTON */}
                  <div style={{
                    position: 'absolute',
                    bottom: '25px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 20,
                  }}>
                    <a 
                      href={section.media}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '12px 28px',
                        background: 'rgba(20, 20, 20, 0.75)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        borderRadius: '50px',
                        color: '#fff',
                        textDecoration: 'none',
                        fontSize: '14px',
                        fontWeight: '600',
                        letterSpacing: '0.5px',
                        transition: 'all 0.3s ease',
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.95)';
                        e.currentTarget.style.color = '#000';
                        e.currentTarget.style.transform = 'translateY(-3px)';
                      }}
                      onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'rgba(20, 20, 20, 0.75)';
                          e.currentTarget.style.color = '#fff';
                          e.currentTarget.style.transform = 'translateY(0)';
                      }}
                    >
                      <span style={{ textTransform: 'uppercase' }}>Open Full Document</span>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                        <polyline points="15 3 21 3 21 9"/>
                        <line x1="10" y1="14" x2="21" y2="3"/>
                      </svg>
                    </a>
                  </div>

                </div>
              )}
            </div>
          ))}
        </div>

        {/* ===== RIGHT PANEL ===== */}
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