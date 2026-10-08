const contactOptions = [
  {
    label: 'Email support',
    value: 'hello@kindpaws.example',
    description: 'For account questions, booking support and general enquiries.'
  },
  {
    label: 'Phone support',
    value: '+91 98765 43210',
    description: 'Available Monday to Saturday, 9:00 AM to 7:00 PM IST.'
  },
  {
    label: 'Response time',
    value: 'Within one business day',
    description: 'We aim to respond to support messages as quickly as possible.'
  }
];

const Contact = () => (
  <section className="py-24 bg-[#f7f5ef] min-h-screen">
    <div className="max-w-7xl mx-auto px-6">
      <div className="max-w-3xl">
        <p className="text-green-700 font-semibold">CONTACT US</p>
        <h1 className="mt-3 text-4xl font-bold text-gray-900">Get in touch with Kind Paws</h1>
        <p className="mt-5 text-lg leading-relaxed text-gray-600">
          Have a question about trainer profiles, consultation booking, services or your account?
          Choose the contact method that works best for you.
        </p>
      </div>

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {contactOptions.map((option) => (
          <article key={option.label} className="rounded-3xl bg-white p-7 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900">{option.label}</h2>
            <p className="mt-3 font-semibold text-green-700">{option.value}</p>
            <p className="mt-3 text-sm leading-relaxed text-gray-600">{option.description}</p>
          </article>
        ))}
      </div>

      <div className="mt-10 rounded-3xl bg-white p-8 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900">For trainer partnerships</h2>
        <p className="mt-3 max-w-2xl leading-relaxed text-gray-600">
          Certified trainers can contact us about profile creation, verification and service listings.
          Please include your certification details, experience and location.
        </p>
        <a
          href="mailto:trainers@kindpaws.example"
          className="mt-5 inline-block rounded-full bg-green-700 px-6 py-3 font-semibold text-white hover:bg-green-800"
        >
          trainers@kindpaws.example
        </a>
      </div>
    </div>
  </section>
);

export default Contact;
