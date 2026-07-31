import { Link } from "react-router-dom";

const HomeCTA = () => {
  return (
    <section className="py-20">

      <div className="mx-auto max-w-5xl px-6">

        <div className="rounded-3xl bg-black px-8 py-16 text-center text-white sm:px-16">

          <h2 className="text-3xl font-semibold sm:text-4xl">
            Find the piece that feels like you.
          </h2>

          <p className="mx-auto mt-5 max-w-xl leading-7 text-white/70">
            Explore our collection and discover jewelry
            designed to be personal, beautiful, and connected.
          </p>

          <Link
            to="/shop"
            className="mt-8 inline-block rounded-full bg-white px-8 py-4 text-sm font-semibold text-black transition hover:bg-gray-100"
          >
            Shop the Collection
          </Link>

        </div>

      </div>

    </section>
  );
};

export default HomeCTA;