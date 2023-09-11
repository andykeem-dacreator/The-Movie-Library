// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import Home from './Home';
// import Login from './Login';
// import MovieCard from './MovieCard';
// import { useSelector, useDispatch } from 'react-redux';
// import { fetchMovies, fetchShows } from '../store';
// import { Link, Routes, Route, useParams } from 'react-router-dom';
// import YouTube from 'react-youtube';

// const App = () => {
//   const { auth, movies, shows } = useSelector((state) => state);
//   const { filterString } = useParams();
//   const API_URL = 'https://api.themoviedb.org/3';
//   const IMAGE_PATH = 'https://image.tmdb.org/t/p/original';
//   const filter = filterString ? JSON.parse(filterString) : {};
//   const dispatch = useDispatch();

//   const [searchKey, setSearchKey] = useState('');
//   const [selectedMovie, setSelectedMovie] = useState({});
//   const [runTrailer, setRunTrailer] = useState(false);

//   const fetchMovie = async (id) => {
//     const {data} = await axios.get(`${API_URL}/movie/${id}`, {
//       params: {
//         api_key: process.env.REACT_APP_MOVIE_API_KEY,
//       }
//     })
//     return data;
//   }

//   const selectMovie = async (movie) => {
//     const data = await fetchMovie(movie.id);
//     setSelectedMovie(data);
//   };

//   useEffect(() => {
//     dispatch(fetchMovies());
//     dispatch(fetchShows());
//   }, []);

//   useEffect(() => {
//     if (movies.length > 0) {
//       setSelectedMovie(movies[0]);
//       console.log('Selected Movie:', movies[0]);
//     }
//   }, [movies]);

//   const searchMovies = async (ev) => {
//     ev.preventDefault();

//     try {
//       dispatch(fetchMovies(searchKey));
//     } catch (error) {
//       console.error('Error searching movies:', error);
//     }
//   }

//   const handleMovieClick = (movie) => {
//     setSelectedMovie(movie);
//     console.log('Selected Movie', movie)
//   };

//   const playTrailer = () => {
//     if (selectedMovie.videos) {
//       const trailer = selectedMovie.videos.results.find(vid => vid.name === 'Official Trailer');
//       if (trailer) {
//         return (
//           <YouTube videoId={trailer.key} />
//         );
//       }
//     }
//     return null;
//   };

//   return (
//     <div className="App">
//       <header className='header'>
//         <h1>The Movie Library</h1>

//         <form onSubmit={searchMovies}>
//           <input
//             type="text"
//             autoComplete="off"
//             name="search"
//             placeholder="Search Movie"
//             value={searchKey}
//             onChange={(ev) => setSearchKey(ev.target.value)}
//           />
//           <button type="submit">Search</button>
//         </form>
//       </header>
//       <div className='hero' style={{backgroundImage: `url('${IMAGE_PATH}${selectedMovie.backdrop_path}')`}}>
//         <div className='main-info'>
//           {runTrailer ? playTrailer() : null}
//           <button className='trailer-play-button' onClick={() => setRunTrailer(true)}>Play</button>
//           <h1 className='hero-movie-title'>{selectedMovie.title}</h1>
//           <p className='hero-movie-overview'>{selectedMovie.overview ? selectedMovie.overview : null}</p>
//         </div>
//       </div>
//       <div >
//         {/* {filtered.map((movie) => (
//           <MovieCard key={movie.id} movie={movie} />
//         ))} */}
//         <MovieCard selectMovie = {setSelectedMovie} onMovieClick={handleMovieClick} />
//       </div>
//       <div className='trailer'>

//       </div>
//     </div>
//   );
// };

// export default App;

import React, { useEffect, useState } from "react";
import "./styles.css";
import axios from "axios";
import MovieCard from "./MovieCard";
import Footer from "./Footer";
import { useSelector, useDispatch } from "react-redux";
import { fetchMovies, fetchShows } from "../store";
import Youtube from "react-youtube";
import { Link } from "react-router-dom";

const App = () => {
  const { movies } = useSelector((state) => state);
  const API_URL = "https://api.themoviedb.org/3";
  const IMAGE_PATH = "https://image.tmdb.org/t/p/original";
  // const filterString = useParams().filterString;
  // const filter = filterString ? JSON.parse(filterString) : {};
  const dispatch = useDispatch();

  const [searchKey, setSearchKey] = useState("");
  const [selectedMovie, setSelectedMovie] = useState({});
  const [playingTrailer, setPlayingTrailer] = useState(false);
  const [trailer, setTrailer] = useState(null);

  useEffect(() => {
    dispatch(fetchMovies());
    dispatch(fetchShows());

    if (movies.length > 0) {
      setSelectedMovie(movies[0]);
      fetchTrailer(movies[0]);
    }
  }, []);

  useEffect(() => {
    if (movies.length > 0) {
      setSelectedMovie(movies[0]);
      fetchTrailer(movies[0]);
    }
  }, [movies]);

  const searchMovies = async (ev) => {
    ev.preventDefault();

    try {
      dispatch(fetchMovies(searchKey));
    } catch (error) {
      console.error("Error searching movies:", error);
    }
  };

  const fetchTrailer = async (movie) => {
    try {
      const response = await axios.get(`${API_URL}/movie/${movie.id}/videos`, {
        params: {
          api_key: process.env.REACT_APP_MOVIE_API_KEY,
        },
      });

      if (response.data.results.length > 0) {
        setTrailer(response.data.results[0]);
      } else {
        setTrailer(null);
      }
    } catch (error) {
      console.error("Error fetching trailer:", error);
      setTrailer(null);
    }
  };

  const handleMovieClick = async (movie) => {
    setSelectedMovie(movie);
    setPlayingTrailer(false);

    try {
      const response = await axios.get(`${API_URL}/movie/${movie.id}/videos`, {
        params: {
          api_key: process.env.REACT_APP_MOVIE_API_KEY,
        },
      });

      const officialTrailer = response.data.results.find((vid) =>
        vid.name.includes("Official Trailer")
      );

      if (officialTrailer) {
        setTrailer(officialTrailer);
      } else {
        setTrailer(null);
      }
    } catch (error) {
      console.error("Error fetching trailer:", error);
      setTrailer(null);
    }
  };

  const playTrailer = () => {
    if (trailer) {
      return (
        <Youtube
          videoId={trailer.key}
          opts={{
            width: "100%",
            height: "620px",
            playerVars: {
              autoplay: 1,
              controls: 1,
              modestbranding: 1,
              rel: 0,
            },
          }}
        />
      );
    }
    return null;
  };

  return (
    <div className="App">
      <header className="header">
        <Link to="/">
          <h1>The Movie Library</h1>
        </Link>
        <form onSubmit={searchMovies}>
          <input
            type="text"
            autoComplete="off"
            name="search"
            placeholder="Search Movie"
            value={searchKey}
            onChange={(ev) => setSearchKey(ev.target.value)}
          />
          <button type="submit">Search</button>
        </form>
      </header>
      <div
        className="hero"
        style={{
          backgroundImage: `url('${IMAGE_PATH}${selectedMovie.backdrop_path}')`,
          backgroundAttachment: "fixed",
          backgroundSize: "100% 100%",
        }}
      >
        <div className="main-info">
          {playingTrailer && trailer ? playTrailer() : null}
          <button
            className="trailer-play-button"
            onClick={() => setPlayingTrailer(true)}
          >
            Play Trailer
          </button>
          <h1 className="hero-movie-title">{selectedMovie.title}</h1>
          <p className="hero-movie-overview">
            {selectedMovie.overview ? selectedMovie.overview : null}
          </p>
        </div>
      </div>
      <div>
        <MovieCard onMovieClick={handleMovieClick} />
      </div>
      <Footer />
    </div>
  );
};

export default App;
