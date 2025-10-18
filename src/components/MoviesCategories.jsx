import React from "react";
import MoviesCard from "./MoviesCard";

const MoviesCategories = ({ title, movies }) => {
  if (!movies || movies.length === 0) return null; // no empty section

  return (
    <div className="px-8 my-2">
      {/* Category Title */}
      <h1 className="text-2xl md:text-3xl font-bold text-white mb-4">
        {title}
      </h1>

      {/* Horizontal Movie Row */}
      <div className="flex hide-scrollbar space-x-4">
        {movies.map((movie) => (
          <MoviesCard key={movie.id} poster={movie.poster_path} title={movie.title} id={movie.id} />
        ))}
      </div>

    </div>
  );
};

export default MoviesCategories;
