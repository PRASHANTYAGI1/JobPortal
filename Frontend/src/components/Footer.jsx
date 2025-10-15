import React from "react";

const Footer = () => (
  <footer className="bg-gray-800 text-white py-12 px-6 text-center">
    <p>© 2025 Job Portal. All rights reserved.</p>
    <p>Email: support@jobportal.com | Phone: +91-1234567890</p>
    <div className="flex justify-center gap-4 mt-4">
      <a href="#" className="hover:text-blue-400">Facebook</a>
      <a href="#" className="hover:text-blue-400">Twitter</a>
      <a href="#" className="hover:text-blue-400">LinkedIn</a>
    </div>
    <style>
      {`
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-100%); } }
        @keyframes marquee-reverse { 0% { transform: translateX(-100%); } 100% { transform: translateX(0); } }
        .animate-marquee { animation: marquee 20s linear infinite; }
        .animate-marquee-reverse { animation: marquee-reverse 20s linear infinite; }
      `}
    </style>
  </footer>
);

export default Footer;
