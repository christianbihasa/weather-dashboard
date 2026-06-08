const BASE_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000/api"
    : "https://weather-dashboard-n30y.onrender.com";

export const fetchWeatherByCity = async (city, isCelsius) => {
  const units = isCelsius ? "metric" : "imperial";
  const response = await fetch(
    `${BASE_URL}/weather?city=${encodeURIComponent(city)}&units=${units}`,
  );
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || "City not found");
  }
  return response.json();
};

export const fetchForecastByCity = async (city, isCelsius) => {
  const units = isCelsius ? "metric" : "imperial";
  const response = await fetch(
    `${BASE_URL}/forecast?city=${encodeURIComponent(city)}&units=${units}`,
  );
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || "Forecast unavailable");
  }
  return response.json();
};

export const fetchWeatherByCoords = async (lat, lon, isCelsius) => {
  const units = isCelsius ? "metric" : "imperial";
  const response = await fetch(
    `${BASE_URL}/weather?lat=${lat}&lon=${lon}&units=${units}`,
  );
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.error || "Failed to fetch weather for your location",
    );
  }
  return response.json();
};

export const fetchForecastByCoords = async (lat, lon, isCelsius) => {
  const units = isCelsius ? "metric" : "imperial";
  const response = await fetch(
    `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&units=${units}`,
  );
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.error || "Failed to fetch forecast for your location",
    );
  }
  return response.json();
};
