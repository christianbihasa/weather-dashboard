import { useState, useEffect } from "react";
import { MOCK_CITIES } from "./utils/mockWeather";
import {
  fetchWeatherByCity,
  fetchForecastByCity,
  fetchWeatherByCoords,
  fetchForecastByCoords,
} from "./services/weatherApi";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import ForecastChart from "./components/ForecastChart";
import WeatherGlobe from "./components/WeatherGlobe";
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
  // Track if the system is running in live mode or fallback demo mode
  const [isDemoMode, setIsDemoMode] = useState(false);

  // Tries live API first; gracefully falls back to mock data on rate limits/network failures
  const handleSearch = async (city) => {
    if (!city.trim()) return;
    setLoading(true);
    setError(null);
    setIsDemoMode(false); // Reset tracking mode flag on every fresh attempt

    try {
      // 1. Attempt live production fetch pipelines
      const weather = await fetchWeatherByCity(city, isCelsius);
      const forecast = await fetchForecastByCity(city, isCelsius);

      setWeatherData(weather);
      setForecastData(forecast);
      setCurrentCity(city);
    } catch (err) {
      const errMsg = err.message || "";

      // 2. Intercept API blocks (429 rate limits, 401 expired keys, or network failures)
      if (
        errMsg.includes("429") ||
        errMsg.includes("401") ||
        errMsg.includes("limit") ||
        errMsg.includes("fetch")
      ) {
        console.warn(
          "Live API limits reached or network blocked. Engaging mock mode presentation.",
        );

        const targetCity = city.toLowerCase().includes("paris")
          ? "paris"
          : "manila";
        const mockData = MOCK_CITIES[targetCity];

        setWeatherData(mockData.weather);
        setForecastData(mockData.forecast);
        setCurrentCity(mockData.weather.name);
        setIsDemoMode(true); // Flip status flag to alert the UI layout
      } else {
        // Standard user input error (e.g., misspelled cities)
        setError(errMsg || "City not found. Please verify spelling.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Maps coordinates live or loads a baseline mock dashboard fallback
  const handleGeolocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }
    setLoading(true);
    setError(null);
    setIsDemoMode(false);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          // Attempt live coordinate tracking lookup
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
          // Fall back to mock node if the API keys are blocked here as well
          console.warn(
            "Coordinate lookup failed. Loading default tracking fallback environment.",
          );
          setWeatherData(MOCK_CITIES.manila.weather);
          setForecastData(MOCK_CITIES.manila.forecast);
          setCurrentCity(MOCK_CITIES.manila.weather.name);
          setIsDemoMode(true);
        } finally {
          setLoading(false);
        }
      },
      () => {
        // Location access explicitly denied by the testing user
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
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased px-4 py-8 md:py-12 lg:py-6 flex flex-col items-center lg:h-screen lg:overflow-hidden select-none">
      <div className="w-full max-w-5xl h-full flex flex-col lg:justify-between">
        {/* Top Branding Section - shrink-0 stops it from crushing layout scales */}
        <header className="flex justify-between items-center mb-6 w-full shrink-0">
          <div>
            <h1 className="text-xl md:text-2xl font-black tracking-wider text-white">
              WEATHER ANALYTICS
            </h1>
            <div className="flex items-center gap-2 mt-0.5">
              <p className="text-[10px] font-bold text-slate-500 tracking-widest uppercase">
                Live climate observation desk
              </p>
              {/* DEMO MODE HUD BADGE */}
              {isDemoMode && (
                <span className="text-[9px] bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono font-bold px-1.5 py-0.5 rounded uppercase tracking-wider animate-pulse">
                  DEMO MODE (API LIMIT FALLBACK)
                </span>
              )}
            </div>
          </div>
          <button
            onClick={() => setIsCelsius(!isCelsius)}
            className="px-3.5 py-1.5 border border-slate-800 bg-slate-900/80 text-slate-300 rounded-xl hover:text-blue-400 hover:border-blue-500/40 transition-all font-semibold text-xs tracking-wide uppercase cursor-pointer"
          >
            Scale: °{isCelsius ? "F" : "C"}
          </button>
        </header>

        {/* Query Panel Control */}
        <SearchBar onSearch={handleSearch} onGetLocation={handleGeolocation} />

        {/* Feedback Alert Node */}
        <ErrorBanner message={error} onClose={() => setError(null)} />

        {/* Primary Workspace Layout Container */}
        <main className="w-full lg:flex-1 lg:flex lg:flex-col lg:justify-center lg:overflow-hidden mt-4">
          {loading ? (
            <div className="flex flex-col gap-4 w-full lg:h-full lg:justify-between">
              {/* Loading Grid: Card + Globe Skeleton Placeholder */}
              <div className="grid grid-cols-1 md:grid-cols-5 gap-6 w-full items-start">
                <div className="md:col-span-2">
                  <WeatherCardSkeleton />
                </div>
                <div className="md:col-span-3">
                  <div className="w-full h-[340px] bg-slate-900/40 rounded-2xl animate-pulse border border-slate-800/50" />
                </div>
              </div>
              {/* Full Width Chart Skeleton */}
              <div className="w-full lg:flex-1 flex items-end">
                <ChartSkeleton />
              </div>
            </div>
          ) : (
            weatherData &&
            forecastData &&
            !error && (
              <div className="flex flex-col gap-4 w-full lg:h-full lg:justify-between">
                {/* Row 1: Weather Details beside the 3D Globe */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-6 w-full items-start">
                  <div className="md:col-span-2">
                    <WeatherCard data={weatherData} isCelsius={isCelsius} />
                  </div>
                  <div className="md:col-span-3">
                    <WeatherGlobe coordinates={weatherData.coord} />
                  </div>
                </div>

                {/* Row 2: Detailed Graph stretched out underneath */}
                <div className="w-full lg:flex-1 lg:min-h-[260px] flex flex-col justify-end">
                  <ForecastChart data={forecastData} isCelsius={isCelsius} />
                </div>
              </div>
            )
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
