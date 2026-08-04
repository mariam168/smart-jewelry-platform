import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {

  const isOutOfStock =
    product.stock <= 0;

  const imageUrl =
    product.image
      ? `http://localhost:5000${product.image}`
      : "/placeholder.png";

  return (

    <article className="group overflow-hidden rounded-2xl border border-gray-200 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl">

      <Link to={`/shop/products/${product._id}`}>

        <div className="relative aspect-square overflow-hidden bg-gray-100">

          <img
            src={imageUrl}
            alt={product.name}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />

          {product.featured && (
            <span className="absolute left-3 top-3 rounded-lg bg-yellow-500 px-3 py-1 text-xs font-semibold text-white shadow">
              Featured
            </span>
          )}

          {product.bestSeller && (
            <span className="absolute right-3 top-3 rounded-lg bg-red-500 px-3 py-1 text-xs font-semibold text-white shadow">
              Best Seller
            </span>
          )}

          {product.newArrival && (
            <span className="absolute left-3 bottom-3 rounded-lg bg-green-600 px-3 py-1 text-xs font-semibold text-white shadow">
              New
            </span>
          )}

          {isOutOfStock && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
              <span className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-gray-900">
                Out Of Stock
              </span>
            </div>
          )}

        </div>

      </Link>

      <div className="p-5">

        <div className="mb-3 flex items-center justify-between">

          <span className="text-xs font-semibold uppercase tracking-widest text-gray-500">

            {product.category?.name}

          </span>

          <span
            className={`text-xs font-semibold ${
              product.status === "active"
                ? "text-green-600"
                : "text-red-500"
            }`}
          >

            {product.status}

          </span>

        </div>

        <Link to={`/shop/products/${product._id}`}>

          <h3 className="text-lg font-bold text-gray-900 transition group-hover:text-black">

            {product.name}

          </h3>

        </Link>

        {product.shortDescription ? (

          <p className="mt-3 line-clamp-2 text-sm leading-6 text-gray-500">

            {product.shortDescription}

          </p>

        ) : (

          <p className="mt-3 line-clamp-2 text-sm leading-6 text-gray-500">

            {product.description}

          </p>

        )}

        {product.isCustomizable && (

          <div className="mt-3">

            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">

              Customizable

            </span>

          </div>

        )}

        <div className="mt-6 flex items-center justify-between">

          <div>

            <div className="flex items-center gap-2">

              <span className="text-2xl font-bold text-gray-900">

                ${product.price}

              </span>

              {product.comparePrice > product.price && (

                <span className="text-sm text-gray-400 line-through">

                  ${product.comparePrice}

                </span>

              )}

            </div>

          </div>

          <div>

            {isOutOfStock ? (

              <span className="text-sm font-medium text-red-600">

                Out Of Stock

              </span>

            ) : (

              <span className="text-sm font-medium text-green-600">

                {product.stock} In Stock

              </span>

            )}

          </div>

        </div>

      </div>

    </article>

  );

};

export default ProductCard;