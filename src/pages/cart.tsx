import { useCartStore } from "../features/cart/cartStore";
import { Link } from "react-router-dom";

export default function Cart() {
  const {
    items,
    totalItems,
    totalPrice,
    increaseQty,
    decreaseQty,
    removeFromCart,
    clearCart,
  } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl font-semibold mb-4">Your cart is empty 🛒</h2>
        <Link to="/" className="text-blue-500 underline">← Back to products</Link>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>

      <ul className="space-y-4">
        {items.map((item) => (
          <li key={item.id} className="border rounded p-4 flex justify-between items-center">
            <div>
              <p className="font-semibold">{item.title}</p>
              <p className="text-sm text-gray-600">{item.price} kr</p>
              <div className="flex items-center space-x-2 mt-2">
                <button onClick={() => decreaseQty(item.id)} className="px-2 bg-gray-200 rounded">-</button>
                <span>{item.quantity}</span>
                <button onClick={() => increaseQty(item.id)} className="px-2 bg-gray-200 rounded">+</button>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <p>{item.price * item.quantity} kr</p>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 text-sm mt-2"
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-6 border-t pt-4">
        <p className="text-lg font-semibold">Total: {totalPrice} kr</p>
        <p className="text-sm text-gray-600">Items: {totalItems}</p>
        <button
          onClick={clearCart}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
        >
          Clear Cart
        </button>
      </div>
    </div>
  );
}
