import { Link } from "react-router-dom";
import { Product } from "../types/products";

interface Props {
  product: Product;
}

function ProductCard({ product }: Props) {
  const hasDiscount = product.discountedPrice < product.price;
  const discountPercentage = Math.round(
    100 - (product.discountedPrice / product.price) * 100
  );
  const ratingLabel = `${(product.rating ?? 0).toFixed(1)} out of 5`;

  const formatPrice = (n: number) => `$${n.toFixed(2)}`;

  return (
    <Link
      to={`/product/${product.id}`}
      className="group block rounded-2xl border border-neutral-200 bg-white shadow-sm hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-black/80 transition"
      aria-label={`View details for ${product.title}`}
    >
      {/* Media */}
      <div className="relative overflow-hidden rounded-t-2xl">
        <div className="aspect-[4/3] w-full bg-neutral-100">
          <img
            src={product.image.url}
            alt={product.image.alt || product.title}
            className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
            loading="lazy"
          />
        </div>

        {/* Discount badge */}
        {hasDiscount && (
          <span className="absolute left-3 top-3 rounded-full bg-red-600 px-2 py-1 text-xs font-semibold text-white shadow">
            -{discountPercentage}%
          </span>
        )}

        {/* Rating pill */}
        <span
          className="absolute right-3 top-3 rounded-full bg-black/70 px-2 py-1 text-xs font-medium text-white backdrop-blur-sm"
          aria-label={`Rating ${ratingLabel}`}
          title={ratingLabel}
        >
          ⭐ {(product.rating ?? 0).toFixed(1)}
        </span>
      </div>

      {/* Body */}
      <div className="p-4">
        <h2 className="mb-1 line-clamp-2 text-base font-semibold leading-snug">
          {product.title}
        </h2>

        <p className="mb-3 text-sm text-neutral-600 line-clamp-2">
          {product.description}
        </p>

        {/* Price block */}
        <div className="flex flex-wrap items-center gap-2">
          {hasDiscount ? (
            <>
              <span className="text-lg font-bold text-red-600">
                {formatPrice(product.discountedPrice)}
              </span>
              <span className="text-sm text-neutral-500 line-through">
                {formatPrice(product.price)}
              </span>
              <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-700">
                Save {discountPercentage}%
              </span>
            </>
          ) : (
            <span className="text-lg font-semibold">
              {formatPrice(product.price)}
            </span>
          )}
        </div>

        {/* CTA hint */}
        <div className="mt-3 flex items-center gap-1 text-sm text-neutral-700">
          <span className="transition-transform group-hover:translate-x-0.5">
            View details
          </span>
          <span aria-hidden>→</span>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
