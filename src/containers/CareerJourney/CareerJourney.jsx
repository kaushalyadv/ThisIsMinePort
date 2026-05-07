import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

const journeyData = [
  {
    year: "2024-2025",
    title: "Technical Advisor",
    location: "Gurgaon",
    description:
      "Developed strong communication and client-handling skills through customer-facing roles",
    icon: "🖥️",
    tag: "On-Site/in-office",
    side: "left",
    accent: "#639922",
    bg: "#EAF3DE",
    border: "#9DCE56",
  },
  {
    year: "2025",
    title: "Graphic Designer",
    location: "Remote/Himachal Pradesh",
    description:
      "Designed social media posts, reels, and brochure-style layouts for tourism and adventure brands.",
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
    description:
      "Designed logos, brand identities, and visual mockups for multiple client businesses.",
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
    description:
      "Designed social media creatives, ad visuals, and marketing materials for a healthcare brand.",
    icon: "◉",
    tag: "On-Site/in-office",
    side: "right",
    accent: "#D85A30",
    bg: "#FAECE7",
    border: "#F0997B",
  },
];

const orbColors = ["#7F77DD", "#1D9E75", "#D85A30", "#378ADD"];

function Orb({ color, style, duration = 10 }) {
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
      animate={{
        y: [0, -20, 0],
        scale: [1, 1.05, 1],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

function TimelineCard({ item, index }) {
  const ref = useRef(null);

  const inView = useInView(ref, {
    once: true,
    margin: "-80px",
  });

  const isLeft = item.side === "left";

  const cardContent = (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        x: isLeft ? -48 : 48,
      }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{
        y: -4,
        scale: 1.015,
      }}
      className={`cj-card-content ${
        isLeft ? "cj-card-left" : "cj-card-right"
      }`}
      onHoverStart={(e) => {
        if (e.currentTarget) {
          e.currentTarget.style.borderColor = item.border;
        }
      }}
      onHoverEnd={(e) => {
        if (e.currentTarget) {
          e.currentTarget.style.borderColor =
            "var(--cj-card-border)";
        }
      }}
    >
      {/* TAG */}
      <motion.span
        className="cj-tag"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{
          delay: index * 0.1 + 0.3,
        }}
        style={{
          background: item.bg,
          border: `0.5px solid ${item.border}`,
          color: item.accent,
        }}
      >
        {item.tag}
      </motion.span>

      {/* ICON */}
      <div className="cj-icon-wrap">
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

      {/* YEAR */}
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

      {/* TITLE */}
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

      {/* DESCRIPTION */}
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

      {/* LOCATION */}
      <div className="cj-location-wrap">
        <motion.span
          animate={{ y: [0, -3, 0] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.5,
          }}
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
            animate={{
              scale: [1, 1.4, 1],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: index * 0.3,
            }}
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
  );

  return (
    <div className="cj-card-wrapper">
      {/* LEFT */}
      <div className="cj-left-col">
        {isLeft && cardContent}
      </div>

      {/* CENTER DOT */}
      <div className="cj-center-col">
        <motion.div
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{
            delay: index * 0.1 + 0.2,
            type: "spring",
            stiffness: 300,
          }}
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

      {/* RIGHT */}
      <div className="cj-right-col">
        {!isLeft && cardContent}
      </div>
    </div>
  );
}

export default function CareerJourney() {
  const lineRef = useRef(null);

  const lineInView = useInView(lineRef, {
    once: true,
  });

  return (
    <>
      <style>{`

        .cj-root {
          --cj-root-bg: #f8f7f4;
          --cj-card-bg: #ffffff;
          --cj-card-border: rgba(0,0,0,0.09);
          --cj-text-primary: #1a1a1a;
          --cj-text-secondary: #6b6b6b;

          font-family: 'DM Sans', 'Syne', sans-serif;
          background: var(--cj-root-bg);
          min-height: 100vh;
          position: relative;
          overflow: hidden;
          padding: 60px 24px 80px;
          width: 80%;
          max-width: 1200px;
          margin: 0 auto;
          border-radius: 24px;
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
          background: linear-gradient(
            to bottom,
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

        /* DESKTOP */

        .cj-card-wrapper {
          display: grid;
          grid-template-columns: 1fr 48px 1fr;
          margin-bottom: 40px;
          position: relative;
          align-items: start;
        }

        .cj-left-col {
          grid-column: 1;
        }

        .cj-center-col {
          display: flex;
          justify-content: center;
          position: relative;
          z-index: 2;
        }

        .cj-center-col > div {
          margin-top: 78px;
        }

        .cj-right-col {
          grid-column: 3;
        }

        .cj-card-content {
          background: var(--cj-card-bg);
          border: 0.5px solid var(--cj-card-border);
          border-radius: 16px;
          padding: 20px;
          cursor: pointer;
          position: relative;
          transition:
            border-color 0.25s ease,
            transform 0.25s ease;
          width: 100%;
          box-sizing: border-box;
        }

        .cj-card-left {
          text-align: right;
        }

        .cj-card-right {
          text-align: left;
        }

        .cj-tag {
          position: absolute;
          top: 14px;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 1px;
          text-transform: uppercase;
          padding: 3px 10px;
          border-radius: 20px;
          white-space: nowrap;
        }

        .cj-card-left .cj-tag {
          right: 14px;
        }

        .cj-card-right .cj-tag {
          left: 14px;
        }

        .cj-icon-wrap,
        .cj-location-wrap {
          display: flex;
        }

        .cj-icon-wrap {
          margin: 8px 0 10px;
        }

        .cj-card-left .cj-icon-wrap,
        .cj-card-left .cj-location-wrap {
          justify-content: flex-end;
        }

        .cj-card-right .cj-icon-wrap,
        .cj-card-right .cj-location-wrap {
          justify-content: flex-start;
        }

        /* MOBILE */

        @media (max-width: 768px) {

          .cj-root {
            width: 100%;
            padding: 40px 16px 60px;
            border-radius: 0;
          }

          .cj-timeline-wrap {
            max-width: 100%;
          }

          .cj-card-wrapper {
            grid-template-columns: 52px 1fr;
            column-gap: 14px;
            margin-bottom: 34px;
            align-items: start;
          }

          .cj-left-col {
            grid-column: 2;
          }

          .cj-center-col {
            grid-column: 1;
            display: flex;
            justify-content: center;
            position: relative;
            z-index: 2;
          }

          .cj-center-col > div {
            margin-top: 72px;
          }

          .cj-right-col {
            grid-column: 2;
          }

          .cj-line {
            left: 26px;
            transform: translateX(-50%);
          }

          .cj-card-left {
            text-align: left;
          }

          .cj-card-left .cj-tag {
            right: auto;
            left: 14px;
          }

          .cj-card-left .cj-icon-wrap,
          .cj-card-left .cj-location-wrap {
            justify-content: flex-start;
          }

          .cj-card-content {
            width: 100%;
            padding: 18px;
          }

          .cj-tag {
            font-size: 9px;
          }
        }

      `}</style>

      <div className="cj-root">
        <div className="cj-grid-bg" />

        {/* ORBS */}

        <Orb
          color={orbColors[0]}
          duration={10}
          style={{
            width: 340,
            height: 340,
            top: -100,
            left: -100,
          }}
        />

        <Orb
          color={orbColors[1]}
          duration={12}
          style={{
            width: 260,
            height: 260,
            top: 300,
            right: -80,
          }}
        />

        <Orb
          color={orbColors[2]}
          duration={9}
          style={{
            width: 200,
            height: 200,
            bottom: 160,
            left: 40,
          }}
        />

        <Orb
          color={orbColors[3]}
          duration={11}
          style={{
            width: 160,
            height: 160,
            bottom: 60,
            right: 60,
          }}
        />

        {/* HEADER */}

        <motion.div
          initial={{
            opacity: 0,
            y: 24,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{
            textAlign: "center",
            marginBottom: "56px",
            position: "relative",
            zIndex: 2,
          }}
        >
          <motion.p
            initial={{
              opacity: 0,
              letterSpacing: "6px",
            }}
            animate={{
              opacity: 1,
              letterSpacing: "4px",
            }}
            transition={{
              duration: 1,
            }}
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
            A journey through code, design & beyond
          </p>
        </motion.div>

        {/* TIMELINE */}

        <div
          className="cj-timeline-wrap"
          ref={lineRef}
        >
          <motion.div
            className="cj-line"
            initial={{
              scaleY: 0,
            }}
            animate={lineInView ? { scaleY: 1 } : {}}
            transition={{
              duration: 1.4,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.2,
            }}
          />

          {journeyData.map((item, index) => (
            <TimelineCard
              key={`${item.year}-${index}`}
              item={item}
              index={index}
            />
          ))}
        </div>
      </div>
    </>
  );
}