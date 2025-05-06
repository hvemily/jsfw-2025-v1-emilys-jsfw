import { useCartStore } from "../features/cart/cartStore";
import { Product } from "../types/Product";

interface Props {
  product: Product;
}

export default function AddToCartButton({ product }: Props) {
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <button
      onClick={() => addToCart(product)}
      className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
    >
      Add to cart
    </button>
  );
}
