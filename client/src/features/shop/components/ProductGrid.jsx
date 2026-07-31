
import ProductCard from "./ProductCard";

const ProductGrid = ({ products }) => {
  if (!products.length) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white px-6 py-20 text-center">
        <h3 className="text-xl font-semibold text-gray-900">
          No products found
        </h3>

        <p className="mt-2 text-sm text-gray-500">
          Try changing your search or category filter.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard
          key={product._id}
          product={product}
        />
      ))}
    </div>
  );
};

export default ProductGrid;
