const steps = [
  {
    number: "01",
    title: "Discover",
    description:
      "Explore jewelry designed around your style and needs.",
  },
  {
    number: "02",
    title: "Customize",
    description:
      "Choose the options available for your selected piece.",
  },
  {
    number: "03",
    title: "Order",
    description:
      "Complete your order with secure checkout and delivery.",
  },
  {
    number: "04",
    title: "Activate",
    description:
      "For compatible smart pieces, activate your technology after delivery.",
  },
  {
    number: "05",
    title: "Connect",
    description:
      "Enjoy the digital experience connected to your jewelry.",
  },
];

const HowItWorksSection = () => {
  return (
    <section className="bg-[#f8f5f1] py-20">

      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        <div className="mx-auto max-w-2xl text-center">

          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">
            The Experience
          </p>

          <h2 className="mt-3 text-3xl font-semibold text-gray-900">
            From discovery to connection
          </h2>

        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-5">

          {steps.map((step) => (
            <div
              key={step.number}
              className="text-center"
            >

              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-black text-sm font-semibold text-white">
                {step.number}
              </div>

              <h3 className="mt-5 font-semibold text-gray-900">
                {step.title}
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                {step.description}
              </p>

            </div>
          ))}

        </div>

      </div>

    </section>
  );
};

export default HowItWorksSection;