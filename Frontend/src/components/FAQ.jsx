import React from "react";

const FAQ = () => {
  const faqs = [
    { q: "How do I register?", a: "Click on Sign Up and fill in your details." },
    { q: "How can students apply for jobs?", a: "Browse available jobs and click Apply." },
    { q: "How can recruiters post jobs?", a: "Go to your dashboard and click Post a Job." },
  ];

  return (
    <section className="py-20 px-6 bg-white text-center">
      <h2 className="text-3xl font-bold mb-8">FAQs</h2>
      <div className="max-w-3xl mx-auto text-left space-y-4">
        {faqs.map((faq, i) => (
          <details key={i} className="bg-gray-50 p-4 rounded-lg shadow-sm">
            <summary className="cursor-pointer font-semibold">{faq.q}</summary>
            <p className="mt-2 text-gray-700">{faq.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
