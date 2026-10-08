import { useState } from "react";
import TrainerCard from "./TrainerCard";
import trainers from "../data/trainers";

const TrainerSection = () => {

  const [speciality, setSpeciality] = useState("All");

  const filteredTrainers =
    speciality === "All"
      ? trainers
      : trainers.filter(
          (trainer) => trainer.speciality === speciality
        );

  return (
    <section className="py-24 bg-[#f7f5ef]">

      <div className="max-w-7xl mx-auto px-6">

        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">

          <div>
            <p className="text-green-700 font-semibold">
              FIND YOUR EXPERT
            </p>

            <h2 className="text-4xl font-bold mt-2">
              Meet our certified trainers
            </h2>

            <p className="text-gray-600 mt-3">
              Find an expert based on your dog's specific needs.
            </p>
          </div>

          <select
            value={speciality}
            onChange={(e) => setSpeciality(e.target.value)}
            className="border border-gray-300 rounded-full px-5 py-3 bg-white outline-none"
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

export default TrainerSection;