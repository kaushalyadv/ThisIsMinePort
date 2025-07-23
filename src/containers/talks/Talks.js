// src/containers/talks/Talks.js

import React, { useContext, useState, useEffect } from "react";
import "./Talks.scss";
import TalkCard from "../../components/talkCard/TalkCard";
import { talkSection } from "../../portfolio";
import StyleContext from "../../contexts/StyleContext";
import FloatingSendButton from "../../components/FloatingSendButton/FloatingSendButton";

// Import BOTH Lottie JSON files
import relaxedPersonAnimationData from "../../assets/lottie/spacedeveloper.json"; // Adjust path
import rocketAnimationData from "../../assets/lottie/rocket.json"; // Adjust path

export default function Talks() {
  const { isDark } = useContext(StyleContext);
  const [message, setMessage] = useState('');
  const [isRelaxedPersonBlurred, setIsRelaxedPersonBlurred] = useState(false);
  const [showRocketAnimation, setShowRocketAnimation] = useState(false);

  const rocketTimerRef = React.useRef(null);
  const blurTimerRef = React.useRef(null);

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmitMessage = () => {
    console.log("Message to send:", message);
    setMessage('');

    // Clear any existing timers to prevent overlapping effects if clicked rapidly
    if (rocketTimerRef.current) clearTimeout(rocketTimerRef.current);
    if (blurTimerRef.current) clearTimeout(blurTimerRef.current);

    // 1. Immediately blur the relaxed person animation
    setIsRelaxedPersonBlurred(true);

    // 2. Immediately show the rocket animation
    setShowRocketAnimation(true);

    // 3. Set a timer to hide the rocket animation after 1 second
    rocketTimerRef.current = setTimeout(() => {
      setShowRocketAnimation(false);
    }, 1000); // Rocket stays visible for 1 second

    // 4. Set a timer to remove the blur from the relaxed person animation
    //    This should happen right after the rocket has faded out (e.g., rocket duration + rocket fade-out time)
    blurTimerRef.current = setTimeout(() => {
      setIsRelaxedPersonBlurred(false);
    }, 1000 + 300); // 1 second for rocket + 0.3s for rocket fade-out = 1.3s total for blur to remain

  };

  // Cleanup timers if the component unmounts
  useEffect(() => {
    return () => {
      if (rocketTimerRef.current) clearTimeout(rocketTimerRef.current);
      if (blurTimerRef.current) clearTimeout(blurTimerRef.current);
    };
  }, []);

  if (!talkSection.display) {
    return null;
  }

  return (
    <div className="main" id="talks">
      <div className="talk-header">
        <h1 className="talk-header-title">{talkSection.title}</h1>
        <p
          className={
            isDark
              ? "light-mode talk-header-subtitle"
              : "subTitle talk-header-subtitle"
          }
        >
          {talkSection.subtitle}
        </p>
      </div>
      <div className="talks-content-container">
        <div className="talk-cards-wrapper">
          {talkSection.talks.map((talk, i) => {
            return (
              <TalkCard
                key={i}
                talkDetails={{
                  title: talk.title,
                  subtitle: talk.subtitle,
                  slides_url: talk.slides_url,
                  event_url: talk.event_url,
                  image: talk.image,
                  isDark
                }}
              />
            );
          })}
        </div>
        {/* Pass ALL Lottie-related props to FloatingSendButton */}
        <FloatingSendButton
          text={message}
          onChange={handleMessageChange}
          onSubmit={handleSubmitMessage}
          isRelaxedPersonBlurred={isRelaxedPersonBlurred}
          relaxedPersonAnimationData={relaxedPersonAnimationData}
          showRocketAnimation={showRocketAnimation}
          rocketAnimationData={rocketAnimationData}
        />
      </div>
    </div>
  );
}