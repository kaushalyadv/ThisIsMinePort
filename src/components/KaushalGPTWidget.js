import React, { useState } from 'react';
import KaushalGPTChat from './KaushalGPTChat'; // Import the chat window
import './KaushalGPTChat.scss'; // We'll add the new button styles here

// A simple Chat Icon for the launcher button
const ChatIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
    <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z"/>
  </svg>
);

export default function KaushalGPTWidget() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Toggle the chat window
  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <>
      {/* This is the chat window component.
        We pass `isOpen` to control its visibility.
        We pass `onClose` so it can tell this parent to close it.
      */}
      <KaushalGPTChat 
        isOpen={isChatOpen} 
        onClose={() => setIsChatOpen(false)} 
      />

      {/* This is the new launcher button.
        It's styled entirely by the SCSS file.
      */}
      <button 
        className="chat-launcher-button" 
        onClick={toggleChat}
        aria-label="Toggle chat"
      >
        <ChatIcon />
      </button>
    </>
  );
}