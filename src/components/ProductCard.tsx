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

  return (
    <Link to={`/product/${product.id}`} className="block border rounded-lg overflow-hidden shadow hover:shadow-lg transition bg-white">
      <img
        src={product.image.url}
        alt={product.image.alt}
        className="w-full h-48 object-cover"
      />

      <div className="p-4">
        <h2 className="text-lg font-semibold mb-1">{product.title}</h2>

        <div className="text-sm text-gray-600 mb-2">{product.description}</div>

        <div className="flex items-center gap-2 mb-2">
          {hasDiscount ? (
            <>
              <span className="text-red-600 font-bold">
                ${product.discountedPrice.toFixed(2)}
              </span>
              <span className="line-through text-gray-500 text-sm">
                ${product.price.toFixed(2)}
              </span>
              <span className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded">
                -{discountPercentage}%
              </span>
            </>
          ) : (
            <span className="font-bold">${product.price.toFixed(2)}</span>
          )}
        </div>

        <div className="text-yellow-500 text-sm">⭐ {product.rating}/5</div>
      </div>
    </Link>
  );
}

export default ProductCard;
