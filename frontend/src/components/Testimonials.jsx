const Testimonials = () => {
  const testimonials = [
    {
      name: "Emma Thompson",
      dog: "Max",
      text: "We finally understood why Max was becoming aggressive. Our trainer gave us practical techniques that completely changed our relationship."
    },
    {
      name: "Daniel Smith",
      dog: "Bella",
      text: "Bella had severe separation anxiety. After working with our behaviourist, she is now much calmer and more confident."
    },
    {
      name: "Sophie Williams",
      dog: "Luna",
      text: "Finding a certified trainer through this platform was incredibly easy. The whole process felt professional and trustworthy."
    }
  ];

  return (
    <section className="py-24 bg-[#f7f5ef]">

      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center">
          <p className="text-green-700 font-semibold">
            SUCCESS STORIES
          </p>

          <h2 className="text-4xl font-bold mt-3">
            Loved by dogs and their humans
          </h2>
        </div>


        <div className="grid md:grid-cols-3 gap-6 mt-14">

          {testimonials.map((item, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-3xl"
            >

              <div className="text-yellow-500">
                ⭐⭐⭐⭐⭐
              </div>

              <p className="text-gray-600 mt-5 leading-relaxed">
                "{item.text}"
              </p>

              <div className="mt-6">
                <h4 className="font-bold">
                  {item.name}
                </h4>

                <p className="text-gray-500 text-sm">
                  Owner of {item.dog}
                </p>
              </div>

            </div>
          ))}

        </div>

      </div>

    </section>
  );
};

export default Testimonials;