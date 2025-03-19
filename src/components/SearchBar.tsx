// import { useState } from "react";
import { FaSearch } from "react-icons/fa";
// import ApiService from "@/api-services/apiService";

export default function SearchBar() {
  // const [inputValue, setInputValue] = useState<string>("");

  // const fetchData = (value: string) => {};

  return (
    <form>
      <div className="relative">
        <input
          type="search"
          id="default-search"
          className="block w-full p-2 pr-8 text-xs rounded-lg bg-neutral-700 border border-neutral-700 placeholder-neutral-400 text-white outline-none focus:border-neutral-600"
          placeholder="Pesquise por filmes/series..."
          // value={inputValue}
          // onChange={(e) => setInputValue(e.target.value)}
          required
        />
        <FaSearch className="absolute end-3 top-2 text-gray-400 cursor-pointer" />

        <button type="submit" className="hidden"></button>
      </div>
    </form>
  );
}
