import { useEffect, useMemo, useRef, useState } from "react";
import { useProducts } from "../features/products/useProducts";
import ProductCard from "../components/ProductCard";
import { useToast } from "../components/Toast";
import type { Product } from "../types/products"; // ✅ same Product used by ProductCard

type SortOption =
  | ""
  | "price-low"
  | "price-high"
  | "name-asc"
  | "rating-high"
  | "discount-high";

/** Safely read a creation timestamp (supports `created` or `createdAt`). */
function createdTime(p: Product): number {
  const maybe = p as unknown as { created?: string; createdAt?: string };
  const iso = maybe.created ?? maybe.createdAt;
  return iso ? Date.parse(iso) : Number.NEGATIVE_INFINITY;
}

function Home() {
  const { products, loading, error } = useProducts() as {
    products: Product[];
    loading: boolean;
    error: string | null;
  };

  // UI state
  const [searchTerm, setSearchTerm] = useState("");
  const [debounced, setDebounced] = useState("");
  const [sortOption, setSortOption] = useState<SortOption>("");
  const [selectedTag, setSelectedTag] = useState<string>("");
  const [compact, setCompact] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const { addToast } = useToast();
  const hasShownToast = useRef(false);
  const searchBoxRef = useRef<HTMLDivElement | null>(null);

  // Debounce the search term for better UX
  useEffect(() => {
    const t = setTimeout(() => setDebounced(searchTerm.trim()), 300);
    return () => clearTimeout(t);
  }, [searchTerm]);

  // Build a tag cloud (if tags are present on products)
  const topTags = useMemo(() => {
    const freq = new Map<string, number>();
    for (const p of products) {
      p.tags?.forEach((tag) => {
        const key = tag.trim().toLowerCase();
        if (key) freq.set(key, (freq.get(key) || 0) + 1);
      });
    }
    return [...freq.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([tag]) => tag);
  }, [products]);

  // Filter by search + tag
  const filteredProducts = useMemo(() => {
    const term = debounced.toLowerCase();
    return products.filter((p) => {
      const matchesTerm = term ? p.title.toLowerCase().includes(term) : true;
      // ✅ safe tag match (no optional-chaining on an array method)
      const matchesTag = selectedTag
        ? (p.tags?.some((t) => t.toLowerCase() === selectedTag) ?? false)
        : true;
      return matchesTerm && matchesTag;
    });
  }, [products, debounced, selectedTag]);

  // No results toast
  useEffect(() => {
    const t = setTimeout(() => {
      if (debounced && filteredProducts.length === 0 && !hasShownToast.current) {
        addToast("No products found 😞");
        hasShownToast.current = true;
      }
      if (filteredProducts.length > 0) hasShownToast.current = false;
    }, 150);
    return () => clearTimeout(t);
  }, [debounced, filteredProducts.length, addToast]);

  // Sorting
  const sortedProducts = useMemo(() => {
    const arr = [...filteredProducts];
    switch (sortOption) {
      case "price-low":
        arr.sort((a, b) => a.discountedPrice - b.discountedPrice);
        break;
      case "price-high":
        arr.sort((a, b) => b.discountedPrice - a.discountedPrice);
        break;
      case "name-asc":
        arr.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "rating-high":
        arr.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
        break;
      case "discount-high":
        arr.sort(
          (a, b) =>
            (b.price - b.discountedPrice) / Math.max(1, b.price) -
            (a.price - a.discountedPrice) / Math.max(1, a.price),
        );
        break;
      default:
        break;
    }
    return arr;
  }, [filteredProducts, sortOption]);

  // Sections
  const popular = useMemo(
    () => sortedProducts.filter((p) => (p.rating ?? 0) >= 4),
    [sortedProducts],
  );
  const discounted = useMemo(
    () => sortedProducts.filter((p) => p.discountedPrice < p.price),
    [sortedProducts],
  );
  const latest = useMemo(
    () => [...sortedProducts].sort((a, b) => createdTime(b) - createdTime(a)).slice(0, 4),
    [sortedProducts],
  );

  // Suggestion list (look-ahead)
  const suggestions = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return [];
    return products.filter((p) => p.title.toLowerCase().includes(term)).slice(0, 8);
  }, [products, searchTerm]);

  // Close suggestions on outside click
  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!searchBoxRef.current) return;
      if (!searchBoxRef.current.contains(e.target as Node)) setShowSuggestions(false);
    }
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  // Loading skeleton
  if (loading) {
    return (
      <div className="bg-neutral-100 min-h-screen">
        <section className="text-center py-20 bg-gradient-to-b from-black to-neutral-800 text-white">
          <div className="max-w-screen-xl mx-auto px-4">
            <div className="h-8 w-72 mx-auto bg-white/10 rounded animate-pulse" />
            <div className="mt-4 h-4 w-96 mx-auto bg-white/10 rounded animate-pulse" />
          </div>
        </section>
        <div className="max-w-screen-xl mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="rounded-2xl border border-neutral-200 bg-white shadow-sm overflow-hidden">
              <div className="aspect-[4/3] bg-neutral-200 animate-pulse" />
              <div className="p-4 space-y-3">
                <div className="h-4 w-2/3 bg-neutral-200 animate-pulse rounded" />
                <div className="h-3 w-1/2 bg-neutral-200 animate-pulse rounded" />
                <div className="h-9 w-full bg-neutral-200 animate-pulse rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) return <p className="p-6 text-center text-red-500">Error: {error}</p>;

  return (
    <div className="bg-neutral-100 min-h-screen text-black">
      {/* Hero */}
      <section className="text-center py-20 bg-gradient-to-b from-black to-neutral-800 text-white">
        <h1 className="text-5xl font-extrabold mb-4 tracking-tight">Welcome to Marqet Co.</h1>
        <p className="text-lg text-neutral-300 mb-6">
          Curated style. Timeless deals. Delivered with taste.
        </p>
        <a
          href="#popular"
          className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-lg hover:bg-neutral-100 transition"
        >
          Browse Collections <span aria-hidden>→</span>
        </a>
      </section>

      <div className="max-w-screen-xl mx-auto px-4 py-10">
        {/* Search / Sort / Density */}
        <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4 mb-8">
          {/* Search with suggestions */}
          <div ref={searchBoxRef} className="relative md:w-1/2">
            <label htmlFor="search" className="sr-only">
              Search products
            </label>
            <input
              id="search"
              type="text"
              placeholder="Search products…"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && suggestions[0]) {
                  setSearchTerm(suggestions[0].title);
                  setShowSuggestions(false);
                }
              }}
              className="border border-gray-300 px-4 py-2 rounded w-full outline-none focus:ring-2 focus:ring-black bg-white"
              autoComplete="off"
              aria-autocomplete="list"
              aria-expanded={showSuggestions && suggestions.length > 0}
              aria-controls="search-suggestions"
            />
            {showSuggestions && suggestions.length > 0 && (
              <ul
                id="search-suggestions"
                role="listbox"
                className="absolute z-10 mt-1 w-full rounded-lg border border-neutral-200 bg-white shadow"
              >
                {suggestions.map((s) => (
                  <li
                    key={s.id}
                    role="option"
                    onMouseDown={() => {
                      setSearchTerm(s.title);
                      setShowSuggestions(false);
                    }}
                    className="px-3 py-2 hover:bg-neutral-50 cursor-pointer text-sm"
                  >
                    {highlightMatch(s.title, searchTerm)}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Sort & density */}
          <div className="flex gap-3 w-full md:w-auto">
            <select
              value={sortOption}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                setSortOption(e.target.value as SortOption)
              }
              className="border border-gray-300 px-4 py-2 rounded w-full md:w-56 bg-white"
              aria-label="Sort products"
            >
              <option value="">Sort by</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name-asc">Name: A–Z</option>
              <option value="rating-high">Rating: High first</option>
              <option value="discount-high">Biggest discount</option>
            </select>
            <button
              type="button"
              onClick={() => setCompact((v) => !v)}
              className="rounded border border-gray-300 bg-white px-4 py-2 text-sm hover:bg-neutral-50"
              aria-pressed={compact}
              aria-label="Toggle compact grid"
              title="Toggle compact grid"
            >
              {compact ? "Comfortable" : "Compact"}
            </button>
          </div>
        </div>

        {/* Tag chips */}
        {topTags.length > 0 && (
          <div className="mb-8 flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedTag("")}
              className={`px-3 py-1 rounded-full border text-sm ${
                !selectedTag
                  ? "bg-black text-white border-black"
                  : "bg-white border-neutral-300 hover:bg-neutral-50"
              }`}
            >
              All
            </button>
            {topTags.map((t) => (
              <button
                key={t}
                onClick={() => setSelectedTag(t)}
                className={`px-3 py-1 rounded-full border text-sm capitalize ${
                  selectedTag === t
                    ? "bg-black text-white border-black"
                    : "bg-white border-neutral-300 hover:bg-neutral-50"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        )}

        {/* Sections */}
        <Section
          id="popular"
          title="🔥 Popular Products"
          emptyHint="No popular products match your filters."
          compact={compact}
          products={popular}
        />
        <Section
          id="sale"
          title="💸 On Sale"
          emptyHint="No discounted products match your filters."
          compact={compact}
          products={discounted}
        />
        <Section
          id="new"
          title="🆕 New Arrivals"
          emptyHint="No new arrivals match your filters."
          compact={compact}
          products={latest}
        />
      </div>
    </div>
  );
}

function Section({
  id,
  title,
  products,
  emptyHint,
  compact,
}: {
  id: string;
  title: string;
  products: Product[];
  emptyHint: string;
  compact: boolean;
}) {
  return (
    <section id={id} className="mb-14">
      <div className="mb-6 flex items-end justify-between">
        <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
        <span className="text-sm text-neutral-500">{products.length} items</span>
      </div>

      {products.length > 0 ? (
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 ${
            compact ? "gap-4" : "gap-8"
          }`}
          role="list"
          aria-label={title}
        >
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <EmptyState hint={emptyHint} />
      )}
    </section>
  );
}

function EmptyState({ hint }: { hint: string }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-neutral-200 bg-white p-10 text-center">
      <div className="mb-3 text-3xl">🔍</div>
      <p className="text-neutral-800 font-medium">No results</p>
      <p className="text-neutral-500 text-sm mt-1">{hint}</p>
      <ul className="text-neutral-500 text-xs mt-3 space-y-1">
        <li>• Try a different search term</li>
        <li>• Clear filters</li>
        <li>• Sort differently</li>
      </ul>
    </div>
  );
}

// Highlights the matched part of a suggestion
function highlightMatch(text: string, query: string) {
  const q = query.trim();
  if (!q) return text;
  const i = text.toLowerCase().indexOf(q.toLowerCase());
  if (i === -1) return text;
  const before = text.slice(0, i);
  const match = text.slice(i, i + q.length);
  const after = text.slice(i + q.length);
  return (
    <>
      {before}
      <mark className="bg-yellow-200">{match}</mark>
      {after}
    </>
  );
}

export default Home;
