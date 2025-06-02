import { useState } from "react";
import "./App.css";
import MyChatBot from "./Chatbot";
import WeatherApi from "./Weather";

function App() {
  const [weatherData, setWeatherData] = useState("");
  return (
    <div className="border border-gray-300 p-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
      <h1 className="text-3xl mb-6">Welcome to My AI Chatbot</h1>
      <div>
        <a
          href="#"
          className="text-xl font-bold text-gray-700 dark:text-white hover:text-gray-600 dark:hover:text-gray-200 hover:underline"
          tabindex="0"
          role="link"
        >
          Tools for productivity
        </a>
        <p className="mt-6 ml-10 mr-10 text-gray-600 dark:text-gray-300">
          An A.I. bot designed to help you with the weather – that is, for now!
          Dom Bot version 2 will be out and will be able to dynamically give
          updates on the weather. Currently, responses are limited to the
          current temperature. However, ask him to tell a joke. He's got many up
          his robot sleeves!
        </p>
      </div>
      <div className="mt-7">
        <h3 className="mb-4">Directly fetch the temperature!</h3>

        <WeatherApi setWeatherData={setWeatherData} weatherData={weatherData} />
      </div>
      <div className="mt-7">
        <h3>Ask Dom Bot what the temperature is!</h3>
        <MyChatBot weatherData={weatherData} />
      </div>

      
      <div className="mt-10 border border-gray-300 p-4 rounded-lg shadow-sm dark:bg-gray-800">
        <div className="flex items-center justify-between"></div>

        <div className="flex items-center justify-between mt-4">
          <a
            href="https://github.com/nospike4u/ai-chat-bot"
            className="text-blue-600 dark:text-blue-400 hover:underline"
            tabindex="0"
            role="link"
          >
            GitHub Project
          </a>

          <div className="flex items-center">
            <a
              className="px-3 py-1 text-sm font-bold text-gray-100 transition-colors duration-300 transform bg-gray-600 rounded cursor-pointer hover:bg-gray-500"
              tabindex="0"
              role="button"
            >
              Version 1.0
            </a>
            <img
              className="hidden object-cover w-10 h-10 mx-4 rounded-full sm:block"
              src="src/assets/Black and White Headshot 2.png"
              alt="avatar"
            ></img>
            <a
              className="font-bold text-gray-700 cursor-pointer dark:text-gray-200"
              tabindex="0"
              role="link"
            >
              Dom Bot
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
