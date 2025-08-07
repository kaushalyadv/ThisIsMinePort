import React, { useContext, useEffect, useState, useRef } from "react";
import "./StartupProjects.scss";
import { bigProjects } from "../../portfolio";
import StyleContext from "../../contexts/StyleContext";

// HELPER FUNCTION to open URLs
function openUrlInNewTab(url) {
  if (!url) {
    return;
  }
  var win = window.open(url, "_blank");
  if (win) {
    win.focus();
  }
}

// ===================================================================
// 1. A DEDICATED COMPONENT FOR EACH PROJECT CARD
// This isolates the logic for each card, fixing the event conflicts.
// ===================================================================
const ProjectCard = ({ project, isDark }) => {
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({
    opacity: 0,
    visibility: 'hidden',
    transform: 'translateX(30px)',
    top: 0,
    left: 0
  });
  const tooltipContent = "Pull to visit site!";

  const btBtRef = useRef(null);
  const siteBtBoxRef = useRef(null); // This ref is now correctly scoped to one card

  const handleBtBtMouseEnter = () => {
    if (btBtRef.current && siteBtBoxRef.current) {
      const rect = btBtRef.current.getBoundingClientRect();
      setTooltipPosition({
        opacity: 1,
        visibility: 'visible',
        transform: 'translateX(0)',
        top: rect.top + window.scrollY + rect.height + 5,
        left: rect.left + window.scrollX - 60
      });
      setTooltipVisible(true);
      siteBtBoxRef.current.classList.add('paused-sway');
    }
  };

  const handleBtBtMouseLeave = () => {
    setTooltipVisible(false);
    setTooltipPosition(prev => ({ ...prev, opacity: 0, transform: 'translateX(30px)' }));
    setTimeout(() => {
      setTooltipPosition(prev => ({ ...prev, visibility: 'hidden' }));
    }, 400);

    if (siteBtBoxRef.current) {
      siteBtBoxRef.current.classList.remove('paused-sway');
    }
  };

  // This useEffect now correctly manages drag listeners for ONLY ONE card
  useEffect(() => {
    const chain = siteBtBoxRef.current;
    if (!chain) return;

    const wire = chain.querySelector(".bt-wire");
    const handle = chain.querySelector(".bt-bt");
    const myWebsiteUrl = "https://brand-new-ecco.vercel.app/"; // You can use project.url here if available

    if (!wire || !handle) return;

    let isDragging = false;
    let startY = 0;
    const initialWireHeight = 60;
    const initialHandleTop = 60;
    const maxPull = 100;

    const handleMove = (e) => {
      if (!isDragging) return;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      const deltaY = clientY - startY;
      const pullDistance = Math.max(0, Math.min(deltaY, maxPull));
      
      wire.style.height = `${initialWireHeight + pullDistance}px`;
      handle.style.top = `${initialHandleTop + pullDistance}px`;

      if (pullDistance >= maxPull) {
        openUrlInNewTab(myWebsiteUrl);
        isDragging = false; // Stop dragging
        // The handleEnd function will do the rest of the cleanup
        handleEnd();
      }
    };

    const handleEnd = () => {
      if (!isDragging) return;
      isDragging = false;
      
      // Reset styles to allow CSS transitions to take over
      wire.style.transition = '';
      handle.style.transition = '';
      wire.style.height = '';
      handle.style.top = '';
      
      // Clean up window-level event listeners
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleEnd);
      window.removeEventListener('mouseleave', handleEnd);
      window.removeEventListener('touchmove', handleMove);
      window.removeEventListener('touchend', handleEnd);
      window.removeEventListener('touchcancel', handleEnd);
    };

    const handleStart = (e) => {
      e.preventDefault();
      isDragging = true;
      startY = e.touches ? e.touches[0].clientY : e.clientY;
      
      // Disable transitions during drag for instant feedback
      wire.style.transition = 'none';
      handle.style.transition = 'none';
      
      // Add listeners
      window.addEventListener('mousemove', handleMove);
      window.addEventListener('mouseup', handleEnd);
      window.addEventListener('mouseleave', handleEnd);
      window.addEventListener('touchmove', handleMove, { passive: false });
      window.addEventListener('touchend', handleEnd);
      window.addEventListener('touchcancel', handleEnd);
    };
    
    chain.addEventListener('mousedown', handleStart);
    chain.addEventListener('touchstart', handleStart, { passive: false });
    
    // Cleanup function for when the component unmounts
    return () => {
      chain.removeEventListener('mousedown', handleStart);
      chain.removeEventListener('touchstart', handleStart);
      // Ensure any lingering window listeners are removed
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleEnd);
      window.removeEventListener('mouseleave', handleEnd);
      window.removeEventListener('touchmove', handleMove);
      window.removeEventListener('touchend', handleEnd);
      window.removeEventListener('touchcancel', handleEnd);
    };
  }, []); // Empty array ensures this runs only once per card

  return (
    <div
      className={
        isDark
          ? "light-mode project-card project-card-dark"
          : "project-card project-card-light"
      }
    >
      {project.image && (
        <div className="project-image">
          <div className="Site-bt-box" ref={siteBtBoxRef}>
            <span className="bt-wire"></span>
            <span
              className="bt-bt"
              ref={btBtRef}
              onMouseEnter={handleBtBtMouseEnter}
              onMouseLeave={handleBtBtMouseLeave}
            ></span>
          </div>
          <img src={project.image} alt={project.projectName} className="card-image" />
        </div>
      )}
      <div className="project-detail">
        <h5 className={isDark ? "light-mode card-title" : "card-title"}>
          {project.projectName}
        </h5>
        <p className={isDark ? "light-mode card-subtitle" : "card-subtitle"}>
          {project.projectDesc}
        </p>
        {project.footerLink && (
          <div className="project-card-footer">
            {project.footerLink.map((link, i) => (
              <span
                key={i}
                className={isDark ? "light-mode project-tag" : "project-tag"}
                onClick={() => openUrlInNewTab(link.url)}
              >
                {link.name}
              </span>
            ))}
          </div>
        )}
      </div>
      {tooltipVisible && (
        <div className="bt-tooltip" style={{...tooltipPosition}}>
          {tooltipContent}
        </div>
      )}
    </div>
  );
};


// ===================================================================
// 2. THE MAIN COMPONENT
// This now only handles the layout and the global scroll effect.
// ===================================================================
export default function StartupProjects() {
  const { isDark } = useContext(StyleContext);

  // --- Scroll Bounce Logic ---
  // This useEffect now ONLY handles scrolling, so there are no conflicts.
  useEffect(() => {
    const pullChains = document.querySelectorAll(".Site-bt-box");
    if (pullChains.length === 0) {
      return;
    }

    let lastScrollY = window.scrollY;
    let scrollTimeout;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      // Prevent running logic if scroll position hasn't changed
      if (currentScrollY === lastScrollY) {
        return;
      }
      
      clearTimeout(scrollTimeout);
      const isScrollingDown = currentScrollY > lastScrollY;
      
      pullChains.forEach((chain) => {
        if (isScrollingDown) {
          chain.classList.add("scrolling-down");
          chain.classList.remove("scrolling-up");
        } else {
          chain.classList.add("scrolling-up");
          chain.classList.remove("scrolling-down");
        }
      });
      
      lastScrollY = currentScrollY;
      
      scrollTimeout = setTimeout(() => {
        pullChains.forEach((chain) => {
          chain.classList.remove("scrolling-up", "scrolling-down");
        });
      }, 150);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    // Cleanup function
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // Empty dependency array is correct, this effect should run once.

  if (!bigProjects.display) {
    return null;
  }

  return (
    <div className="main" id="projects">
      <div>
        <h1 className="skills-heading">{bigProjects.title}</h1>
        <p
          className={
            isDark
              ? "light-mode project-subtitle"
              : "subTitle project-subtitle"
          }
          style={{ padding: '0 5%' }}
        >
          {bigProjects.subtitle}
        </p>
        <div className="projects-container">
          {bigProjects.projects.map((project, i) => (
            <ProjectCard key={i} project={project} isDark={isDark} />
          ))}
        </div>
      </div>
    </div>
  );
}