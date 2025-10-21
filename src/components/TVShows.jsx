import React, { useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer"
import { API_OPTIONS } from "../utils/constants"

const TVShows = () => {
  useEffect(() => {
    getTvShows()
  }, [])

  const getTvShows = async () => {
    const tvShows = await fetch('https://api.themoviedb.org/3/tv/airing_today?language=en-US&page=1', API_OPTIONS);
    const data = await tvShows.json();
    console.log(data.results);
  }


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
