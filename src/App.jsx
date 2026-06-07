import { useState, useEffect } from "react";
import {
  fetchWeatherByCity,
  fetchForecastByCity,
  fetchWeatherByCoords,
  fetchForecastByCoords,
} from "./services/weatherApi";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import ForecastChart from "./components/ForecastChart";
import ErrorBanner from "./components/ErrorBanner";
import {
  WeatherCardSkeleton,
  ChartSkeleton,
} from "./components/WeatherSkeleton";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isCelsius, setIsCelsius] = useState(true);
  const [currentCity, setCurrentCity] = useState("");

  const handleSearch = async (city) => {
    if (!city.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const weather = await fetchWeatherByCity(city, isCelsius);
      const forecast = await fetchForecastByCity(city, isCelsius);
      setWeatherData(weather);
      setForecastData(forecast);
      setCurrentCity(city);
    } catch (err) {
      setError(err.message || "City not found. Please verify spelling.");
    } finally {
      setLoading(false);
    }
  };

  const handleGeolocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }
    setLoading(true);
    setError(null);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const weather = await fetchWeatherByCoords(
            latitude,
            longitude,
            isCelsius,
          );
          const forecast = await fetchForecastByCoords(
            latitude,
            longitude,
            isCelsius,
          );
          setWeatherData(weather);
          setForecastData(forecast);
          setCurrentCity(weather.name);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      },
      () => {
        setError("Location access denied. Loaded default tracking node.");
        setLoading(false);
        if (!currentCity) handleSearch("Manila");
      },
    );
  };

  useEffect(() => {
    handleGeolocation();
  }, []);

  useEffect(() => {
    if (currentCity) {
      handleSearch(currentCity);
    }
  }, [isCelsius]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased px-4 py-8 md:py-12 flex flex-col items-center">
      <div className="w-full max-w-5xl">
        {/* Top Branding Section */}
        <header className="flex justify-between items-center mb-8 w-full">
          <div>
            <h1 className="text-xl md:text-2xl font-black tracking-tight text-white bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text">
              WEATHER ANALYTICS
            </h1>
            <p className="text-[11px] font-medium text-slate-400 tracking-wider uppercase mt-0.5">
              Live climate observation desk
            </p>
          </div>
          <button
            onClick={() => setIsCelsius(!isCelsius)}
            className="px-3.5 py-1.5 border border-blue-500/30 text-blue-400 rounded-xl hover:bg-blue-500/10 active:bg-blue-500/20 transition-all font-semibold text-xs tracking-wide uppercase cursor-pointer shadow-sm shadow-blue-500/5"
          >
            Scale: °{isCelsius ? "F" : "C"}
          </button>
        </header>

        {/* Query Panel Control */}
        <SearchBar onSearch={handleSearch} onGetLocation={handleGeolocation} />

        {/* Feedback Alert Node */}
        <ErrorBanner message={error} onClose={() => setError(null)} />

        {/* Primary Analytical Workspace Grid Layout */}
        <main className="grid grid-cols-1 md:grid-cols-5 gap-6 w-full">
          {loading ? (
            <>
              <div className="md:col-span-2">
                <WeatherCardSkeleton />
              </div>
              <div className="md:col-span-3">
                <ChartSkeleton />
              </div>
            </>
          ) : (
            weatherData &&
            forecastData &&
            !error && (
              <>
                <div className="md:col-span-2 transform transition-all duration-300">
                  <WeatherCard data={weatherData} isCelsius={isCelsius} />
                </div>
                <div className="md:col-span-3 transform transition-all duration-300">
                  <ForecastChart data={forecastData} isCelsius={isCelsius} />
                </div>
              </>
            )
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
