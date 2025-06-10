import React, { useEffect } from "react";
import axios from "axios";
//import { useParams } from "react-router-dom";

const Weather = ({
  weatherData,
  setWeatherData,
  weatherImage,
  setWeatherImage,
}) => {
  //const { city } = useParams();

  const getWeatherData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/v3/ai-chat-bot`
      );

      const temperature = response.data.temperature;

      if (!temperature) {
        console.log("No temperature");
        return;
      }

      setWeatherData(`${temperature}`);
      console.log(`The current temperature is ${temperature}`);

      if (temperature <= 0) {
        setWeatherImage("src/assets/snowflake.png");
      }
      if (temperature > 0 && temperature < 15) {
        setWeatherImage("src/assets/partly_cloudy.png");
      }
      if (temperature > 15) {
        setWeatherImage("src/assets/sun.png");
      }
    } catch (error) {
      console.log("Fetching failed", error);
    }
  };

  useEffect(() => {
    getWeatherData();
  }, []);

  return (
    <>
      <div className="flex justify-center">
        <div className="flex mb-3 p-1 border border-black bg-slate-100 rounded-full shadow-md">
          <div className="p-2 border border-black bg-slate-100 rounded-full">
            {weatherData ? (
              <p className="text-2xl">{weatherData}°C</p>
            ) : (
              <p>Loading weather data...</p>
            )}
          </div>
          <div className="flex justify-center items-center">
            {weatherImage ? (
              <img
                className="h-11 w-11 p-2"
                src={weatherImage}
                alt="Weather condition"
              />
            ) : (
              <p>Image not available</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Weather;
