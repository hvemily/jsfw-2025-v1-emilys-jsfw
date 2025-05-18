import { useState, useEffect, useRef } from "react";
import { useProducts } from "../features/products/useProducts";
import ProductCard from "../components/ProductCard";
import { useToast } from "../components/Toast";

function Home() {
  const { products, loading, error } = useProducts();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("");
  const { addToast } = useToast();
  const hasShownToast = useRef(false);

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (searchTerm.trim() && filteredProducts.length === 0 && !hasShownToast.current) {
        addToast("No products found 😞");
        hasShownToast.current = true;
      }
      if (filteredProducts.length > 0) {
        hasShownToast.current = false;
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [searchTerm, filteredProducts.length, addToast]);

  if (loading) return <p className="p-6 text-center">Loading...</p>;
  if (error) return <p className="p-6 text-center text-red-500">Error: {error}</p>;

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortOption) {
      case "price-low":
        return a.discountedPrice - b.discountedPrice;
      case "price-high":
        return b.discountedPrice - a.discountedPrice;
      case "name-asc":
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  });

  const discounted = sortedProducts.filter((p) => p.discountedPrice < p.price);
  const popular = sortedProducts.filter((p) => p.rating >= 4);
  const latest = sortedProducts.slice(-4);

  return (
    <div className="bg-neutral-100 min-h-screen text-black">
      {/*  Hero section */}
      <section className="text-center py-20 bg-black text-white rounded-b-1xl">
        <h1 className="text-5xl font-extrabold mb-4 tracking-tight">Welcome to Marqet Co.</h1>
        <p className="text-lg text-gray-300 mb-6">
          Curated style. Timeless deals. Delivered with taste.
        </p>
        <a
          href="#popular"
          className="bg-white text-black px-6 py-3 rounded hover:bg-gray-200 transition"
        >
          Browse Collections
        </a>
      </section>

      {/* Search + sort */}
      <div className="max-w-screen-xl mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-10">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 px-4 py-2 rounded w-full md:w-1/2"
          />
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="border border-gray-300 px-4 py-2 rounded w-full md:w-60"
          >
            <option value="">Sort by</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="name-asc">Name: A–Z</option>
          </select>
        </div>

        {/* Popular */}
        <section id="popular" className="mb-16">
          <h2 className="text-3xl font-bold mb-6 tracking-tight">🔥 Popular Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
            {popular.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* On Sale */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 tracking-tight">💸 On Sale</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
            {discounted.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* New Arrivals */}
        <section>
          <h2 className="text-3xl font-bold mb-6 tracking-tight">🆕 New Arrivals</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
            {latest.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Home;
