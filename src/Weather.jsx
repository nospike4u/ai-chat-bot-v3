import axios from "axios";

const WeatherApi = ({ setWeatherData, weatherData }) => {
  const weatherApiKey = import.meta.env.VITE_WEATHER_API_KEY;

  const getWeatherData = async () => {
    try {
      const res = await axios.get(
        `http://api.weatherapi.com/v1/current.json?key=${weatherApiKey}&q=Germany`
      );

      setWeatherData(`${res.data.current.temp_c}°C`);
    } catch (error) {
      console.log("Fetching failed", error);
    }
  };

  return (
    <>
      <div>
        <button
          className="px-6 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacitiy-80"
          onClick={getWeatherData}
        >
          Fetch Temperature
        </button>
        <p className="mt-6 text-4xl font-extralight">{weatherData}</p>
      </div>
    </>
  );
};

export default WeatherApi;
