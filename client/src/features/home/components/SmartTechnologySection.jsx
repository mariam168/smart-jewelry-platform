import { Link } from "react-router-dom";

const technologies = [
  {
    name: "NFC",
    description:
      "Tap your jewelry to connect to a digital experience.",
  },
  {
    name: "QR",
    description:
      "Connect your piece through a simple and accessible scan.",
  },
  {
    name: "Bluetooth",
    description:
      "Smart connectivity for compatible jewelry experiences.",
  },
];

const SmartTechnologySection = () => {
  return (
    <section className="py-20">

      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">

          <div>

            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">
              Beyond Jewelry
            </p>

            <h2 className="mt-3 text-3xl font-semibold text-gray-900 sm:text-4xl">
              Beautiful design.
              <br />
              Smart possibilities.
            </h2>

            <p className="mt-6 max-w-lg leading-7 text-gray-600">
              Explore jewelry that combines timeless design
              with smart technology, creating experiences
              that are personal and connected.
            </p>

            <Link
              to="/shop"
              className="mt-8 inline-block rounded-full bg-black px-7 py-3 text-sm font-medium text-white"
            >
              Explore Smart Jewelry
            </Link>

          </div>

          <div className="grid gap-4">

            {technologies.map(
              (technology) => (
                <div
                  key={technology.name}
                  className="rounded-2xl border border-gray-200 p-6"
                >

                  <h3 className="text-xl font-semibold text-gray-900">
                    {technology.name}
                  </h3>

                  <p className="mt-2 leading-6 text-gray-600">
                    {technology.description}
                  </p>

                </div>
              )
            )}

          </div>

        </div>

      </div>

    </section>
  );
};

export default SmartTechnologySection;