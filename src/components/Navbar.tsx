import { Link } from "react-router-dom";
import { useCartStore } from "../features/cart/cartStore";
import { useState } from "react";

export default function Navbar() {
  const cart = useCartStore((state) => state.cart);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const [menuOpen, setMenuOpen] = useState(false);

  function toggleMenu() {
    setMenuOpen((prev) => !prev);
  }

  return (
<nav className="bg-white p-4 shadow-md sticky top-0 z-50">
  <div className="max-w-1xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-semibold tracking-wide text-gray-800">
          ✴ Marqet Co.
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6 text-gray-700 text-md">
          <Link to="/" className="hover:text-black transition">Home</Link>
          <Link to="/contact" className="hover:text-black transition">Contact</Link>

          <div className="relative">
            <Link to="/cart" className="hover:text-black text-lg">🛒</Link>
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                {totalItems}
              </span>
            )}
          </div>
        </div>

        {/* Burger Menu */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-2xl focus:outline-none">
            ☰
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden mt-2 bg-white border-t">
          <div className="flex flex-col items-start gap-4 px-6 py-4 text-gray-700 text-md">
            <Link to="/" onClick={() => setMenuOpen(false)} className="hover:text-black transition">Home</Link>
            <Link to="/contact" onClick={() => setMenuOpen(false)} className="hover:text-black transition">Contact</Link>
            <div className="relative">
              <Link to="/cart" onClick={() => setMenuOpen(false)} className="hover:text-black text-lg">🛒 Cart</Link>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                  {totalItems}
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
