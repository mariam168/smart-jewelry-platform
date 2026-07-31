
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const isOutOfStock = product.stock <= 0;

  return (
    <article className="group overflow-hidden rounded-2xl border border-gray-200 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <Link to={`/shop/products/${product._id}`}>
        <div className="relative flex aspect-square items-center justify-center overflow-hidden bg-gray-100">
          <div className="text-center text-sm text-gray-400">
            Product Image
          </div>

          {isOutOfStock && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40">
              <span className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-gray-900">
                Out of Stock
              </span>
            </div>
          )}
        </div>
      </Link>

      <div className="p-5">
        <div className="mb-2 flex items-center justify-between gap-4">
          <span className="text-xs font-medium uppercase tracking-wider text-gray-500">
            {product.category}
          </span>

          <span
            className={`text-xs font-medium ${
              product.status === "active"
                ? "text-green-600"
                : "text-gray-400"
            }`}
          >
            {product.status}
          </span>
        </div>

        <Link to={`/shop/products/${product._id}`}>
          <h3 className="text-lg font-semibold text-gray-900 transition group-hover:text-gray-600">
            {product.name}
          </h3>
        </Link>

        <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-500">
          {product.description}
        </p>

        <div className="mt-5 flex items-center justify-between">
          <span className="text-lg font-bold text-gray-900">
            ${product.price}
          </span>

          <span className="text-sm text-gray-500">
            {product.stock > 0
              ? `${product.stock} available`
              : "Unavailable"}
          </span>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
