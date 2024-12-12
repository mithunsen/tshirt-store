import React, { useState } from "react";

type SearchBarProps = {
  onSearch: (query: string) => void;
};

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchTxt, setSearchTxt] = useState<string>("");
  return (
    <div className="flex justify-center w-1/2">
      <input
        type="text"
        name="search"
        id="search"
        className="block w-full rounded-md bg-white px-2 py-2 mr-4 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
        onChange={(e) => setSearchTxt(e.target.value)}
      />
      <button
        onClick={() => onSearch(searchTxt)}
        type="button"
        className="text-sm px-4 bg-blue-500 text-white rounded-md hover:bg-blue-700"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
