import { useState } from "react";
import "./App.css";
import MyChatBot from "./Chatbot";
import Weather from "./Weather";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [isOpen, setIsOpen] = useState(true);
  const [weatherData, setWeatherData] = useState(null);
  const [weatherImage, setWeatherImage] = useState(null);

  const handleCloseModal = () => {
    setIsOpen(false);
  };
  const handleToggleModal = () => {
    setIsOpen((prev) => !prev);
  };

  if (!isOpen) {
    return (
      <button
        onClick={handleToggleModal}
        className="fixed bottom-4 right-4 bg-black text-white p-4 rounded-full shadow-lg"
      >
        <img
          src="src/assets/open_in_new_32dp_FFF_FILL0_wght400_GRAD0_opsz40.png"
          alt="open"
        />
      </button>
    );
  }

  return (
    <>
      <div className="relative pt-8 w-96 border bg-gradient-to-b from-black to-purple-800 p-4 rounded-lg shadow-md">
        <div className="absolute top-6 left-80">
          <button onClick={handleCloseModal}>
            <img
              src="src/assets/close_32dp_FFF_FILL0_wght400_GRAD0_opsz40.png"
              alt="close"
            ></img>
          </button>
        </div>
        <div className="flex items-center justify-center">
          <img
            className="border-4 border-white flex items-center w-24 h-24 mx-4 rounded-full sm:block"
            src="src/assets/Black and White Headshot 2.png"
            alt="avatar"
          ></img>
        </div>
        <div className="absolute bg-green-600 rounded-full w-5 h-5 top-28 left-52"></div>
        <div>
          <h1 className="text-1xl text-white mb-6 font-extralight">Dom Bot</h1>
        </div>

              <Weather 
              weatherData={weatherData}
              setWeatherData={setWeatherData}
              weatherImage={weatherImage}
              setWeatherImage={setWeatherImage}
              />
        

        <div className="">
          <MyChatBot />
        </div>
      </div>
    </>
  );
}

export default App;
