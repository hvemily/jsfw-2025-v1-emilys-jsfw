import { Link } from "react-router-dom";
import { useCartStore } from "../features/cart/cartStore";

export default function Navbar() {
  const totalItems = useCartStore((state) => state.totalItems);

  return (
    <nav className="bg-gray-100 p-4 flex justify-between items-center shadow-md">
      <Link to="/" className="text-xl font-bold text-gray-800">
        🏬 E-Store
      </Link>

      <Link to="/cart" className="relative text-gray-700 hover:text-black">
        🛒 Cart
        {totalItems > 0 && (
          <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
            {totalItems}
          </span>
        )}
      </Link>
    </nav>
  );
}
