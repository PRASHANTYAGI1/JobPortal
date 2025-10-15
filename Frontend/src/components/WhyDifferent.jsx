import React from "react";

const WhyDifferent = () => {
  const items = [
    { title: "Fast Application Process", text: "Students can apply to jobs with one click.", bg: "bg-blue-50" },
    { title: "Easy Job Posting", text: "Recruiters can post jobs quickly.", bg: "bg-green-50" },
    { title: "Admin Control", text: "Admins can manage users and generate reports.", bg: "bg-yellow-50" },
  ];

  return (
    <section className="py-20 px-6 bg-white text-center">
      <h2 className="text-3xl font-bold mb-6">Why Job Portal is Different</h2>
      <p className="max-w-3xl mx-auto text-gray-700 mb-8">
        We combine simplicity, efficiency, and powerful tools to make job hunting and recruitment seamless.
      </p>
      <div className="flex flex-wrap justify-center gap-6 max-w-5xl mx-auto">
        {items.map((item, i) => (
          <div key={i} className={`${item.bg} p-6 rounded-xl shadow-md w-64`}>
            <h3 className="font-semibold mb-2">{item.title}</h3>
            <p>{item.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyDifferent;
