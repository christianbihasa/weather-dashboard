import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

function ForecastChart({ data, isCelsius }) {
  if (!data || !data.list) return null;

  const processedData = data.list
    .filter((item) => item.dt_txt.includes("12:00:00"))
    .map((item) => {
      const date = new Date(item.dt * 1000);
      return {
        day: date.toLocaleDateString("en-US", { weekday: "short" }),
        temp: Math.round(item.main.temp),
        humidity: item.main.humidity,
        condition: item.weather[0].main,
      };
    });

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900 border border-slate-700/70 p-3 rounded-xl shadow-2xl backdrop-blur-sm">
          <p className="text-xs font-bold text-white mb-1.5 border-b border-slate-700/50 pb-1">
            {payload[0].payload.day}
          </p>
          <p className="text-xs font-semibold text-blue-400">
            Temp: {payload[0].value}°{isCelsius ? "C" : "F"}
          </p>
          <p className="text-[11px] text-slate-300 mt-0.5">
            Humidity: {payload[0].payload.humidity}%
          </p>
          <p className="text-[11px] text-slate-400 capitalize mt-0.5">
            Cond: {payload[0].payload.condition}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-slate-800/80 border border-slate-700/50 rounded-2xl p-6 h-[340px] flex flex-col justify-between shadow-xl backdrop-blur-md">
      <h3 className="text-sm font-bold tracking-wide text-slate-300 uppercase mb-3">
        5-Day Forecast Trends
      </h3>
      <div className="bg-slate-900/40 p-2.5 rounded-xl flex-1 flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={processedData}
            margin={{ top: 5, right: 5, left: -25, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#334155"
              opacity={0.25}
              vertical={false}
            />
            <XAxis
              dataKey="day"
              stroke="#64748b"
              tickLine={false}
              tick={{ fontSize: 11, fontWeight: 500 }}
              dy={8}
            />
            <YAxis
              stroke="#64748b"
              tickLine={false}
              tick={{ fontSize: 11 }}
              domain={["dataMin - 2", "dataMax + 2"]}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="temp"
              stroke="#3b82f6"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#colorTemp)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default ForecastChart;
