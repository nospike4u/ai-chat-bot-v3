import { useState } from "react";
import axios from "axios";

const MyChatBot = ({ weatherData }) => {
  console.log("Weather Data in Chatbot", weatherData);

  const apiKey = import.meta.env.VITE_OPEN_AI_APIKEY;

  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");

  const sendMessage = async (message) => {
    try {
      console.log("Weather Data Passed to Chatbot:", weatherData);

      const res = await axios.post(
        "https://api.openai.com/v1/chat/completions",

        {
          model: "gpt-4o",
          messages: [
            {
              role: "assistant",
              content: `You are an AI assistant. The current weather is ${weatherData}°C. : "Weather data is not available at the moment." Use this data to respond.`,
            },
            { role: "user", content: message },
          ],
          
          max_tokens: 100,
        },
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!res.data || !res.data.choices) {
        console.error("API response is missing 'choices':", res.data);
        if (res.data.error) {
          console.log("OpenAI Error:", res.data.error);
        }
        return;
      }
      console.log("Full API Response:", res.data.choices[0].message);

      setResponse(res.data.choices[0].message.content);
      console.log("AI Response:", res.data);
    } catch (error) {
      console.log("Error fetching response", error);
    }
  };

  return (
    <>
      <div>
        <div className="mx-36">
          <label className="text-sm textgray-500 dark:text-gray-300"></label>
        <textarea rows="3" className="mt-4 max-w-screen-lg w-full whitespace-normal overflow-hidden resize-none placeholder-gray-400 dark:placeholder-gray-500 rounded-lg border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:outline-none focus:ring:0"
          type="text"
          placeholder="Ask your AI chatbot..."
          value={message}
          onChange={(e) => setMessage(e.target.value, weatherData)}
          //onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        ></textarea>


        </div>
        <button
          className="mt-6 px-6 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacitiy-80"
          onClick={() => message.trim() && sendMessage(message)}
        >
          Send
        </button>
        <div>
        <p className="mt-6"><strong>Dom Bot:</strong> {response}</p>
        </div>
      </div>
    </>
  );
};

export default MyChatBot;
