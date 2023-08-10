import React, { useState } from 'react';

const WeatherApp = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [errorMessage, setErrorMessage] = useState('')

  const API_KEY = process.env.REACT_APP_API_KEY;
  const API_URL = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${API_KEY}`;

  const fetchWeather = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      if (data.cod === 200) {
        setWeather(data);
        if (errorMessage !== '') setErrorMessage('')
      } else {
        if (weather !== null) setWeather(null)
        setErrorMessage('City not found.');
      }
      console.log(data);
    } catch (error) {
      console.error('Error fetching weather:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city) {
      fetchWeather();
    }
  };

  return (
    <div className="weather-app min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-80">
        <h1 className="text-2xl font-bold mb-4">Weather App</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter city name"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button
            type="submit"
            className="mt-2 w-full bg-blue-500 text-white rounded py-2 font-semibold hover:bg-blue-600"
          >
            Get Weather
          </button>
        </form>
        {errorMessage && (
          <span>{errorMessage}</span>
        )}
        {weather && (
          <div className="mt-4">
            <h2 className="text-lg font-semibold">
              {weather.name}, {weather.sys.country}
            </h2>
            <p className="mt-1">Temperature: {weather.main.temp}°C</p>
            <p className="mt-1">Weather: {weather.weather[0].description}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherApp;
