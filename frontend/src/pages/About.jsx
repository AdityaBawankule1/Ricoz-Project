const values = [
  {
    title: 'Certified expertise',
    description: 'We focus on qualified professionals who understand safe, humane and evidence-based dog behaviour support.'
  },
  {
    title: 'Pet-first approach',
    description: 'Every recommendation considers the dog’s comfort, confidence, history and the needs of their family.'
  },
  {
    title: 'Clear communication',
    description: 'Owners receive practical information, transparent booking details and easy access to their chosen specialist.'
  }
];

const About = () => (
  <section className="py-24 bg-white min-h-screen">
    <div className="max-w-7xl mx-auto px-6">
      <div className="max-w-3xl">
        <p className="text-green-700 font-semibold">ABOUT US</p>
        <h1 className="mt-3 text-4xl font-bold text-gray-900">Better care starts with the right expert</h1>
        <p className="mt-5 text-lg leading-relaxed text-gray-600">
          Kind Paws is designed to make it easier for pet owners to find trusted dog behaviourists,
          trainers and support professionals. We combine trusted specialist profiles with a simple,
          secure booking experience for every stage of your dog’s journey.
        </p>
      </div>

      <div className="mt-16 grid gap-6 md:grid-cols-3">
        {values.map((value) => (
          <article key={value.title} className="rounded-3xl bg-[#f7f5ef] p-7">
            <h2 className="text-xl font-bold text-gray-900">{value.title}</h2>
            <p className="mt-3 leading-relaxed text-gray-600">{value.description}</p>
          </article>
        ))}
      </div>

      <div className="mt-12 grid gap-8 rounded-3xl bg-gray-900 p-8 text-white lg:grid-cols-2 lg:items-center">
        <div>
          <h2 className="text-2xl font-bold">Our mission</h2>
          <p className="mt-3 leading-relaxed text-gray-300">
            Help dogs feel safer and more confident while giving their owners clear, dependable support.
            We aim to connect people with professionals who listen first and provide practical guidance.
          </p>
        </div>
        <div className="rounded-2xl bg-white/10 p-5">
          <p className="font-semibold">Who we support</p>
          <p className="mt-2 text-sm leading-relaxed text-gray-300">
            Pet owners, rescue groups, new dog parents and families looking for aggression,
            anxiety, fear, grooming or service dog training support.
          </p>
        </div>
      </div>
    </div>
  </section>
);

export default About;
