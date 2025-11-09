import React, { useState } from "react";
import './KaushalGPTChat.scss';

export default function KaushalGPTChat() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("https://dark-hat-faec.kaushalyadav-twitter.workers.dev/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode: "default", // later we’ll add dropdown for modes
          messages: newMessages,
        }),
      });

      const data = await res.json();
      const reply = data.choices?.[0]?.message?.content || "No response 🤖";
      setMessages([...newMessages, { role: "assistant", content: reply }]);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="KaushalGPTChat fixed bottom-5 right-5 w-96 bg-[#0a0a0a] text-white rounded-2xl shadow-xl border border-gray-800 p-4 flex flex-col">
      <div className="flex flexUP">
        <input
          className="flex-1  bg-gray-900 border border-gray-700 rounded-l-lg px-3 py-2 outline-none"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Talk to KaushalGPT..."
        />
        <button
          className="bg-blue-600 px-4 rounded-r-lg"
          onClick={sendMessage}
          disabled={loading}
        >
          {loading ? "..." : "Send"}
        </button>
      </div>
      <div className="flex-1 flexb-1 overflow-y-auto space-y-2 mb-3 max-h-96">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`p-2 rounded-lg ${
              m.role === "user" ? "bg-blue-600 ml-auto text-right" : "bg-gray-800 mr-auto text-left"
            }`}
          >
            {m.content}
          </div>
        ))}
      </div>

      
    </div>
  );
}
