import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Product } from "../types/products";
import { API_BASE } from "../constants/api";
import AddToCartButton from "../components/AddToCartBtn";

function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await fetch(`${API_BASE}/${id}`);
        if (!response.ok) throw new Error("Failed to fetch product");
        const data = await response.json();
        setProduct(data.data);
      } catch (err: unknown) {
        if (err instanceof Error) setError(err.message);
        else setError("Something went wrong");
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchProduct();
  }, [id]);

  if (loading) return <p className="p-6 text-center">Loading...</p>;
  if (error) return <p className="p-6 text-center text-red-500">Error: {error}</p>;
  if (!product) return <p className="p-6 text-center">Product not found</p>;

  const isDiscounted = product.discountedPrice < product.price;
  const discount = Math.round(
    ((product.price - product.discountedPrice) / product.price) * 100
  );

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-12 text-black">
      <Link to="/" className="text-sm text-gray-500 hover:underline mb-6 inline-block">
        ← Back to products
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Product image */}
        <div>
        <img
          src={product.image.url}
          alt={product.image.alt}
          className="w-full max-w-md h-auto mx-auto md:mx-0 rounded shadow"
        />
        </div>

        {/* Product info */}
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold">{product.title}</h1>

          <p className="text-gray-600">{product.description}</p>

          <div className="flex items-center gap-4 text-lg font-semibold mt-2">
            {isDiscounted ? (
              <>
                <span className="text-red-600 text-2xl">{product.discountedPrice.toFixed(2)} kr</span>
                <span className="line-through text-gray-400">{product.price.toFixed(2)} kr</span>
                <span className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded">
                  -{discount}%
                </span>
              </>
            ) : (
              <span className="text-2xl">{product.price.toFixed(2)} kr</span>
            )}
          </div>

          <p className="text-yellow-500 text-sm">⭐ {product.rating}/5</p>

          <AddToCartButton product={product} />
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
