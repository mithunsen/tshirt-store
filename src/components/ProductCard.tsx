import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, decreaseItemQuantity } from "../store/slices/cartSlice";
import { RootState } from "../store/store";
import { IProduct } from "../types/Product";
import AddToCartButton from "./AddToCartButton";

const ProductCard: React.FC<IProduct> = ({
  id,
  name,
  price,
  imageURL,
  quantity: stock,
}) => {
  const dispatch = useDispatch();
  // Get the quantity of this product from the cart
  const cartItem = useSelector((state: RootState) =>
    state.cart.items.find((item) => item.id === id)
  );
  const quantityAdded = cartItem ? cartItem.quantity : 0;
  const isOutOfStock = stock <= quantityAdded;

  return (
    <div className="border rounded-lg p-4 shadow-md">
      <img
        src={imageURL}
        alt={name}
        className="w-full h-48 object-cover rounded-md"
      />
      <h2 className="text-lg font-semibold mt-2">{name}</h2>

      <div className="flex-auto flex justify-between items-center mt-4">
        <div className="text-left">
          <p className="text-gray-600">Rs {price}</p>
          {!isOutOfStock ? (
            <p className="text-green-600">(In Stock)</p>
          ) : (
            <p className="text-red-600">(Out of Stock)</p>
          )}
        </div>

        <AddToCartButton
          quantity={quantityAdded}
          stock={stock}
          onIncreaseQuantity={() => {
            dispatch(addToCart({ id, name, price, stock: stock }));
          }}
          onDecreaseQuantity={() => {
            dispatch(
              decreaseItemQuantity({
                id,
                name,
                price,
                stock: stock,
              })
            );
          }}
        />
      </div>
    </div>
  );
};

export default ProductCard;
