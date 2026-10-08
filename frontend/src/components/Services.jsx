import ServiceCard from "./ServiceCard";

const Services = () => {
  return (
    <section className="py-24 bg-white">

      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center max-w-2xl mx-auto">
          <p className="text-green-700 font-semibold">
            OUR SERVICES
          </p>

          <h2 className="text-4xl font-bold mt-3">
            Expert help for every behaviour challenge
          </h2>

          <p className="text-gray-600 mt-4">
            Whether your dog struggles with aggression, anxiety or needs
            advanced service training, find the right expert for you.
          </p>
        </div>


        <div className="grid md:grid-cols-3 gap-6 mt-14">

          <ServiceCard
            icon="🐕"
            title="Aggression Management"
            description="Professional support for aggressive, reactive and difficult behaviours."
          />

          <ServiceCard
            icon="❤️"
            title="Anxiety & Fear"
            description="Help your dog overcome anxiety, fear, stress and separation issues."
          />

          <ServiceCard
            icon="⭐"
            title="Service Dog Training"
            description="Advanced training programs for assistance and service dogs."
          />

        </div>

      </div>

    </section>
  );
};

export default Services;