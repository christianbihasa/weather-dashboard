import {
  Sun,
  Cloud,
  CloudRain,
  CloudSnow,
  CloudLightning,
  Droplets,
  Wind,
  Eye,
} from "lucide-react";

function WeatherCard({ data, isCelsius }) {
  const { name, main, weather, wind, visibility, sys } = data;
  const condition = weather[0].main;
  const description = weather[0].description;

  const getWeatherIcon = (mainCondition) => {
    switch (mainCondition) {
      case "Clear":
        return (
          <Sun
            className="text-amber-400 drop-shadow-[0_0_12px_rgba(251,191,36,0.3)]"
            size={56}
          />
        );
      case "Clouds":
        return (
          <Cloud
            className="text-sky-300 drop-shadow-[0_0_12px_rgba(125,211,252,0.2)]"
            size={56}
          />
        );
      case "Rain":
      case "Drizzle":
        return (
          <CloudRain
            className="text-blue-400 drop-shadow-[0_0_12px_rgba(96,165,250,0.2)]"
            size={56}
          />
        );
      case "Thunderstorm":
        return (
          <CloudLightning
            className="text-violet-400 drop-shadow-[0_0_12px_rgba(167,139,250,0.2)]"
            size={56}
          />
        );
      case "Snow":
        return (
          <CloudSnow
            className="text-slate-100 drop-shadow-[0_0_12px_rgba(241,245,249,0.2)]"
            size={56}
          />
        );
      default:
        return <Cloud className="text-slate-300" size={56} />;
    }
  };

  return (
    <div className="bg-slate-800/80 border border-slate-700/50 rounded-2xl p-6 h-[340px] flex flex-col justify-between shadow-xl backdrop-blur-md">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-white flex items-baseline gap-1.5">
            {name}
            <span className="text-sm font-semibold text-slate-400">
              {sys.country}
            </span>
          </h2>
          <p className="text-xs font-medium text-slate-400 capitalize mt-0.5">
            {description}
          </p>
        </div>
        <div className="p-1 bg-slate-900/30 rounded-xl">
          {getWeatherIcon(condition)}
        </div>
      </div>

      <div className="flex items-baseline my-2">
        <span className="text-6xl font-black tracking-tighter text-white">
          {Math.round(main.temp)}
        </span>
        <span className="text-2xl font-bold text-blue-400 ml-0.5 self-start mt-1">
          °{isCelsius ? "C" : "F"}
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2 pt-4 border-t border-slate-700/40 bg-slate-900/20 rounded-xl p-3">
        <div className="flex flex-col items-center text-center">
          <Droplets size={18} className="text-blue-400 mb-1" />
          <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500">
            Humidity
          </span>
          <span className="text-sm font-semibold text-slate-200 mt-0.5">
            {main.humidity}%
          </span>
        </div>
        <div className="flex flex-col items-center text-center border-x border-slate-700/30 px-1">
          <Wind size={18} className="text-teal-400 mb-1" />
          <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500">
            Wind
          </span>
          <span className="text-sm font-semibold text-slate-200 mt-0.5 text-ellipsis overflow-hidden w-full whitespace-nowrap">
            {wind.speed} {isCelsius ? "m/s" : "mph"}
          </span>
        </div>
        <div className="flex flex-col items-center text-center">
          <Eye size={18} className="text-indigo-400 mb-1" />
          <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500">
            Visibility
          </span>
          <span className="text-sm font-semibold text-slate-200 mt-0.5">
            {(visibility / 1000).toFixed(1)} km
          </span>
        </div>
      </div>
    </div>
  );
}

export default WeatherCard;
