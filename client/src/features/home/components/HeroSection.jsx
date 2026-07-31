import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-[#f8f5f1]">

      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-2 lg:px-8 lg:py-28">

        <div className="max-w-xl">

          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-gray-500">
            Smart Jewelry
          </p>

          <h1 className="text-4xl font-semibold leading-tight text-gray-900 sm:text-5xl lg:text-6xl">
            Jewelry that tells your story.
          </h1>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            Discover elegant jewelry designed to connect
            your style with smart technology.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">

            <Link
              to="/shop"
              className="rounded-full bg-black px-8 py-4 text-sm font-medium text-white transition hover:bg-gray-800"
            >
              Explore Collection
            </Link>

            <Link
              to="/shop?technology=NFC"
              className="rounded-full border border-gray-300 bg-white px-8 py-4 text-sm font-medium text-gray-900 transition hover:bg-gray-50"
            >
              Discover Smart Jewelry
            </Link>

          </div>

        </div>

        <div className="relative">

          <div className="aspect-square overflow-hidden rounded-[2rem] bg-gray-200">

            <img
              src="/images/home/hero-jewelry.jpg"
              alt="Smart jewelry collection"
              className="h-full w-full object-cover"
            />

          </div>

        </div>

      </div>

    </section>
  );
};

export default HeroSection;