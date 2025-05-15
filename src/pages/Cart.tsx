import { useCartStore, getTotalItems, getTotalPrice } from "../features/cart/cartStore";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "../components/Toast";

export default function Cart() {
  const cart = useCartStore((state) => state.cart);
  const increaseQty = useCartStore((state) => state.increaseQty);
  const decreaseQty = useCartStore((state) => state.decreaseQty);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const clearCart = useCartStore((state) => state.clearCart);
  const navigate = useNavigate();
  const { addToast } = useToast();

  const totalItems = getTotalItems(cart);
  const totalPrice = getTotalPrice(cart);

  if (cart.length === 0) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-2xl font-semibold mb-4 text-black">Your cart is empty 🛒</h2>
        <Link to="/" className="text-black underline">← Back to products</Link>
      </div>
    );
  }

  return (
    <div className="max-w-screen-md mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8 text-black">Shopping Cart</h1>

      <ul className="space-y-6">
        {cart.map((item) => (
          <li
            key={item.id}
            className="border rounded p-4 flex gap-4 items-center shadow-sm"
          >
            {item.image?.url && (
              <img
                src={item.image.url}
                alt={item.image.alt || item.title}
                className="w-24 h-24 object-cover rounded"
              />
            )}

            <div className="flex flex-col flex-grow gap-2">
              <p className="font-semibold text-black">{item.title}</p>
              <p className="text-sm text-gray-600">
                {item.discountedPrice < item.price ? (
                  <>
                    <span className="font-semibold text-black">{item.discountedPrice.toFixed(2)} kr</span>
                    <span className="line-through text-gray-400 ml-2">{item.price.toFixed(2)} kr</span>
                    <span className="ml-2 text-xs bg-black text-white px-1.5 py-0.5 rounded">
                      -{Math.round(((item.price - item.discountedPrice) / item.price) * 100)}%
                    </span>
                  </>
                ) : (
                  <span className="font-semibold text-black">{item.price.toFixed(2)} kr</span>
                )}
              </p>



              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    decreaseQty(item.id);
                    addToast(`Reduced quantity of ${item.title} 🔽`);
                  }}
                  className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => {
                    increaseQty(item.id);
                    addToast(`Increased quantity of ${item.title} 🔼`);
                  }}
                  className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex flex-col items-end justify-between h-full">
              <p className="font-semibold text-black">
                {(
                  (item.discountedPrice < item.price ? item.discountedPrice : item.price) *
                  item.quantity
                ).toFixed(2)} kr
              </p>

              <button
                onClick={() => {
                  removeFromCart(item.id);
                  addToast(`${item.title} removed from cart 🗑️`);
                }}
                className="text-red-500 text-sm hover:underline"
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-10 border-t pt-6 space-y-2">
        <p className="text-xl font-semibold text-black">Total: {totalPrice.toFixed(2)} kr</p>
        <p className="text-sm text-gray-600">Items: {totalItems}</p>

        <div className="flex gap-4 mt-4">
          <button
            onClick={() => {
              clearCart();
              addToast("Cart cleared 🧹");
            }}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Clear Cart
          </button>
          <button
            onClick={() => navigate("/checkout")}
            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
