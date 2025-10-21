import React from "react";
import Header from "./Header";
import Footer from "./Footer"

const TVShows = () => {
  const sections = ["Popular TV Shows", "Top Rated", "Airing Today", "On The Air"];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#031243] to-[#35012d] text-white font-[Montserrat,sans-serif]">
      <Header />

      <div className="px-8 py-6">
        <h1 className="text-3xl font-bold mb-8">TV Shows</h1>

        <div className="flex flex-col gap-12">
          {sections.map((section) => (
            <div key={section}>
              <h2 className="text-2xl font-semibold mb-4">{section}</h2>
              <div className="bg-gray-800 rounded-xl p-6 text-center text-gray-300">
                🎬 {section} - Coming Soon!
              </div>
            </div>
          ))}
        </div>

      </div>
      <Footer></Footer>
    </div>
  );
};

export default TVShows;
