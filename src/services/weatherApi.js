const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export const fetchWeatherByCity = async (city, isCelsius) => {
  const units = isCelsius ? "metric" : "imperial";
  const response = await fetch(
    `${BASE_URL}/weather?q=${city}&units=${units}&appid=${API_KEY}`,
  );
  if (!response.ok) throw new Error("City not found");
  return response.json();
};

export const fetchForecastByCity = async (city, isCelsius) => {
  const units = isCelsius ? "metric" : "imperial";
  const response = await fetch(
    `${BASE_URL}/forecast?q=${city}&units=${units}&appid=${API_KEY}`,
  );
  if (!response.ok) throw new Error("Forecast unavailable");
  return response.json();
};

export const fetchWeatherByCoords = async (lat, lon, isCelsius) => {
  const units = isCelsius ? "metric" : "imperial";
  const response = await fetch(
    `${BASE_URL}/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${API_KEY}`,
  );
  if (!response.ok)
    throw new Error("Failed to fetch weather for your location");
  return response.json();
};

export const fetchForecastByCoords = async (lat, lon, isCelsius) => {
  const units = isCelsius ? "metric" : "imperial";
  const response = await fetch(
    `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&units=${units}&appid=${API_KEY}`,
  );
  if (!response.ok)
    throw new Error("Failed to fetch forecast for your location");
  return response.json();
};
