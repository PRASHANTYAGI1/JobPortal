import React from "react";

const Team = () => {
  const members = [
    { name: "Atul", color: "bg-blue-400" },
    { name: "Harsh", color: "bg-green-400" },
    { name: "Shivam",color: "bg-purple-400" },
    { name: "Sahil", color: "bg-yellow-400" },
    { name: "Prashant",color: "bg-pink-400" },
  ];

  return (
    <section className="py-20 px-6 bg-gray-50 text-center relative">
      <h2 className="text-3xl font-bold mb-4">Our Team</h2>
      <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
        Meet the amazing team behind Job Portal. Each member brings unique expertise to make your experience seamless and professional.
      </p>

      <div className="flex justify-center items-center relative -space-x-8">
        {members.map((member, i) => (
          <div
            key={i}
            className={`flex flex-col items-center gap-2 transform hover:scale-105 transition-all z-${members.length - i}`}
          >
            <div
              className={`${member.color} w-18 h-18 rounded-full flex items-center justify-center text-white text-xl font-bold shadow-lg border-2 border-white`}
            >
              {member.name[0]}
            </div>
            <p className="font-semibold text-gray-800 text-sm m-5">{member.name}</p>
            
          </div>
        ))}
      </div>
    </section>
  );
};

export default Team;
