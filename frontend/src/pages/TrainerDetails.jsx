import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import trainers from "../data/trainers";
import BookingForm from "../components/BookingForm";

const TrainerDetails = () => {
  const { id } = useParams();
  const [showBookingForm, setShowBookingForm] = useState(false);

  const trainer = trainers.find(
    (item) => item.id === Number(id)
  );

  if (!trainer) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold">
          Trainer not found
        </h1>
      </div>
    );
  }

  return (
    <section className="py-24 bg-[#f7f5ef] min-h-screen">

      <div className="max-w-5xl mx-auto px-6">

        <div className="bg-white rounded-3xl overflow-hidden">

          <div className="grid md:grid-cols-2">

            <img
              src={trainer.image}
              alt={trainer.name}
              className="w-full h-full min-h-[500px] object-cover"
            />

            <div className="p-10">

              <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm">
                ✓ Certified
              </span>

              <h1 className="text-4xl font-bold mt-6">
                {trainer.name}
              </h1>

              <p className="text-gray-500 mt-2">
                {trainer.certification}
              </p>

              <div className="flex gap-2 mt-5">
                ⭐ {trainer.rating}
                <span className="text-gray-500">
                  ({trainer.reviews} reviews)
                </span>
              </div>

              <div className="mt-8 space-y-4">

                <p>📍 {trainer.location}</p>

                <p>🎓 {trainer.experience}</p>

                <p>🐕 Speciality: {trainer.speciality}</p>

                <p>
                  💰 £{trainer.price} per session
                </p>

              </div>

              <p className="text-gray-600 leading-relaxed mt-8">
                {trainer.description}
              </p>

              <button
                type="button"
                onClick={() => setShowBookingForm(true)}
                className="w-full bg-green-700 text-white py-4 rounded-full mt-8 hover:bg-green-800"
              >
                Book a Consultation
              </button>

              {showBookingForm && (
                <BookingForm trainer={trainer} onCancel={() => setShowBookingForm(false)} />
              )}

              <Link
                to="/trainers"
                className="block text-center mt-4 text-green-700"
              >
                ← Back to Trainers
              </Link>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
};

export default TrainerDetails;