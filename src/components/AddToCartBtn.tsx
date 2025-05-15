import { useState } from "react";
import { useCartStore } from "../features/cart/cartStore";
import { Product } from "../types/products";
import { useToast } from "../components/Toast";

interface Props {
  product: Product;
}

export default function AddToCartButton({ product }: Props) {
  const [quantity, setQuantity] = useState(1);
  const addToCart = useCartStore((state) => state.addToCart);
  const { addToast } = useToast();

  function handleAdd() {
    addToCart(product, quantity);
    addToast(`${product.title} added to cart (${quantity}) 🛒`);
  }

  return (
    <div className="flex gap-2 items-center mt-4">
      <input
        type="number"
        min={1}
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
        className="w-16 px-2 py-1 border rounded"
      />
      <button
        onClick={handleAdd}
        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
      >
        Add to cart
      </button>
    </div>
  );
}
