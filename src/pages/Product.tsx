import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import type { Product } from "../types/products";
import { API_BASE } from "../constants/api";
import AddToCartButton from "../components/AddToCartBtn";

function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryKey, setRetryKey] = useState(0);

  useEffect(() => {
    if (!id) return;

    const ctrl = new AbortController();
    async function fetchProduct() {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`${API_BASE}/${id}`, { signal: ctrl.signal });
        if (!response.ok) throw new Error("Failed to fetch product");
        const data = await response.json();
        setProduct(data?.data ?? null);
      } catch (err) {
        if ((err as any)?.name === "AbortError") return;
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
    return () => ctrl.abort();
  }, [id, retryKey]);

  const formatPrice = (n: number) => `${n.toFixed(2)} kr`;

  // Loading state
  if (loading) {
    return (
      <div className="mx-auto max-w-screen-xl px-4 py-12">
        <div className="mb-6 h-4 w-40 rounded bg-neutral-200" />
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="aspect-[4/3] w-full rounded-2xl bg-neutral-200" />
          <div className="space-y-4">
            <div className="h-8 w-3/5 rounded bg-neutral-200" />
            <div className="h-4 w-full rounded bg-neutral-200" />
            <div className="h-4 w-4/5 rounded bg-neutral-200" />
            <div className="h-10 w-48 rounded bg-neutral-200" />
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="mx-auto max-w-screen-sm px-4 py-16 text-center">
        <p className="mb-4 text-red-600">Error: {error}</p>
        <button
          onClick={() => setRetryKey((k) => k + 1)}
          className="rounded-lg border border-neutral-300 bg-white px-4 py-2 text-sm font-medium hover:bg-neutral-50"
        >
          Try again
        </button>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="mx-auto max-w-screen-sm px-4 py-16 text-center">
        <p className="mb-2 text-neutral-700">Product not found.</p>
        <Link to="/" className="text-black underline">
          Back to products
        </Link>
      </div>
    );
  }

  const isDiscounted = product.discountedPrice < product.price;
  const discount = Math.round(
    ((product.price - product.discountedPrice) / Math.max(1, product.price)) * 100
  );
  const rating = product.rating ?? 0;
  const ratingLabel = `${rating.toFixed(1)} out of 5`;

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-12 text-black">
      <Link
        to="/"
        className="mb-6 inline-block text-sm text-neutral-600 hover:text-black hover:underline"
      >
        ← Back to products
      </Link>

      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        {/* Media */}
        <div className="relative">
          <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white">
            <div className="aspect-[4/3] w-full bg-neutral-100">
              <img
                src={product.image.url}
                alt={product.image.alt || product.title}
                className="h-full w-full object-cover"
                loading="eager"
              />
            </div>
          </div>

          {/* Badges */}
          {isDiscounted && (
            <span className="absolute left-3 top-3 rounded-full bg-red-600 px-3 py-1 text-xs font-semibold text-white shadow">
              Save {discount}%
            </span>
          )}
          <span
            className="absolute right-3 top-3 rounded-full bg-black/70 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm"
            title={ratingLabel}
            aria-label={`Rating ${ratingLabel}`}
          >
            ⭐ {rating.toFixed(1)}
          </span>
        </div>

        {/* Info */}
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold leading-tight">{product.title}</h1>

          <p className="text-neutral-700">{product.description}</p>

          <div className="mt-2 flex flex-wrap items-center gap-3">
            {isDiscounted ? (
              <>
                <span className="text-2xl font-bold text-red-600">
                  {formatPrice(product.discountedPrice)}
                </span>
                <span className="text-lg text-neutral-500 line-through">
                  {formatPrice(product.price)}
                </span>
                <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-700">
                  -{discount}%
                </span>
              </>
            ) : (
              <span className="text-2xl font-semibold">{formatPrice(product.price)}</span>
            )}
          </div>

          <div className="text-sm text-neutral-600">
            <span className="align-middle">Rated {rating.toFixed(1)} / 5</span>
          </div>

          <div className="mt-2">
            <AddToCartButton product={product} />
          </div>

          {/* Friendly details box */}
          <div className="mt-6 rounded-xl border border-neutral-200 bg-white p-4 text-sm text-neutral-700">
            <ul className="list-inside list-disc space-y-1">
              <li>Fast dispatch within 24h</li>
              <li>30-day returns</li>
              <li>Secure checkout</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
