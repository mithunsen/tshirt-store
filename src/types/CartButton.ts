export interface AddToCartButtonProps {
  quantity: number;
  stock: number;
  onIncreaseQuantity: () => void;
  onDecreaseQuantity: () => void;
}
