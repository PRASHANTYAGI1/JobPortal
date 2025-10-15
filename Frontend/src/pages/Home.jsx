import React, { useState, useEffect } from "react";
import Hero from "../components/Hero";
import InfoCards from "../components/InfoCards";
import WhyDifferent from "../components/WhyDifferent";
import Testimonials from "../components/Testimonials";
import FAQ from "../components/FAQ";
import Contact from "../components/Contact";
import Team from "../components/Team";
import Footer from "../components/Footer";

const Home = ({ isLoggedIn }) => {
  const [user, setUser] = useState(isLoggedIn ? JSON.parse(localStorage.getItem("user")) : null);

  // Update user state whenever isLoggedIn changes
  useEffect(() => {
    setUser(isLoggedIn ? JSON.parse(localStorage.getItem("user")) : null);
  }, [isLoggedIn]);

  return (
    <div className="font-sans text-gray-800">
      <Hero user={user} />
      <InfoCards user={user} />
      <WhyDifferent />
      <Testimonials />
      <FAQ />
      <Contact />
      <Team />
      <Footer />
    </div>
  );
};

export default Home;
