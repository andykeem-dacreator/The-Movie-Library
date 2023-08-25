// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import Home from './Home';
// import Login from './Login';
// import MovieCard from './MovieCard';
// import ShowCard from './ShowCard';

// import { useSelector, useDispatch } from 'react-redux';
// import { loginWithToken, fetchMovies, fetchShows } from '../store';
// import { Link, Routes, Route, useParams } from 'react-router-dom';


// const App = ()=> {
//   const { auth, movies, shows } = useSelector(state => state);
//   const { filterString } = useParams();
//   const filter = filterString ? JSON.parse(filterString) : {};
//   const dispatch = useDispatch();
//   const [searchKey, setSearchKey] = useState('')

//   useEffect(()=> {
//     dispatch(fetchMovies());
//     dispatch(fetchShows());
//   }, []);

//   // useEffect(()=> {
//   //   dispatch(loginWithToken());
//   // }, []);

//   const searchMovies = (ev) => {
//     const _filter = { ...filter };
//     if (ev.target.name === 'search') {
//       if (ev.target.value) {
//         _filter.search = ev.target.value;
//       } else {
//         delete _filter.search;
//       }
//       setSearchKey(ev.target.value);
//       dispatch(fetchMovies(_filter));
//     }
//   }

//   const filtered = movies.filter(movie => {
//     if (filter.search) {
//       if (
//         (movie.title && movie.title.includes(filter.search.toLowerCase())) 
//       ) {
//         return true;
//       }
//       return false;
//     }
//     return true;
//   });

//   return (
//     <div className='App'>
//       <header>
//         <h1>The Movie Library</h1>

//         <form onSubmit={searchMovies}>
//           <input        
//             type='text'   
//             // value={filter.search ? filter.search : ''}
//             autoComplete='off'
//             name='search'
//             placeholder='Search Movie'
//             onChange={(ev) => setSearchKey(ev.target.value)}/>
//           <button type={'submit'}>Search</button>
//         </form>
//       </header>
//       <div>
//         <MovieCard />
//         {/* <ShowCard /> */}
//       </div>
//       {/* {
//         auth.id ? <Home /> : <Login />
//       }
//       {
//         !!auth.id  && (
//           <div>
//             <nav>
//               <Link to='/'>Home</Link>
//             </nav>
//           </div>
//         )
//       } */}
//     </div>
//   );
// };

// export default App;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Home from './Home';
import Login from './Login';
import MovieCard from './MovieCard';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMovies, fetchShows } from '../store';
import { Link, Routes, Route, useParams } from 'react-router-dom';

const App = () => {
  const { auth, movies, shows } = useSelector((state) => state);
  const { filterString } = useParams();
  const filter = filterString ? JSON.parse(filterString) : {};
  const dispatch = useDispatch();
  const [searchKey, setSearchKey] = useState('');

  useEffect(() => {
    dispatch(fetchMovies());
    dispatch(fetchShows());
  }, []);

  const searchMovies = async (ev) => {
    ev.preventDefault();

    try {
      dispatch(fetchMovies(searchKey));
    } catch (error) {
      console.error('Error searching movies:', error);
    }
  }

  const filtered = movies.filter((movie) => {
    if (filter.search) {
      if (movie.title && movie.title.toLowerCase().includes(filter.search.toLowerCase())) {
        return true;
      }
      return false;
    }
    return true;
  });

  return (
    <div className="App">
      <header className='header'>
        <h1>The Movie Library</h1>

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
      <div>
        {/* {filtered.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))} */}
        <MovieCard />
      </div>
    </div>
  );
};

export default App;