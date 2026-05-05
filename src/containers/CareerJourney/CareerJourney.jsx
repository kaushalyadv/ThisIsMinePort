import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

const journeyData = [
  {
    year: "2024-2025",
    title: "Technical Advisor",
    location: "Gurgaon",
    description: "Developed strong communication and client-handling skills through customer-facing roles",
    icon: "🖥️",
    tag: "On-Site/in-office",
    side: "left",
    accent: "#639922",
    bg: "#EAF3DE",
    border: "#9DC E56",
  },
  {
    year: "2025",
    title: "Graphic Designer",
    location: "Remote/Himachal Pradesh",
    description: "Designed social media posts, reels, and brochure-style layouts for tourismand adventure brands.",
    icon: "✦",
    tag: "Freelance",
    side: "right",
    accent: "#7F77DD",
    bg: "#EEEDFE",
    border: "#AFA9EC",
  },
  {
    year: "Oct 2025 - Jan 2026",
    title: "Brand Designer",
    location: "Aashbhi Consultancy/Haldwani",
    description: "Designed logos, brand identities, and visual mockups for multiple client businesses.",
    icon: "◈",
    tag: "On-Site/in-office",
    side: "left",
    accent: "#1D9E75",
    bg: "#E1F5EE",
    border: "#5DCAA5",
  },
  {
    year: "Jan 2026 - Apr 2026",
    title: "Sr. Graphic Designer",
    location: "Zorgers Home Health Care (Mohali, Punjab)",
    description: "Designed social media creatives, ad visuals, and marketing materials for a healthcare brand.",
    icon: "◉",
    tag: "On-Site/in-office",
    side: "right",
    accent: "#D85A30",
    bg: "#FAECE7",
    border: "#F0997B",
  },
];

const orbColors = ["#7F77DD", "#1D9E75", "#D85A30", "#378ADD"];

function Orb({ color, style }) {
  return (
    <motion.div
      style={{
        position: "absolute",
        borderRadius: "50%",
        background: color,
        opacity: 0.07,
        filter: "blur(60px)",
        pointerEvents: "none",
        ...style,
      }}
      animate={{ y: [0, -20, 0], scale: [1, 1.05, 1] }}
      transition={{ duration: 8 + Math.random() * 4, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

function TimelineCard({ item, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const isLeft = item.side === "left";

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 48px 1fr",
        marginBottom: "40px",
        position: "relative",
      }}
    >
      {/* LEFT SIDE */}
      <div style={{ gridColumn: 1 }}>
        {isLeft && (
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -48 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -4, scale: 1.015 }}
            style={{
              background: "var(--cj-card-bg)",
              border: "0.5px solid var(--cj-card-border)",
              borderRadius: "16px",
              padding: "20px",
              cursor: "pointer",
              position: "relative",
              textAlign: "right",
              transition: "border-color 0.2s",
            }}
            onHoverStart={(e) => {
              e.target.style && (e.target.style.borderColor = item.border);
            }}
          >
            {/* Top right tag */}
            <motion.span
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: index * 0.1 + 0.3 }}
              style={{
                position: "absolute",
                top: "14px",
                right: "14px",
                fontSize: "10px",
                fontWeight: 600,
                letterSpacing: "1px",
                textTransform: "uppercase",
                padding: "3px 10px",
                borderRadius: "20px",
                background: item.bg,
                border: `0.5px solid ${item.border}`,
                color: item.accent,
              }}
            >
              {item.tag}
            </motion.span>

            {/* Icon */}
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginBottom: "10px",
                marginTop: "8px",
              }}
            >
              <div
                style={{
                  width: "38px",
                  height: "38px",
                  borderRadius: "10px",
                  background: item.bg,
                  border: `0.5px solid ${item.border}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "18px",
                }}
              >
                {item.icon}
              </div>
            </div>

            <div
              style={{
                fontSize: "10px",
                fontWeight: 600,
                letterSpacing: "2px",
                textTransform: "uppercase",
                color: item.accent,
                marginBottom: "4px",
              }}
            >
              {item.year}
            </div>
            <div
              style={{
                fontSize: "16px",
                fontWeight: 600,
                color: "var(--cj-text-primary)",
                marginBottom: "6px",
                lineHeight: 1.3,
              }}
            >
              {item.title}
            </div>
            <div
              style={{
                fontSize: "13px",
                color: "var(--cj-text-secondary)",
                lineHeight: 1.6,
                marginBottom: "14px",
              }}
            >
              {item.description}
            </div>

            {/* Location chip */}
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <motion.span
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: index * 0.5 }}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  fontSize: "11px",
                  fontWeight: 600,
                  padding: "4px 12px",
                  borderRadius: "20px",
                  background: item.bg,
                  border: `0.5px solid ${item.border}`,
                  color: item.accent,
                }}
              >
                <motion.span
                  animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    background: item.accent,
                    flexShrink: 0,
                    display: "inline-block",
                  }}
                />
                {item.location}
              </motion.span>
            </div>
          </motion.div>
        )}
      </div>

      {/* CENTER DOT */}
      <div
        style={{
          gridColumn: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ delay: index * 0.1 + 0.2, type: "spring", stiffness: 300 }}
          style={{
            width: "18px",
            height: "18px",
            borderRadius: "50%",
            background: item.accent,
            border: "3px solid var(--cj-root-bg)",
            boxShadow: `0 0 0 2px ${item.accent}55`,
            zIndex: 3,
            position: "relative",
          }}
        />
      </div>

      {/* RIGHT SIDE */}
      <div style={{ gridColumn: 3 }}>
        {!isLeft && (
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: 48 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -4, scale: 1.015 }}
            style={{
              background: "var(--cj-card-bg)",
              border: "0.5px solid var(--cj-card-border)",
              borderRadius: "16px",
              padding: "20px",
              cursor: "pointer",
              position: "relative",
              textAlign: "left",
              transition: "border-color 0.2s",
            }}
          >
            {/* Top left tag */}
            <motion.span
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: index * 0.1 + 0.3 }}
              style={{
                position: "absolute",
                top: "14px",
                left: "14px",
                fontSize: "10px",
                fontWeight: 600,
                letterSpacing: "1px",
                textTransform: "uppercase",
                padding: "3px 10px",
                borderRadius: "20px",
                background: item.bg,
                border: `0.5px solid ${item.border}`,
                color: item.accent,
              }}
            >
              {item.tag}
            </motion.span>

            {/* Icon */}
            <div style={{ marginBottom: "10px", marginTop: "8px" }}>
              <div
                style={{
                  width: "38px",
                  height: "38px",
                  borderRadius: "10px",
                  background: item.bg,
                  border: `0.5px solid ${item.border}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "18px",
                }}
              >
                {item.icon}
              </div>
            </div>

            <div
              style={{
                fontSize: "10px",
                fontWeight: 600,
                letterSpacing: "2px",
                textTransform: "uppercase",
                color: item.accent,
                marginBottom: "4px",
              }}
            >
              {item.year}
            </div>
            <div
              style={{
                fontSize: "16px",
                fontWeight: 600,
                color: "var(--cj-text-primary)",
                marginBottom: "6px",
                lineHeight: 1.3,
              }}
            >
              {item.title}
            </div>
            <div
              style={{
                fontSize: "13px",
                color: "var(--cj-text-secondary)",
                lineHeight: 1.6,
                marginBottom: "14px",
              }}
            >
              {item.description}
            </div>

            {/* Location chip */}
            <motion.span
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: index * 0.5 }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "11px",
                fontWeight: 600,
                padding: "4px 12px",
                borderRadius: "20px",
                background: item.bg,
                border: `0.5px solid ${item.border}`,
                color: item.accent,
              }}
            >
              <motion.span
                animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: item.accent,
                  flexShrink: 0,
                  display: "inline-block",
                }}
              />
              {item.location}
            </motion.span>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default function CareerJourney() {
  const lineRef = useRef(null);
  const lineInView = useInView(lineRef, { once: true });

  return (
    <>
      <style>{`
        .cj-root {
          --cj-root-bg: #f8f7f4;
          --cj-card-bg: #ffffff;
          --cj-card-border: rgba(0,0,0,0.09);
          --cj-text-primary: #1a1a1a;
          --cj-text-secondary: #6b6b6b;
        }
        @media (prefers-color-scheme: dark) {
          .cj-root {
            --cj-root-bg: #111110;
            --cj-card-bg: #1c1c1a;
            --cj-card-border: rgba(255,255,255,0.08);
            --cj-text-primary: #f0ede8;
            --cj-text-secondary: #888880;
          }
        }
        .cj-root {
          font-family: 'DM Sans', 'Syne', sans-serif;
          background: var(--cj-root-bg);
          min-height: 100vh;
          position: relative;
          overflow: hidden;
          padding: 60px 24px 80px;
          width: 80%;
          border-radius: 24px;
        }
        .cj-grid-bg {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px);
          background-size: 56px 56px;
          pointer-events: none;
        }
        @media (prefers-color-scheme: dark) {
          .cj-grid-bg {
            background-image:
              linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px);
          }
        }
        .cj-timeline-wrap {
          position: relative;
          max-width: 700px;
          margin: 0 auto;
        }
        .cj-line {
          position: absolute;
          left: 50%;
          top: 0;
          bottom: 0;
          width: 1.5px;
          transform: translateX(-50%);
          background: linear-gradient(to bottom,
            transparent,
            rgba(127,119,221,0.4) 10%,
            rgba(29,158,117,0.4) 40%,
            rgba(216,90,48,0.4) 80%,
            transparent
          );
          transform-origin: top;
          pointer-events: none;
          z-index: 1;
        }
        @media (max-width: 540px) {
          .cj-timeline-wrap { padding: 0; }
        }
      `}</style>

      <div className="cj-root">
        <div className="cj-grid-bg" />

        {/* Background orbs */}
        <Orb color={orbColors[0]} style={{ width: 340, height: 340, top: -100, left: -100 }} />
        <Orb color={orbColors[1]} style={{ width: 260, height: 260, top: 300, right: -80 }} />
        <Orb color={orbColors[2]} style={{ width: 200, height: 200, bottom: 160, left: 40 }} />
        <Orb color={orbColors[3]} style={{ width: 160, height: 160, bottom: 60, right: 60 }} />

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{ textAlign: "center", marginBottom: "56px", position: "relative", zIndex: 2 }}
        >
          <motion.p
            initial={{ opacity: 0, letterSpacing: "6px" }}
            animate={{ opacity: 1, letterSpacing: "4px" }}
            transition={{ duration: 1 }}
            style={{
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "4px",
              textTransform: "uppercase",
              color: "#7F77DD",
              marginBottom: "12px",
            }}
          >
            My Journey
          </motion.p>
          <h1
            style={{
              fontSize: "clamp(28px, 5vw, 44px)",
              fontWeight: 700,
              color: "var(--cj-text-primary)",
              margin: 0,
              letterSpacing: "-1px",
              lineHeight: 1.1,
            }}
          >
            Career Timeline
          </h1>
          <p
            style={{
              fontSize: "14px",
              color: "var(--cj-text-secondary)",
              marginTop: "10px",
            }}
          >
            A journey through code, design &amp; beyond
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="cj-timeline-wrap" ref={lineRef}>
          {/* Vertical line */}
          <motion.div
            className="cj-line"
            initial={{ scaleY: 0 }}
            animate={lineInView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          />

          {journeyData.map((item, index) => (
            <TimelineCard key={item.year} item={item} index={index} />
          ))}
        </div>
      </div>
    </>
  );
}