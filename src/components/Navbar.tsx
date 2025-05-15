import { Link } from "react-router-dom";
import { useCartStore } from "../features/cart/cartStore";
import { useState } from "react";
import logo from "../assets/m.png";

export default function Navbar() {
  const cart = useCartStore((state) => state.cart);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const [menuOpen, setMenuOpen] = useState(false);

  function toggleMenu() {
    setMenuOpen((prev) => !prev);
  }

  return (
    <nav className="bg-white shadow-sm px-6 py-3 sticky top-0 z-50">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <img
            src={logo}
            alt="Marqet Co. logo"
            className="max-h-12 object-contain"
          />
          <span className="text-xl font-bold text-gray-800 hidden sm:inline">Marqet Co.</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 text-gray-700 text-sm font-medium">
          <Link to="/" className="hover:text-black transition">Home</Link>
          <Link to="/contact" className="hover:text-black transition">Contact</Link>
          <div className="relative">
            <Link to="/cart" className="hover:text-black text-lg transition">🛒</Link>
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">
                {totalItems}
              </span>
            )}
          </div>
        </div>

        {/* Burger Menu */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-2xl text-gray-800 focus:outline-none">
            ☰
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden mt-2 bg-white border-t shadow-sm">
          <div className="flex flex-col items-start gap-4 px-6 py-4 text-gray-700 text-sm font-medium">
            <Link to="/" onClick={() => setMenuOpen(false)} className="hover:text-black transition">Home</Link>
            <Link to="/contact" onClick={() => setMenuOpen(false)} className="hover:text-black transition">Contact</Link>
            <div className="relative">
              <Link to="/cart" onClick={() => setMenuOpen(false)} className="hover:text-black transition">🛒 Cart</Link>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-3 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">
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
