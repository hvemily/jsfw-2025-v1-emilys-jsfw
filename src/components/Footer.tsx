export default function Footer() {
  return (
    <footer className="bg-black text-white py-10 mt-16">
      <div className="max-w-screen-xl mx-auto px-4 flex flex-col md:flex-row justify-between gap-8">
        {/* Brand */}
        <div>
          <h3 className="text-2xl font-bold mb-2 tracking-wide">Marqet Co.</h3>
          <p className="text-sm text-gray-400">
            Timeless products. Designed for everyday elegance.
          </p>
        </div>

        {/* Links */}
        <div className="flex gap-12 text-sm">
          <div>
            <h4 className="font-semibold mb-2 text-white">Shop</h4>
            <ul className="space-y-1 text-gray-400">
              <li><a href="#popular" className="hover:underline">Popular</a></li>
              <li><a href="#sale" className="hover:underline">On Sale</a></li>
              <li><a href="#new" className="hover:underline">New Arrivals</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2 text-white">Support</h4>
            <ul className="space-y-1 text-gray-400">
              <li><a href="/contact" className="hover:underline">Contact Us</a></li>
              <li><a href="#" className="hover:underline">Returns</a></li>
              <li><a href="#" className="hover:underline">Privacy</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-10 text-center text-xs text-gray-500">
        &copy; {new Date().getFullYear()} Marqet Co. All rights reserved.
      </div>
    </footer>
  );
}
