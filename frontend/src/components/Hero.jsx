import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="bg-[#f7f5ef] min-h-[650px] flex items-center">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">

        {/* Left */}
        <div>
          <p className="text-green-700 font-semibold mb-4">
            CERTIFIED DOG BEHAVIOR EXPERTS
          </p>

          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
            Better Behaviour.
            <br />
            Happier Dogs.
          </h1>

          <p className="text-gray-600 text-lg mt-6 max-w-lg">
            Connect with scientifically certified dog behaviourists and
            professional trainers who understand your dog's unique needs.
          </p>

          <div className="flex gap-4 mt-8">
            <Link
              to="/trainers"
              className="bg-green-700 text-white px-7 py-3 rounded-full hover:bg-green-800 transition"
            >
              Find a Trainer
            </Link>

            <Link
              to="/#how-it-works"
              className="border border-gray-400 px-7 py-3 rounded-full hover:bg-white transition"
            >
              How It Works
            </Link>
          </div>

          <div className="flex gap-8 mt-10">
            <div>
              <h3 className="text-2xl font-bold">500+</h3>
              <p className="text-gray-500">Certified Trainers</p>
            </div>

            <div>
              <h3 className="text-2xl font-bold">10K+</h3>
              <p className="text-gray-500">Dogs Helped</p>
            </div>

            <div>
              <h3 className="text-2xl font-bold">4.9/5</h3>
              <p className="text-gray-500">Average Rating</p>
            </div>
          </div>
        </div>

        {/* Right */}
        <div>
          <img
            src="https://images.unsplash.com/photo-1558788353-f76d92427f16"
            alt="Dog"
            className="w-full h-[500px] object-cover rounded-[40px]"
          />
        </div>

      </div>
    </section>
  );
};

export default Hero;