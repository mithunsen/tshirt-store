import React from "react";
import { AddToCartButtonProps } from "../types/CartButton";

const AddToCartButton: React.FC<AddToCartButtonProps> = ({
  quantity,
  stock,
  onDecreaseQuantity,
  onIncreaseQuantity,
}) => {
  const isOutOfStock = stock <= quantity;

  return (
    <div>
      {quantity > 0 ? (
        <div className="flex items-center border rounded-md w-24">
          <button
            className="px-3 py-2 bg-blue-500 text-white rounded-l-md hover:bg-blue-700"
            onClick={onDecreaseQuantity}
          >
            -
          </button>
          <span className="px-3 py-2 bg-blue-500 text-white w-full">
            {quantity}
          </span>
          <button
            className="px-3 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-700"
            disabled={isOutOfStock}
            onClick={onIncreaseQuantity}
          >
            +
          </button>
        </div>
      ) : (
        <button
          onClick={onIncreaseQuantity}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add to Cart
        </button>
      )}
    </div>
  );
};

export default AddToCartButton;
