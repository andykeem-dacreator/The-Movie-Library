import axios from 'axios';

const movies = (state = [], action) => {
  if (action.type === 'SET_MOVIES') {
    return action.movies;
  }
  return state;
};

export const fetchMovies = (searchQuery) => {
  return async (dispatch) => {
    try {
      const API_KEY = process.env.REACT_APP_MOVIE_API_KEY; 
      const API_URL = 'https://api.themoviedb.org/3';
      let endpoint = `${API_URL}/discover/movie?api_key=${API_KEY}`;

      if (searchQuery) {
        endpoint = `${API_URL}/search/movie?api_key=${API_KEY}&query=${searchQuery}`;
      }

      const response = await axios.get(endpoint);
      dispatch({ type: 'SET_MOVIES', movies: response.data.results });
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };
};

export default movies;