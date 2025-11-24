import React, { useState, useEffect, useRef } from "react";
import './KaushalGPTChat.scss';


const GOOGLE_WEBHOOK = "https://script.google.com/macros/s/AKfycbzqJeTbjUxahf6dtd_8AE-p8zT0N7mW9YuL4aZUNTFITtv0-_UZs15PTCLKsYRXU82rpQ/exec";
const WEBHOOK_SECRET = "Kaushal@7017Yadav";

// New Close Icon
const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/>
  </svg>
);

// New Send Icon
const SendIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2 .01 7z"/>
  </svg>
);


// We now accept 'isOpen' and 'onClose' as props
export default function KaushalGPTChat({ isOpen, onClose }) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null); // Ref to scroll to bottom

  // Function to auto-scroll to the newest message
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]); // Scroll on new messages or when loading

const sendMessage = async () => {
  if (!input.trim()) return;

  const userMessage = input;
  const newMessages = [...messages, { role: "user", content: userMessage }];
  setMessages(newMessages);
  setInput("");
  setLoading(true);

  try {
    // 1) Ask KaushalGPT backend
    const res = await fetch("https://dark-hat-faec.kaushalyadav-twitter.workers.dev/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        mode: "default",
        messages: newMessages,
      }),
    });

    const data = await res.json();
    const botReply = data.choices?.[0]?.message?.content || "No response 🤖";

    // 2) Send to Google Webhook (Sheet + WhatsApp)
    fetch("https://dark-hat-faec.kaushalyadav-twitter.workers.dev/log", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    secret: WEBHOOK_SECRET,
    event: "website_chat",
    message: userMessage,
    reply: botReply,
    page: window.location.href,
    userTimestamp: Date.now()
  }),
}).catch(err => console.warn("Sheet log failed:", err));

    // 3) Update UI
    setMessages([...newMessages, { role: "assistant", content: botReply }]);

  } catch (e) {
    console.error(e);
  } finally {
    setLoading(false);
  }
};



  return (
    // We add 'open' or 'closed' class based on the 'isOpen' prop
    <div className={`KaushalGPTChat ${isOpen ? 'open' : 'closed'}`}>
      
      {/* New Header */}
      <div className="chat-header">
        <h3>KaushalGPT</h3>
        <button className="chat-close-button" onClick={onClose} aria-label="Close chat">
          <CloseIcon />
        </button>
      </div>

      {/* This container holds all the messages */}
      <div className="chat-messages">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`message-bubble ${m.role === "user" ? "user" : "assistant"}`}
          >
            {m.content}
          </div>
        ))}
        {loading && (
          <div className="message-bubble assistant typing-indicator">
            <span></span><span></span><span></span>
          </div>
        )}
        {/* Empty div to act as a scroll-to target */}
        <div ref={messagesEndRef} />
      </div>

      {/* This container holds the input and send button */}
      <div className="input-area">
        <input
          className="chat-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && !loading && sendMessage()}
          placeholder="Talk to KaushalGPT..."
          disabled={loading}
        />
        <button
          className="send-button"
          onClick={sendMessage}
          disabled={loading || !input.trim()}
        >
          {loading ? <div className="loader"></div> : <SendIcon />}
        </button>
      </div>
    </div>
  );
}