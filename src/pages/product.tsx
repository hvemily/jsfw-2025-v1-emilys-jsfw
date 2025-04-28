import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product } from "../types/product";

function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await fetch(`https://v2.api.noroff.dev/online-shop/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch product");
        }
        const data = await response.json();
        setProduct(data.data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Something went wrong");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!product) return <p>Product not found</p>;

  return (
    <div className="p-4">
      <img
        src={product.image.url}
        alt={product.image.alt}
        className="w-full max-w-md mx-auto mb-4"
      />
      <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
      <p className="mb-4">{product.description}</p>
      <p className="text-xl font-bold">
        ${product.discountedPrice.toFixed(2)}
      </p>
      <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Add to Cart
      </button>
    </div>
  );
}

export default ProductPage;
