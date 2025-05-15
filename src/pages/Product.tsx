import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
  const discountPercent = Math.round(
    ((product.price - product.discountedPrice) / product.price) * 100
  );

  return (
    <div className="max-w-screen-md mx-auto px-4 py-10">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Image */}
        {product.image?.url && (
          <img
            src={product.image.url}
            alt={product.image.alt}
            className="w-full h-auto object-cover rounded shadow"
          />
        )}

        {/* Product Info */}
        <div className="flex flex-col justify-between space-y-4">
          <div>
            <h1 className="text-3xl font-bold text-black">{product.title}</h1>
            <p className="text-gray-700 mt-2">{product.description}</p>
          </div>

          {/* Prices */}
          <div className="text-xl font-semibold text-black">
            {product.discountedPrice.toFixed(2)} kr
            {isDiscounted && (
              <>
                <span className="text-gray-400 text-base line-through ml-2">
                  {product.price.toFixed(2)} kr
                </span>
                <span className="ml-2 text-sm bg-black text-white px-2 py-0.5 rounded">
                  -{discountPercent}%
                </span>
              </>
            )}
          </div>

          {/* Rating */}
          {product.rating > 0 && (
            <p className="text-sm text-yellow-600">⭐ {product.rating}/5</p>
          )}

          <AddToCartButton product={product} />
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
