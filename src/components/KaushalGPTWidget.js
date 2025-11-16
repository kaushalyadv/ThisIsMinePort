import React, { useState } from 'react';
import KaushalGPTChat from './KaushalGPTChat';
import './KaushalGPTChat.scss';

// A simple Chat Icon for the launcher button
const ChatIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
    <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z"/>
  </svg>
);

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
        {/* The icon stays on top */}
        <ChatIcon />
        
        {/* --- 🌟 NEW GLITTER EFFECT --- */}
        <div className="glitter-wrapper">
          {/* We'll add 10 glitter particles */}
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
        {/* --- END GLITTER EFFECT --- */}

      </button>
    </>
  );
}