import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Home from './Home';
import Login from './Login';
import MovieCard from './MovieCard';

import { useSelector, useDispatch } from 'react-redux';
import { loginWithToken, fetchMovies, fetchShows } from '../store';
import { Link, Routes, Route } from 'react-router-dom';


const App = ()=> {
  const { auth } = useSelector(state => state);
  const dispatch = useDispatch();
  const [searchKey, setSearchKey] = useState('')

  useEffect(()=> {
    dispatch(fetchMovies());
    dispatch(fetchShows());
  }, []);

  // useEffect(()=> {
  //   dispatch(loginWithToken());
  // }, []);

  const searchMovies = (e) => {
    e.preventDefault()
  }

  return (
    <div className='App'>
      <header>
        <h1>The Movie Library</h1>

        <form onSubmit={searchMovies}>
          <input type='text' onChange={(e) => setSearchKey(e.target.value)}/>
          <button type={'submit'}>Search</button>
        </form>
      </header>
      {searchKey}
      <div>
        <MovieCard />
      </div>
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