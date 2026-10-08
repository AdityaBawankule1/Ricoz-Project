import { useState } from "react";

const FAQ = () => {

  const [open, setOpen] = useState(null);

  const questions = [
    {
      question: "Are all trainers certified?",
      answer:
        "Yes. Trainers listed on the platform are required to provide relevant professional certifications and qualifications."
    },
    {
      question: "Can I book an online consultation?",
      answer:
        "Yes. Depending on the trainer, you may be able to book a video consultation."
    },
    {
      question: "What problems can a behaviourist help with?",
      answer:
        "Behaviourists can help with aggression, anxiety, fear, reactivity, separation problems and other behavioural challenges."
    },
    {
      question: "How do I choose the right trainer?",
      answer:
        "You can compare trainers based on their certification, speciality, experience, location and reviews."
    }
  ];

  return (
    <section className="py-24 bg-white">

      <div className="max-w-3xl mx-auto px-6">

        <div className="text-center">
          <p className="text-green-700 font-semibold">
            FAQ
          </p>

          <h2 className="text-4xl font-bold mt-3">
            Frequently asked questions
          </h2>
        </div>


        <div className="mt-12">

          {questions.map((item, index) => (

            <div
              key={index}
              className="border-b border-gray-200"
            >

              <button
                onClick={() =>
                  setOpen(open === index ? null : index)
                }
                className="w-full flex justify-between items-center py-6 text-left"
              >

                <span className="font-semibold text-lg">
                  {item.question}
                </span>

                <span className="text-2xl">
                  {open === index ? "−" : "+"}
                </span>

              </button>

              {open === index && (
                <p className="pb-6 text-gray-600 leading-relaxed">
                  {item.answer}
                </p>
              )}

            </div>

          ))}

        </div>

      </div>

    </section>
  );
};

export default FAQ;