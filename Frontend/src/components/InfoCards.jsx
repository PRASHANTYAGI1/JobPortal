import React from "react";
import { User, Briefcase, Shield } from "lucide-react";

const InfoCards = ({ user }) => {
  const role = user?.role?.toLowerCase();

  // Base cards per role
  const baseCards = !user
    ? [
        {
          title: "Students",
          steps: [
            "Sign up and create your profile",
            "Browse available jobs",
            "Apply to jobs and track status",
          ],
          icon: <User className="text-blue-600 w-8 h-8 mx-auto mb-2" />,
          gradient: "from-blue-100 to-purple-100",
        },
        {
          title: "Recruiters",
          steps: [
            "Register and create company profile",
            "Post job listings with details",
            "Review applications and hire",
          ],
          icon: <Briefcase className="text-green-600 w-8 h-8 mx-auto mb-2" />,
          gradient: "from-green-100 to-teal-100",
        },
        {
          title: "Admins",
          steps: [
            "Manage users and their roles",
            "Monitor job postings and applications",
            "Generate reports and insights",
          ],
          icon: <Shield className="text-yellow-600 w-8 h-8 mx-auto mb-2" />,
          gradient: "from-yellow-100 to-orange-100",
        },
      ]
    : role === "student"
    ? [
        {
          title: "Student Dashboard",
          steps: [
            "Browse jobs that match your skills",
            "Apply in one click",
            "Track application status in real time",
          ],
          icon: <User className="text-blue-600 w-8 h-8 mx-auto mb-2" />,
          gradient: "from-blue-100 to-purple-100",
        },
      ]
    : role === "recruter"
    ? [
        {
          title: "Recruiter Dashboard",
          steps: [
            "Post jobs quickly",
            "Manage job listings easily",
            "Review applicants and hire",
          ],
          icon: <Briefcase className="text-green-600 w-8 h-8 mx-auto mb-2" />,
          gradient: "from-green-100 to-teal-100",
        },
      ]
    : [
        {
          title: "Admin Dashboard",
          steps: [
            "Monitor all users",
            "Manage job postings and reports",
            "Ensure smooth platform operations",
          ],
          icon: <Shield className="text-yellow-600 w-8 h-8 mx-auto mb-2" />,
          gradient: "from-yellow-100 to-orange-100",
        },
      ];

  // Flatten cards per step
  const cards = [];
  baseCards.forEach((card) => {
    card.steps.forEach((step, index) => {
      cards.push({
        title: card.title,
        stepNumber: index + 1,
        text: step,
        icon: card.icon,
        gradient: card.gradient,
      });
    });
  });

  return (
    <section className="py-20 px-6 bg-gray-50">
      <h2 className="text-3xl font-bold text-center mb-4">How to Use Job Portal</h2>
      <p className="text-center text-gray-700 max-w-2xl mx-auto mb-12">
        Follow these easy steps to get started with Job Portal, whether you are a student looking for opportunities, a recruiter hiring talent, or an admin managing the platform.
      </p>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {cards.map((card, i) => (
          <div
            key={i}
            className={`bg-gradient-to-r ${card.gradient} p-6 rounded-xl shadow-md text-center text-gray-800 transition transform hover:-translate-y-2 hover:shadow-lg`}
          >
            {card.icon}
            <h3 className="font-semibold text-lg mb-2">{card.title}</h3>
            <span className="inline-block mb-2 font-bold">{`Step ${card.stepNumber}`}</span>
            <p>{card.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default InfoCards;
