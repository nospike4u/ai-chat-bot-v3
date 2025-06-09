import { useState, useEffect } from "react";
import axios from "axios";

const MyChatBot = () => {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  const sendMessage = async () => {
    if (!message.trim()) return;
    console.log("Before sending request...");

    const newUserMessage = {
      sender: "User",
      text: message,
    };
    
    setChatHistory((prev) => [...prev, newUserMessage]);
    setMessage("");
    
    try {
      console.log("Sending request...");
      const response = await axios.post(
        `http://localhost:8000/api/v3/ai-chat-bot`,
        { message }
      );
      
      console.log("AI response data:", response.data.completion);
      const aiReply = response.data.completion || "No reply available";

      setChatHistory((prev) => [...prev, { sender: "Dom Bot", text: aiReply }]);
    } catch (error) {
      console.error("Error sending message to backend:", error);
      setChatHistory((prev) => [
        ...prev,
        { sender: "Dom Bot", text: "Error connecting to AI." },
      ]);
    }
  };

  useEffect(() => {
    console.log("Chat History:", chatHistory);
  }, [chatHistory]);

  return (
    <>
      <div className="h-48 w-full bg-purple-100 border-white border-2 p-4 overflow-y-auto shadow-md rounded-lg">
        <div className="mt-2">
          <div>
            {chatHistory.map((msg, index) => (
              <p
                key={index}
                className={`${
                  msg.sender === "user" ? "text-slate-700 bg-indigo-300 border-slate-500 rounded-lg p-3 user-message" : "ai-message text-left text-slate-700 bg-slate-300 border-slate-500 rounded-lg p-6 mb-4 mt-4"}`}
              >
                <strong className={`${ "text-slate-700"}`}>{msg.sender}: </strong>
                {typeof msg.text === "object" ? JSON.stringify(msg.text) : msg.text}
              </p>
            ))}
          </div>
        </div>

        <div className="flex justify-center">
          <div className="flex overflow-y-auto gap-x-5 w-full mr-2">
            <input
              rows=""
              className="flex-grow placeholder-gray-400 dark:placeholder-gray-500 rounded-full border-black border-1 bg-white px-5 py-2.5 text-gray-700 max-w-screen-lg focus:outline-none focus:ring:0"
              type="text"
              placeholder="Ask Dom Bot..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></input>
          </div>
          <div className="flex w-auto">
            <button
            
              onClick={() => message.trim() && sendMessage()}
            >
              <img
                className="h-7 w-7"
                src="src/assets/send_128dp_000_FILL0_wght300_GRAD0_opsz48.png"
                alt="Send"
              />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyChatBot;
