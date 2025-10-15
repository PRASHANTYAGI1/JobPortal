import React from "react";

const Contact = () => (
  <section className="py-20 px-6 bg-gray-50 text-center">
    <h2 className="text-3xl font-bold mb-8">Contact Us</h2>
    <p className="mb-6 max-w-2xl mx-auto text-gray-700">Have questions? Reach out to us anytime.</p>
    <form className="max-w-xl mx-auto flex flex-col gap-4">
      <input type="text" placeholder="Name" className="p-3 rounded-md border" />
      <input type="email" placeholder="Email" className="p-3 rounded-md border" />
      <textarea placeholder="Message" className="p-3 rounded-md border"></textarea>
      <button className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition">Send Message</button>
    </form>
  </section>
);

export default Contact;
