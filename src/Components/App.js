import React, { useEffect } from 'react';
import axios from 'axios';
import Home from './Home';
import Login from './Login';

import { useSelector, useDispatch } from 'react-redux';
import { loginWithToken, fetchMovies, fetchShows } from '../store';
import { Link, Routes, Route } from 'react-router-dom';


const App = ()=> {
  const { auth } = useSelector(state => state);
  const dispatch = useDispatch();
  // const API_URL = 'https://api.themoviedb.org/3/'
  // const fetchMovies = async () => {
  //   const movieData = await axios.get(`${API_URL}/movie/changes`, {
  //     params: {
  //       api_key: process.env.REACT_APP_MOVIE_API_KEY 
  //     }
  //   })
  //   console.log('movie data', movieData)
  // }

  // const fetchShows = async () => {
  //   const showData = await axios.get(`${API_URL}/tv/changes`, {
  //     params: {
  //       api_key: process.env.REACT_APP_MOVIE_API_KEY
  //     }
  //   })
  //   console.log('show data', showData)
  // }

  useEffect(()=> {
    dispatch(fetchMovies());
    dispatch(fetchShows());
  }, []);

  // useEffect(()=> {
  //   dispatch(loginWithToken());
  // }, []);

  return (
    <div>
      <h1>FS App Template</h1>
      {/* {
        auth.id ? <Home /> : <Login />
      }
      {
        !!auth.id  && (
          <div>
            <nav>
              <Link to='/'>Home</Link>
            </nav>
          </div>
        )
      } */}
    </div>
  );
};

export default App;