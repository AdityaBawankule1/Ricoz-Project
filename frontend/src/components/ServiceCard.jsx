const ServiceCard = ({ icon, title, description }) => {
  return (
    <div className="bg-white rounded-3xl p-8 border border-gray-100 hover:shadow-lg transition">

      <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center text-2xl">
        {icon}
      </div>

      <h3 className="text-xl font-bold mt-6">
        {title}
      </h3>

      <p className="text-gray-600 mt-3 leading-relaxed">
        {description}
      </p>

      <button className="text-green-700 font-semibold mt-5">
        Learn more →
      </button>

    </div>
  );
};

export default ServiceCard;