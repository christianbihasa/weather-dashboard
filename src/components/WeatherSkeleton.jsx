import React from "react";

export function WeatherCardSkeleton() {
  return (
    <div className="bg-slate-800/60 border border-slate-700/40 rounded-2xl p-6 animate-pulse h-[340px] flex flex-col justify-between">
      <div className="flex justify-between items-start">
        <div className="space-y-2.5 w-1/2">
          <div className="h-6 bg-slate-700/60 rounded-lg w-3/4"></div>
          <div className="h-3.5 bg-slate-700/40 rounded-md w-1/2"></div>
        </div>
        <div className="h-14 w-14 bg-slate-700/50 rounded-xl"></div>
      </div>
      <div className="my-4">
        <div className="h-14 bg-slate-700/60 rounded-xl w-1/3"></div>
      </div>
      <div className="grid grid-cols-3 gap-2 pt-4 border-t border-slate-700/30 bg-slate-900/10 rounded-xl p-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="space-y-2 flex flex-col items-center">
            <div className="h-4 bg-slate-700/50 rounded-md w-6"></div>
            <div className="h-3 bg-slate-700/30 rounded-md w-10"></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ChartSkeleton() {
  return (
    <div className="bg-slate-800/60 border border-slate-700/40 rounded-2xl p-6 animate-pulse h-[340px] flex flex-col justify-between">
      <div className="h-4 bg-slate-700/60 rounded-md w-1/3 mb-4"></div>
      <div className="flex-1 bg-slate-900/20 rounded-xl p-4 flex items-end justify-between gap-3 h-[200px]">
        {[40, 65, 30, 80, 55].map((h, i) => (
          <div
            key={i}
            className="bg-slate-700/30 w-full rounded-t-lg"
            style={{ height: `${h}%` }}
          ></div>
        ))}
      </div>
      <div className="flex justify-between mt-4 px-2">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="h-3 bg-slate-700/40 rounded-md w-8"></div>
        ))}
      </div>
    </div>
  );
}
