import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../store/slices/cartSlice";
import { filterProducts } from "../store/slices/productsSlice";
import { AppDispatch, RootState } from "../store/store";
import SearchBar from "./SearchBar";

const Header: React.FC = () => {
  const cartCount = useSelector((state: RootState) => state.cart.items.length);
  const dispatch = useDispatch<AppDispatch>();

  const handleSearch = (searchTxt: string) => {
    console.log("searchTxt", searchTxt);
    dispatch(filterProducts({ search: searchTxt }));
  };

  return (
    <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 mt-4">
      <h1 className="text-4xl font-bold tracking-tight text-gray-900">
        T-Shirt Store
      </h1>

      <SearchBar onSearch={handleSearch} />
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
