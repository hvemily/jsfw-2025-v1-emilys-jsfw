import { useEffect, useRef } from "react";
import { useCartStore } from "../features/cart/cartStore";
import { useToast } from "../components/Toast";
import { Link } from "react-router-dom";

export default function Checkout() {
  const clearCart = useCartStore((state) => state.clearCart);
  const { addToast } = useToast();
  const hasCleared = useRef(false);

  useEffect(() => {
    if (!hasCleared.current) {
      clearCart();
      addToast("Checkout complete! 🎉");
      hasCleared.current = true;
    }
  }, [clearCart, addToast]);

  return (
    <div className="max-w-screen-sm mx-auto px-4 py-20 text-center">
      <div className="text-green-600 text-6xl mb-6">✓</div>
      <h1 className="text-3xl font-bold mb-2 text-black">Thank you for your purchase!</h1>
      <p className="text-gray-600 mb-6">Your order has been placed successfully.</p>
      <Link
        to="/"
        className="inline-block bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition"
      >
        Back to Home
      </Link>
    </div>
  );
}
