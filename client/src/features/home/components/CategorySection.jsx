import { Link } from "react-router-dom";

const categories = [
  {
    id: "bracelets",
    name: "Bracelets",
    description: "Elegant pieces for every moment",
    image: "/images/categories/bracelets.jpg",
  },
  {
    id: "necklaces",
    name: "Necklaces",
    description: "Designed to stay close to you",
    image: "/images/categories/necklaces.jpg",
  },
  {
    id: "rings",
    name: "Rings",
    description: "Minimal details, meaningful stories",
    image: "/images/categories/rings.jpg",
  },
];

const CategorySection = () => {
  return (
    <section className="py-20">

      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        <div className="mb-10 flex items-end justify-between">

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">
              Explore
            </p>

            <h2 className="mt-2 text-3xl font-semibold text-gray-900">
              Find your perfect piece
            </h2>
          </div>

          <Link
            to="/shop"
            className="hidden text-sm font-medium text-gray-900 underline sm:block"
          >
            View All
          </Link>

        </div>

        <div className="grid gap-6 md:grid-cols-3">

          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/shop?category=${category.id}`}
              className="group relative overflow-hidden rounded-2xl"
            >

              <div className="aspect-[4/5] bg-gray-200">

                <img
                  src={category.image}
                  alt={category.name}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />

              </div>

              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-6 pt-20">

                <h3 className="text-2xl font-semibold text-white">
                  {category.name}
                </h3>

                <p className="mt-1 text-sm text-white/80">
                  {category.description}
                </p>

              </div>

            </Link>
          ))}

        </div>

      </div>

    </section>
  );
};

export default CategorySection;