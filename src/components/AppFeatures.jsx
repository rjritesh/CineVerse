import React from "react";
import { FaMobileAlt, FaFilm, FaStar, FaRocket } from "react-icons/fa";

const featuresData = [
  {
    icon: <FaMobileAlt />,
    title: "Cross-Device",
    desc: "Enjoy CineVerse on mobile, tablet, and desktop with seamless experience."
  },
  {
    icon: <FaFilm />,
    title: "AI Recommendations",
    desc: "Get personalized movie suggestions powered by advanced AI."
  },
  {
    icon: <FaStar />,
    title: "Top Rated Movies",
    desc: "Explore trending, top-rated, and classic movies from around the world."
  },
  {
    icon: <FaRocket />,
    title: "Fast & Smooth",
    desc: "Lightning-fast streaming experience with minimal buffering."
  },
];

const AppFeatures = () => {
  return (
    <div
      className="w-full min-h-screen flex flex-col justify-center items-center px-6 py-12 text-white bg-gradient-to-b from-[#031243] to-[#35012d]"
      style={{
        fontFamily: "Montserrat, sans-serif",
        // slightly different than footer
      }}
    >
      {/* Heading */}
      <h2 className="text-4xl md:text-5xl font-bold mb-6 text-center">
        Why CineVerse?
      </h2>
      <p className="text-gray-300 text-center max-w-3xl mb-12">
        CineVerse combines AI-driven recommendations, latest releases, and a seamless viewing experience to bring your favorite movies and shows in one place.
      </p>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 w-full max-w-6xl">
        {featuresData.map((feature) => (
          <div
            key={feature.title}
            className="flex flex-col items-center text-center p-6 bg-gradient-to-t from-[#031243]/60 to-[#35012d]/60 rounded-xl hover:from-[#04184b]/70 hover:to-[#3a0138]/70 transition cursor-pointer shadow-xl"
          >
            <div className="text-4xl mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-200 text-sm">{feature.desc}</p>
          </div>
        ))}
      </div>

      {/* CTA Section */}
      <div className="mt-16 w-full max-w-4xl text-center">
        <h3 className="text-2xl md:text-3xl font-bold mb-4">Join CineVerse Today</h3>
        <p className="text-gray-300 mb-6">
          Start exploring the best movies and shows tailored for you. Sign up now and dive into your personalized cinematic world!
        </p>

      </div>
    </div>
  );
};

export default AppFeatures;
