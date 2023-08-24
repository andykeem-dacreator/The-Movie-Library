import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const MovieCard = () => {

  const { movies } = useSelector((state) => state);
  console.log('movies', movies);
  const IMAGE_PATH = 'https://image.tmdb.org/t/p/w500'

  return (
    <div className='container'>
      {movies.map((movie) => {
        return (
          <div className='movie-card' key={movie.id}>
            {movie.poster_path ? <img className='movie-cover' src={`${IMAGE_PATH}${movie.poster_path}`} alt=''/>
              : null
            }
          
            <h5 className ='movie-title'>{movie.title}</h5>
          </div>
        );
      })}
    </div>
  );
};

export default MovieCard;