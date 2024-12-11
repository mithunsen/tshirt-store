import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../store/slices/cartSlice";
import { RootState } from "../store/store";

const Header: React.FC = ({}) => {
  const cartCount = useSelector((state: RootState) => state.cart.items.length);
  const dispatch = useDispatch();

  return (
    <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">Product Store</h1>
      <div className="flex items-center gap-4">
        <button
          onClick={() => dispatch(clearCart())}
          className="bg-red-500 px-4 py-2 rounded hover:bg-red-700"
        >
          Clear Cart
        </button>
        <div className="flex items-center">
          <FaShoppingCart size={24} />
          <span className="ml-2">{cartCount}</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
