const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      title: "Tell us about your dog",
      description:
        "Answer a few simple questions about your dog's behaviour and needs."
    },
    {
      number: "02",
      title: "Find your expert",
      description:
        "We'll help you discover certified trainers who match your requirements."
    },
    {
      number: "03",
      title: "Book a consultation",
      description:
        "Choose a convenient time and connect with your selected trainer."
    },
    {
      number: "04",
      title: "Start the journey",
      description:
        "Work together with your trainer to create a healthier, happier dog."
    }
  ];

  return (
    <section id="how-it-works" className="py-24 bg-white scroll-mt-24">

      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center">
          <p className="text-green-700 font-semibold">
            HOW IT WORKS
          </p>

          <h2 className="text-4xl font-bold mt-3">
            Getting help is simple
          </h2>
        </div>


        <div className="grid md:grid-cols-4 gap-8 mt-16">

          {steps.map((step) => (
            <div key={step.number}>

              <span className="text-green-700 font-bold text-lg">
                {step.number}
              </span>

              <h3 className="text-xl font-bold mt-5">
                {step.title}
              </h3>

              <p className="text-gray-600 mt-3 leading-relaxed">
                {step.description}
              </p>

            </div>
          ))}

        </div>

      </div>

    </section>
  );
};

export default HowItWorks;