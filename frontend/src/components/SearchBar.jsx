import { useState } from "react";
import { Search, MapPin } from "lucide-react";

function SearchBar({ onSearch, onGetLocation }) {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    onSearch(input);
    setInput("");
  };

  return (
    <div className="flex gap-2 mb-6 w-full">
      <form onSubmit={handleSubmit} className="flex flex-1 gap-2">
        <div className="relative flex-1">
          <Search
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"
            size={18}
          />
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Search for a city..."
            className="w-full bg-slate-900/60 border border-slate-800 text-slate-100 pl-11 pr-4 py-2.5 rounded-xl text-sm placeholder-slate-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30 transition-all shadow-inner"
          />
        </div>
        <button
          type="submit"
          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 active:scale-[0.98] text-white font-semibold text-sm px-6 py-2.5 rounded-xl transition-all cursor-pointer shadow-lg shadow-indigo-950/40"
        >
          Search
        </button>
      </form>
      <button
        onClick={onGetLocation}
        className="bg-slate-900/60 hover:bg-slate-800/80 active:scale-95 border border-slate-800 text-slate-300 p-2.5 rounded-xl transition-all cursor-pointer flex items-center justify-center group"
        title="Use Current Location"
      >
        <MapPin
          size={18}
          className="group-hover:text-blue-400 transition-colors"
        />
      </button>
    </div>
  );
}

export default SearchBar;
