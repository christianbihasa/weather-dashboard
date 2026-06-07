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
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            size={18}
          />
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Search for a city..."
            className="w-full bg-slate-800/80 border border-slate-700/50 text-slate-50 pl-10 pr-4 py-2.5 rounded-xl text-sm placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-medium text-sm px-5 py-2.5 rounded-xl transition-colors cursor-pointer shadow-md shadow-blue-900/20"
        >
          Search
        </button>
      </form>
      <button
        onClick={onGetLocation}
        className="bg-slate-800/80 hover:bg-slate-700/80 active:bg-slate-800 border border-slate-700/50 text-slate-200 p-2.5 rounded-xl transition-colors cursor-pointer flex items-center justify-center group"
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
