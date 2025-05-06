import { useEffect, useState } from "react";
import { doFetch } from "../../utils/doFetch";
import { API_BASE } from "../../constants/api";
import { Product } from "../../types/Product";

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await doFetch<Product[]>(API_BASE);
        setProducts(data);
      } catch (err: any) {
        setError(err.message || "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return { products, loading, error };
}
