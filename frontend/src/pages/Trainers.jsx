import { useState } from "react";
import TrainerCard from "../components/TrainerCard";
import trainers from "../data/trainers";

const Trainers = () => {

  const [search, setSearch] = useState("");
  const [speciality, setSpeciality] = useState("All");

  const filteredTrainers = trainers.filter((trainer) => {

    const matchesSearch =
      trainer.name.toLowerCase().includes(search.toLowerCase()) ||
      trainer.location.toLowerCase().includes(search.toLowerCase()) ||
      trainer.speciality.toLowerCase().includes(search.toLowerCase());

    const matchesSpeciality =
      speciality === "All" ||
      trainer.speciality === speciality;

    return matchesSearch && matchesSpeciality;
  });

  return (
    <section className="py-24 bg-[#f7f5ef] min-h-screen">

      <div className="max-w-7xl mx-auto px-6">

        <h1 className="text-4xl font-bold">
          Find a Certified Trainer
        </h1>

        <p className="text-gray-600 mt-3">
          Find the right professional for your dog's needs.
        </p>


        <div className="flex flex-col md:flex-row gap-4 mt-10">

          <input
            type="text"
            placeholder="Search by name, location or speciality..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 px-5 py-4 rounded-full border border-gray-300 outline-none"
          />

          <select
            value={speciality}
            onChange={(e) => setSpeciality(e.target.value)}
            className="px-5 py-4 rounded-full border border-gray-300 bg-white"
          >
            <option value="All">All Specialities</option>
            <option value="Aggression">Aggression</option>
            <option value="Anxiety">Anxiety</option>
            <option value="Service Dogs">Service Dogs</option>
            <option value="Fear & Anxiety">Fear & Anxiety</option>
          </select>

        </div>


        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7 mt-12">

          {filteredTrainers.map((trainer) => (
            <TrainerCard
              key={trainer.id}
              trainer={trainer}
            />
          ))}

        </div>

      </div>

    </section>
  );
};

export default Trainers;