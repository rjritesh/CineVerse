import React from "react";
import { useNavigate } from "react-router-dom";

const MoviesCard = ({ poster, title, id }) => {
  const navigate = useNavigate()
  const imgUrl = `https://image.tmdb.org/t/p/w500${poster}`;

  return (
    <div className="relative min-w-[150px] md:min-w-[180px] cursor-pointer group"

      onClick={() => navigate(`/movie/${id}`)}>
      {/* Movie Poster */}
      <img
        src={imgUrl}
        alt={title}
        className="rounded-lg w-full object-cover transition-transform duration-300 group-hover:scale-105"
      />

      {/* Hover Overlay */}
      <div className="absolute inset-0 group-hover:opacity-100 rounded-lg flex flex-col justify-end p-2 transition-opacity">

      </div>


    </div>
  );
};

export default MoviesCard;
