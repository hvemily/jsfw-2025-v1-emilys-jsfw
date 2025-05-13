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
        if (!response.ok) {
          throw new Error("Failed to fetch product");
        }
        const data = await response.json();
        setProduct(data.data); // Noroff API returnerer data inni .data
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
  
    if (id) fetchProduct();
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
        {product.discountedPrice.toFixed(2)} kr
      </p>
      <AddToCartButton product={product} />
    </div>
  );
}

export default ProductPage;
