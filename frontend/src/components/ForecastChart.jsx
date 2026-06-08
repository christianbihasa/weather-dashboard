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

  // Downsample: Extract every 4th item (3 hours x 4 = 12-hour steps) to prevent crowding
  const filteredList = data.list.filter((_, index) => index % 4 === 0);

  const processedData = filteredList.map((item) => {
    const date = new Date(item.dt * 1000);
    return {
      // Formats data points to display day and localized hour (e.g., "Mon 12 PM")
      displayTime:
        date.toLocaleDateString("en-US", { weekday: "short" }) +
        " " +
        date.toLocaleTimeString("en-US", { hour: "numeric", hour12: true }),
      day: date.toLocaleDateString("en-US", { weekday: "short" }),
      temp: Math.round(item.main.temp),
      humidity: item.main.humidity,
      condition: item.weather[0].main,
    };
  });

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-950/95 border border-slate-800 p-3.5 rounded-xl shadow-2xl backdrop-blur-md min-w-[130px]">
          <p className="text-[11px] font-bold text-slate-400 mb-1.5 border-b border-slate-800/80 pb-1">
            {payload[0].payload.displayTime}
          </p>
          <p className="text-xs font-black text-white flex justify-between items-center gap-4">
            <span className="text-slate-500 font-medium">Temp:</span>
            <span>
              {payload[0].value}°{isCelsius ? "C" : "F"}
            </span>
          </p>
          <p className="text-xs font-black text-blue-400 flex justify-between items-center gap-4 mt-1">
            <span className="text-slate-500 font-medium">Humidity:</span>
            <span>{payload[0].payload.humidity}%</span>
          </p>
          <p className="text-xs font-bold text-amber-400 flex justify-between items-center gap-4 mt-1">
            <span className="text-slate-500 font-medium">Cond:</span>
            <span className="bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20 text-[10px] capitalize">
              {payload[0].payload.condition}
            </span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-slate-900 border border-slate-800/80 rounded-2xl p-6 h-[340px] flex flex-col justify-between shadow-xl">
      {/* Updated header title to accurately match the data structure */}
      <h3 className="text-[10px] font-bold tracking-wider text-slate-400 uppercase mb-3">
        5-Day Weather Forecast (12-hour intervals)
      </h3>
      <div className="bg-slate-950/40 border border-slate-800/50 p-2.5 rounded-xl flex-1 flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={processedData}
            margin={{ top: 10, right: 5, left: -25, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#334155"
              opacity={0.15}
              vertical={false}
            />
            <XAxis
              dataKey="day"
              stroke="#475569"
              tickLine={false}
              tick={{ fontSize: 11, fontWeight: 600 }}
              dy={8}
              interval={1}
            />
            <YAxis
              stroke="#475569"
              tickLine={false}
              tick={{ fontSize: 11 }}
              domain={["dataMin - 2", "dataMax + 2"]}
            />
            {/* Added a clean dashed vertical cursor line for easier scanning */}
            <Tooltip
              content={<CustomTooltip />}
              cursor={{
                stroke: "#334155",
                strokeWidth: 1,
                strokeDasharray: "4 4",
              }}
            />
            <Area
              type="monotone"
              dataKey="temp"
              stroke="#3b82f6"
              strokeWidth={2.5}
              dot={false}
              activeDot={{ r: 5, strokeWidth: 0, fill: "#3b82f6" }}
              fill="url(#colorTemp)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default ForecastChart;
