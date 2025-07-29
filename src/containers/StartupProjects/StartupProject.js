import React, { useContext, useEffect, useState, useRef } from "react";
import "./StartupProjects.scss";
import { bigProjects } from "../../portfolio";
import StyleContext from "../../contexts/StyleContext";

export default function StartupProject() {
  function openUrlInNewTab(url) {
    if (!url) {
      return;
    }
    var win = window.open(url, "_blank");
    win.focus();
  }

  // State for managing the custom tooltip
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({
    opacity: 0,
    visibility: 'hidden',
    transform: 'translateX(30px)',
    top: 0,
    left: 0
  });
  const tooltipContent = "Pull to reveal!";

  // Ref to attach to the .bt-bt element to get its position for tooltip
  const btBtRef = useRef(null);
  // Ref to attach to the .Site-bt-box element to control its animation
  const siteBtBoxRef = useRef(null);

  // Handlers for showing/hiding and positioning the tooltip (on bt-bt hover)
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
    setTooltipPosition(prev => ({
      ...prev,
      opacity: 0,
      transform: 'translateX(30px)',
    }));
    setTimeout(() => {
      setTooltipPosition(prev => ({
        ...prev,
        visibility: 'hidden'
      }));
    }, 400);

    if (siteBtBoxRef.current) {
      siteBtBoxRef.current.classList.remove('paused-sway');
    }
  };

  // Effect hook to handle animations for the pull chain
  useEffect(() => {
    const pullChains = document.querySelectorAll(".Site-bt-box");
    if (pullChains.length === 0) {
      return;
    }

    // --- 1. Scroll Bounce Logic ---
    let lastScrollY = window.scrollY;
    let scrollTimeout;
    const handleScroll = () => {
      clearTimeout(scrollTimeout);
      const isScrollingDown = window.scrollY > lastScrollY;
      pullChains.forEach((chain) => {
        if (isScrollingDown) {
          chain.classList.add("scrolling-down");
          chain.classList.remove("scrolling-up");
        } else if (window.scrollY < lastScrollY) {
          chain.classList.add("scrolling-up");
          chain.classList.remove("scrolling-down");
        }
      });
      lastScrollY = window.scrollY;
      scrollTimeout = setTimeout(() => {
        pullChains.forEach((chain) => {
          chain.classList.remove("scrolling-up", "scrolling-down");
        });
      }, 150);
    };
    window.addEventListener("scroll", handleScroll);

    // --- 2. Drag-to-Pull Logic ---
    const mouseDownHandlers = [];

    pullChains.forEach(chain => {
      const wire = chain.querySelector(".bt-wire");
      const handle = chain.querySelector(".bt-bt");

      if (!wire || !handle) return;

      let isDragging = false;
      let startY = 0;
      const initialWireHeight = 60;
      const initialHandleTop = 60;
      const maxPull = 50;
      const myWebsiteUrl = "https://brand-new-ecco.vercel.app/"; 

      const handleMouseMove = (e) => {
        if (!isDragging) return;
        const deltaY = e.clientY - startY;
        const pullDistance = Math.max(0, Math.min(deltaY, maxPull));
        wire.style.height = `${initialWireHeight + pullDistance}px`;
        handle.style.top = `${initialHandleTop + pullDistance}px`;

        // Check if pull distance has reached the maximum
        if (pullDistance >= maxPull) {
          openUrlInNewTab(myWebsiteUrl);
          // Reset the drag state to allow repeated pulls
          isDragging = false;
          wire.style.height = `${initialWireHeight}px`;
          handle.style.top = `${initialHandleTop}px`;
          window.removeEventListener('mousemove', handleMouseMove);
          window.removeEventListener('mouseup', handleMouseUp);
          window.removeEventListener('mouseleave', handleMouseUp);
        }
      };

      const handleMouseUp = () => {
        if (!isDragging) return;
        isDragging = false;
        chain.style.transition = '';
        wire.style.transition = '';
        handle.style.transition = '';
        wire.style.height = '';
        handle.style.top = '';
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
        window.removeEventListener('mouseleave', handleMouseUp);
      };

      const handleMouseDown = (e) => {
        e.preventDefault();
        isDragging = true;
        startY = e.clientY;
        chain.style.transition = 'none';
        wire.style.transition = 'none';
        handle.style.transition = 'none';
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
        window.addEventListener('mouseleave', handleMouseUp);
      };
      
      chain.addEventListener('mousedown', handleMouseDown);
      mouseDownHandlers.push({ chain, handler: handleMouseDown });
    });

    // --- 3. Single Cleanup Function for all listeners ---
    return () => {
      window.removeEventListener("scroll", handleScroll);
      mouseDownHandlers.forEach(({ chain, handler }) => {
        chain.removeEventListener('mousedown', handler);
      });
    };
  }, []);

  const { isDark } = useContext(StyleContext);
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
          {bigProjects.projects.map((project, i) => {
            return (
              <div
                key={i}
                className={
                  isDark
                    ? "light-mode project-card project-card-dark"
                    : "project-card project-card-light"
                }
              >
                {project.image ? (
                  <div className="project-image">
                    <div
                      className="Site-bt-box"
                      ref={siteBtBoxRef}
                    >
                      <span className="bt-wire"></span>
                      <span
                        className="bt-bt"
                        ref={btBtRef}
                        onMouseEnter={handleBtBtMouseEnter}
                        onMouseLeave={handleBtBtMouseLeave}
                      ></span>
                    </div>
                    <img
                      src={project.image}
                      alt={project.projectName}
                      className="card-image"
                    ></img>
                  </div>
                ) : null}
                <div className="project-detail">
                  <h5
                    className={isDark ? "light-mode card-title" : "card-title"}
                  >
                    {project.projectName}
                  </h5>
                  <p
                    className={
                      isDark ? "light-mode card-subtitle" : "card-subtitle"
                    }
                  >
                    {project.projectDesc}
                  </p>
                  {project.footerLink ? (
                    <div className="project-card-footer">
                      {project.footerLink.map((link, i) => {
                        return (
                          <span
                            key={i}
                            className={
                              isDark ? "light-mode project-tag" : "project-tag"
                            }
                            onClick={() => openUrlInNewTab(link.url)}
                          >
                            {link.name}
                          </span>
                        );
                      })}
                    </div>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {tooltipVisible && (
        <div
          className="bt-tooltip"
          style={{
            opacity: tooltipPosition.opacity,
            visibility: tooltipPosition.visibility,
            transform: tooltipPosition.transform,
            top: `${tooltipPosition.top}px`,
            left: `${tooltipPosition.left}px`
          }}
        >
          {tooltipContent}
        </div>
      )}
    </div>
  );
}