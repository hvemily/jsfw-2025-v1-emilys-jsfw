import { useEffect, useState } from "react";
import { doFetch } from "../../utils/doFetch";
import { API_BASE } from "../../constants/api";
import { Product } from "../../types/products";

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Sett loading til true i starten

      try {
        const data = await doFetch<Product[]>(API_BASE);
        setProducts(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false); // Alltid kjør dette til slutt
      }
    };

    fetchData();
  }, []);

  return { products, loading, error };
}
