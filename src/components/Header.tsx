import React, { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../store/slices/cartSlice";
import { filterProducts } from "../store/slices/productsSlice";
import { AppDispatch, RootState } from "../store/store";

const Header: React.FC = ({}) => {
  const cartCount = useSelector((state: RootState) => state.cart.items.length);
  const [searchTxt, setSearchTxt] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();

  const handleSearch = () => {
    dispatch(filterProducts({ search: searchTxt }));
  };

  return (
    <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 mt-4">
      <h1 className="text-4xl font-bold tracking-tight text-gray-900">
        T-Shirt Store
      </h1>
      <div className="flex justify-center w-1/2">
        <input
          type="text"
          name="search"
          id="search"
          className="block w-full rounded-md bg-white px-2 py-2 mr-4 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
          onChange={(e) => setSearchTxt(e.target.value)}
        />
        <button
          onClick={handleSearch}
          className="text-sm px-4 bg-blue-500 text-white rounded-md hover:bg-blue-700"
        >
          Search
        </button>
      </div>

      <div className="p-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          {cartCount > 0 && (
            <button
              onClick={() => dispatch(clearCart())}
              className="text-sm font-semibold bg-slate-200 px-2 py-2 rounded-md text-slate-600 hover:bg-slate-300"
            >
              Clear Cart
            </button>
          )}
          <div className="flex items-center">
            <FaShoppingCart size={24} />
            <span className="ml-2">{cartCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
