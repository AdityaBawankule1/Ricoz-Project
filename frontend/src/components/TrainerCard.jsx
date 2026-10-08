import { Link } from "react-router-dom";

const TrainerCard = ({ trainer }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden hover:shadow-xl transition">

      <img
        src={trainer.image}
        alt={trainer.name}
        className="w-full h-56 object-cover"
      />

      <div className="p-6">

        <div className="flex justify-between items-start">

          <div>
            <h3 className="text-xl font-bold">
              {trainer.name}
            </h3>

            <p className="text-sm text-gray-500 mt-1">
              {trainer.certification}
            </p>
          </div>

          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
            ✓ Certified
          </span>

        </div>

        <div className="flex items-center gap-2 mt-4">
          <span>⭐</span>
          <strong>{trainer.rating}</strong>
          <span className="text-gray-500">
            ({trainer.reviews} reviews)
          </span>
        </div>

        <div className="mt-4 space-y-2 text-gray-600 text-sm">
          <p>📍 {trainer.location}</p>
          <p>🎓 {trainer.experience}</p>
          <p>🐕 {trainer.speciality}</p>
        </div>

        <div className="flex justify-between items-center mt-6">

          <div>
            <span className="text-2xl font-bold">
              £{trainer.price}
            </span>
            <span className="text-gray-500">
              /session
            </span>
          </div>

          <Link
            to={`/trainer/${trainer.id}`}
            className="bg-green-700 text-white px-5 py-2.5 rounded-full hover:bg-green-800"
          >
            View Profile
          </Link>

        </div>

      </div>
    </div>
  );
};

export default TrainerCard;