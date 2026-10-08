import { Link } from 'react-router-dom';

const bookingSteps = [
  {
    number: '01',
    title: 'Choose a specialist',
    description: 'Browse certified trainers by behaviour focus, location, experience and rating.'
  },
  {
    number: '02',
    title: 'Share your dog’s needs',
    description: 'Tell the trainer about your dog, the main challenge and any important history.'
  },
  {
    number: '03',
    title: 'Book a consultation',
    description: 'Select a date and time, then save your request so it is stored in MongoDB.'
  },
  {
    number: '04',
    title: 'Prepare for the visit',
    description: 'Receive the trainer’s details and arrive with your dog ready for the first session.'
  }
];

const Booking = () => (
  <section className="py-24 bg-[#f7f5ef] min-h-screen">
    <div className="max-w-7xl mx-auto px-6">
      <div className="max-w-3xl">
        <p className="text-green-700 font-semibold">BOOK A VISIT</p>
        <h1 className="mt-3 text-4xl font-bold text-gray-900">A helpful first visit starts here</h1>
        <p className="mt-5 text-lg leading-relaxed text-gray-600">
          Book a consultation with a certified dog behaviourist or trainer. The visit helps the
          specialist understand your dog’s needs and recommend a clear, practical next step.
        </p>
      </div>

      <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {bookingSteps.map((step) => (
          <article key={step.number} className="rounded-3xl bg-white p-6 shadow-sm">
            <span className="text-sm font-bold text-green-700">{step.number}</span>
            <h2 className="mt-5 text-xl font-bold text-gray-900">{step.title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-gray-600">{step.description}</p>
          </article>
        ))}
      </div>

      <div className="mt-12 grid gap-6 rounded-3xl bg-white p-8 shadow-sm lg:grid-cols-[1fr_auto] lg:items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Ready to find the right specialist?</h2>
          <p className="mt-2 text-gray-600">
            Browse trainer profiles, compare experience and services, then open the consultation form.
          </p>
        </div>
        <Link
          to="/trainers"
          className="rounded-full bg-green-700 px-6 py-3 text-center font-semibold text-white hover:bg-green-800"
        >
          Find a Specialist
        </Link>
      </div>
    </div>
  </section>
);

export default Booking;
