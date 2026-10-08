const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">

      <div className="max-w-7xl mx-auto px-6 py-16">

        <div className="grid md:grid-cols-4 gap-10">

          <div>
            <h2 className="text-2xl font-bold">
              PawBehaviour
            </h2>

            <p className="text-gray-400 mt-4 leading-relaxed">
              Connecting pet owners with certified dog behaviourists
              and professional trainers.
            </p>
          </div>


          <div>
            <h3 className="font-semibold mb-4">
              Platform
            </h3>

            <div className="space-y-3 text-gray-400">
              <p>Find a Trainer</p>
              <p>How It Works</p>
              <a href="/services" className="block hover:text-white">Services</a>
              <p>Reviews</p>
            </div>
          </div>


          <div>
            <h3 className="font-semibold mb-4">
              Support
            </h3>

            <div className="space-y-3 text-gray-400">
              <p>FAQ</p>
              <a href="/contact" className="block hover:text-white">Contact Us</a>
              <p>hello@kindpaws.example</p>
              <p>+91 98765 43210</p>
            </div>
          </div>


          <div>
            <h3 className="font-semibold mb-4">
              For Trainers
            </h3>

            <div className="space-y-3 text-gray-400">
              <p>Become a Trainer</p>
              <p>Trainer Login</p>
              <p>Certification</p>
            </div>
          </div>

        </div>


        <div className="border-t border-gray-700 mt-12 pt-6 text-gray-500 text-sm">
          © 2026 PawBehaviour. All rights reserved.
        </div>

      </div>

    </footer>
  );
};

export default Footer;