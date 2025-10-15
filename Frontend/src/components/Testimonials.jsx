import React from "react";

const Marquee = () => {
  const cards = [
    { name: "Company A", users: "1200 Users", location: "USA" },
    { name: "Company B", users: "800 Users", location: "UK" },
    { name: "Company C", users: "1500 Users", location: "India" },
    { name: "Company D", users: "500 Users", location: "Canada" },
    { name: "Company E", users: "1800 Users", location: "Germany" },
    { name: "Company F", users: "950 Users", location: "France" },
  ];

  const renderCard = (c, i) => (
    <div
      key={i}
      className="w-64 h-36 flex flex-col justify-center items-center text-center p-4 rounded-2xl bg-white/30 backdrop-blur-md shadow-lg border border-white/20 flex-shrink-0"
    >
      <h3 className="font-semibold text-lg mb-1 text-gray-800">{c.name}</h3>
      <p className="text-gray-600 text-sm">{c.users}</p>
      <p className="text-gray-400 text-xs">{c.location}</p>
    </div>
  );

  return (
    <section className="py-20 px-6 bg-gray-50">
      <h2 className="text-3xl font-bold text-center mb-12">Our Reach</h2>
      <div className="overflow-hidden relative">
        <div
          className="flex gap-6 animate-marquee whitespace-nowrap"
          onMouseEnter={(e) => (e.currentTarget.style.animationPlayState = "paused")}
          onMouseLeave={(e) => (e.currentTarget.style.animationPlayState = "running")}
        >
          {/* Duplicate cards for seamless infinite scroll */}
          {[...cards, ...cards].map(renderCard)}
        </div>
      </div>

      <style>
        {`
          @keyframes marquee {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            animation: marquee 100s linear infinite;
          }
        `}
      </style>
    </section>
  );
};

export default Marquee;
