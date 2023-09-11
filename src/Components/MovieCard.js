import React, { useRef } from "react";
import { useSelector } from "react-redux";

const MovieCard = ({ onMovieClick }) => {
  const { movies } = useSelector((state) => state);
  // console.log('movies', movies);
  const IMAGE_PATH = "https://image.tmdb.org/t/p/w500";
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // const handleMovieClick = (movie) => {
  //   setSelectedMovie(movie);
  // };

  return (
    <div className="container">
      {movies.map((movie) => {
        return (
          <div
            className="movie-card"
            key={movie.id}
            onClick={() => {
              onMovieClick(movie);
              scrollToTop();
            }}
          >
            {movie.poster_path ? (
              <img
                className="movie-cover"
                src={`${IMAGE_PATH}${movie.poster_path}`}
                alt=""
              />
            ) : (
              <div className="posterless">Movie Poster Pending</div>
            )}

            <h5 className="container-movie-title">{movie.title}</h5>
          </div>
        );
      })}
    </div>
  );
};

export default MovieCard;
