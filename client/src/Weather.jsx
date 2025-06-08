import React, { useState, useEffect } from "react";
import axios from "axios";

const Weather = ({
  weatherData,
  setWeatherData,
  weatherImage,
  setWeatherImage,
}) => {
  const city = "London";

  const getWeatherData = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/v1/ai-chat-bot/weather/${city}`
      );

      const temperature = res.data.current.temp_c;
      setWeatherData(`${temperature}°C`);
      console.log(`The current temperature is ${res.data.current.temp_c}`);

      if (temperature < 26) {
        setWeatherImage("src/assets/partly_cloudy.png");
      } else {
        setWeatherImage("src/assets/snowflake.png");
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
              <p className="text-2xl">{weatherData} </p>
            ) : (
              <p>Loading weather data...</p>
            )}
          </div>
        <div className="flex justify-center items-center">
          {weatherImage ? (
            <img className="h-11 w-11 p-2" src={weatherImage} alt="Weather condition" />
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
