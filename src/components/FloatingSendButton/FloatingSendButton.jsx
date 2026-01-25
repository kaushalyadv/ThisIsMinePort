import React, { useEffect, useRef, useState, useCallback } from "react";
import { interpolate } from "flubber";
import LottieAnimation from "../LottieAnimation";
import "./FloatingSendButton.scss";

const FloatingSendButton = ({
  text = "",
  onChange,
  onSubmit,
  isRelaxedPersonBlurred,
  relaxedPersonAnimationData,
  showRocketAnimation,
  rocketAnimationData
}) => {
  const textareaRef = useRef(null);
  const buttonRef = useRef(null);
  const pathRef = useRef(null);
  const animationFrameId = useRef(null);
  const morphData = useRef({ progress: 0, target: 0, start: null }).current;

  const [isFocused, setIsFocused] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Update windowWidth on resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getButtonPath = useCallback(() => {
    const button = buttonRef.current;
    if (!button) return null;

    const width = button.offsetWidth;
    const height = button.offsetHeight;
    const x = button.offsetLeft;
    const y = button.offsetTop;
    const r = 8;

    return `M${x + r},${y} h${width - 2 * r} a${r},${r} 0 0 1 ${r},${r} v${
      height - 2 * r
    } a${r},${r} 0 0 1 -${r},${r} h-${width - 2 * r} a${r},${r} 0 0 1 -${r},-${r} v-${height - 2 * r} a${r},${r} 0 0 1 ${r},-${r} z`;
  }, []);

  useEffect(() => {
    const currentText = typeof text === "string" ? text : "";
    const showButton = isFocused && currentText.trim().length > 0;
    const newTarget = showButton ? 1 : 0;

    if (morphData.target !== newTarget) {
      morphData.target = newTarget;
      morphData.start = null;
    }
  }, [isFocused, text, morphData]);

  useEffect(() => {
    const textarea = textareaRef.current;
    const path = pathRef.current;

    const generateRopePath = timestamp => {
      if (!textarea) return "";
      const width = textarea.offsetWidth;
      const height = textarea.offsetHeight;
      const inset = 10,
        amplitude = 6,
        frequency = 0.025,
        speed = 0.001,
        step = 5;
      const time = timestamp * speed;
      let d = "";

      const startY = inset + Math.sin(time) * amplitude;
      d += `M 0, ${startY}`;
      for (let x = step; x <= width; x += step) {
        const y = inset + Math.sin(x * frequency + time) * amplitude;
        d += ` L ${x},${y}`;
      }
      for (let y = step; y <= height; y += step) {
        const x = width - inset + Math.sin((width + y) * frequency + time) * amplitude;
        d += ` L ${x},${y}`;
      }
      for (let x = width - step; x >= 0; x -= step) {
        const y = height - inset + Math.sin((width + height + (width - x)) * frequency + time) * amplitude;
        d += ` L ${x},${y}`;
      }
      for (let y = height - step; y >= 0; y -= step) {
        const x = inset + Math.sin((width + height + width + (height - y)) * frequency + time) * amplitude;
        d += ` L ${x},${y}`;
      }
      d += " Z";
      return d;
    };

    const animate = timestamp => {
      if (morphData.progress !== morphData.target) {
        if (morphData.start === null) morphData.start = timestamp;
        const elapsed = timestamp - morphData.start;
        const duration = 400;
        const t = Math.min(1, elapsed / duration);
        const easedT = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
        morphData.progress = morphData.target === 1 ? easedT : 1 - easedT;
      }

      const ropePath = generateRopePath(timestamp);
      const buttonPath = getButtonPath();
      const buttonElement = buttonRef.current;

      if (ropePath && buttonPath && path && buttonElement && textarea) {
        const interpolator = interpolate(ropePath, buttonPath, { maxSegmentLength: 4 });
        const currentPath = interpolator(morphData.progress);
        path.setAttribute("d", currentPath);
        path.style.fillOpacity = morphData.progress;
        buttonElement.style.opacity = 0.5 * morphData.progress;

        textarea.style.boxShadow =
          isFocused && text.trim().length > 0
            ? `0 0 8px 4px rgba(167, 139, 250, 0.7), 0 0 8px 4px rgba(56, 189, 248, 0.7)`
            : "none";
      }

      animationFrameId.current = requestAnimationFrame(animate);
    };

    animationFrameId.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
    };
  }, [getButtonPath, morphData, isFocused, text]);

  // Responsive styles for relaxedPersonAnimationData
  const getRelaxedPersonStyles = () => {
    let bottom = "20px";
    let width = "52%";
    let maxWidth = "40vw";

    if (windowWidth <= 1024) { // Tablets
      bottom = "15px";
      width = "60%";
      maxWidth = "50vw";
    }
    if (windowWidth <= 768) { // Mobile
      bottom = "-60%";
      width = "70%";
      maxWidth = "60vw";
    }
    if (windowWidth <= 480) { // Small Mobile
      // bottom = "5px";
      width = "80%";
      maxWidth = "70vw";
    }

    return {
      position: "absolute",
      bottom: bottom,
      left: "50%",
      transform: "translateX(-50%)",
      width: width,
      maxWidth: maxWidth,
      height: "auto",
      filter: isRelaxedPersonBlurred ? "blur(5px)" : "none",
      opacity: isRelaxedPersonBlurred ? 0.3 : 1,
      zIndex: 0,
      pointerEvents: "none",
      transition: "filter 0.3s ease-in-out, opacity 0.3s ease-in-out"
    };
  };

  // Responsive styles for rocketAnimationData
  const getRocketAnimationStyles = () => {
    let bottom = "-10%";
    let width = "100%";
    let maxWidth = "80vw";
    let height = "50vh";

    if (windowWidth <= 1024) { // Tablets
      bottom = "-15%";
      maxWidth = "90vw";
      height = "45vh";
    }
    if (windowWidth <= 768) { // Mobile
      bottom = "-20%";
      maxWidth = "95vw";
      height = "40vh";
    }
    if (windowWidth <= 480) { // Small Mobile
      bottom = "-25%";
      maxWidth = "100vw";
      height = "35vh";
    }

    return {
      position: "absolute",
      bottom: bottom,
      left: "50%",
      transform: "translateX(-50%)",
      width: width,
      maxWidth: maxWidth,
      height: height,
      overflow: "hidden",
      zIndex: 2,
      opacity: showRocketAnimation ? 1 : 0,
      pointerEvents: "none",
      transition: "opacity 0.5s ease-in-out"
    };
  };


  return (
    <div className="textarea-container">
      <svg id="border-svg" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="rope-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="100%" stopColor="#A78BFA" />
          </linearGradient>
        </defs>
        <path ref={pathRef} id="wavy-border-path" stroke="url(#rope-gradient)" strokeWidth="3" strokeLinecap="round" />
      </svg>

      <textarea
        ref={textareaRef}
        id="animated-textarea"
        name="message"
        placeholder="Tell me about your project, role, or idea…"
        value={text}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        required
      />

      <button ref={buttonRef} type="button" onClick={onSubmit} id="action-button">
        Send
      </button>

      {relaxedPersonAnimationData && (
        <LottieAnimation
          animationData={relaxedPersonAnimationData}
          loop
          autoplay
          style={getRelaxedPersonStyles()}
        />
      )}

      {showRocketAnimation && rocketAnimationData && (
        <LottieAnimation
          animationData={rocketAnimationData}
          loop={false}
          autoplay
          style={getRocketAnimationStyles()}
        />
      )}
    </div>
  );
};

export default FloatingSendButton;