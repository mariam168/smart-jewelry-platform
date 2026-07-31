
const ShopHeader = ({ productsCount }) => {
  return (
    <section className="border-b border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-16 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-gray-500">
          Smart Jewelry
        </p>

        <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
          Discover Your Jewelry
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-gray-500">
          Explore our collection of smart jewelry designed
          to combine elegance, technology, and meaningful
          connections.
        </p>

        <p className="mt-5 text-sm text-gray-400">
          {productsCount} products available
        </p>
      </div>
    </section>
  );
};

export default ShopHeader;
