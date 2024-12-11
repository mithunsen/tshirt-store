import React from "react";

type SearchBarProps = {
  onSearch: (query: string) => void;
};

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  return (
    <div className="p-4">
      <input
        type="text"
        placeholder="Search products..."
        onChange={(e) => onSearch(e.target.value)}
        className="w-full p-2 border rounded-lg"
      />
    </div>
  );
};

export default SearchBar;
