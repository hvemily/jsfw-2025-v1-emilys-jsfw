import { useProducts } from "../features/products/useProduct";
import ProductCard from "../components/ProductCard";

function Home() {
  const { products, loading, error } = useProducts();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const discounted = products.filter((p) => p.discountedPrice < p.price);
  const popular = products.filter((p) => p.rating >= 4);
  const latest = products.slice(-4); // De 4 siste

  return (
    <div className="p-4 space-y-8">
      <section>
        <h2 className="text-2xl font-bold mb-6">🔥 Popular Products</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {popular.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">💸 On Sale</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {discounted.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">🆕 New Arrivals</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {latest.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
