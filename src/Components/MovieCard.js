import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const MovieCard = () => {

  const { movies } = useSelector((state) => state);
  console.log(movies);


  return (
    <div>
      {movies.map((movie) => {
        return (
          <div key={movie.id}>
            {movie.title}
          </div>
        );
      })}
    </div>
  );
};

export default MovieCard;