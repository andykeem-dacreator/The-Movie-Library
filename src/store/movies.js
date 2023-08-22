import axios from 'axios';

const movies = (state = [], action) => {
  if (action.type === 'SET_MOVIES') {
    return action.movies;
  }
  return state;
};

export const fetchMovies = () => {
  return async (dispatch) => {
    try {
      const API_KEY = process.env.REACT_APP_MOVIE_API_KEY; 
      const API_URL = 'https://api.themoviedb.org/3';
      const endpoint = `${API_URL}/movie/changes?api_key=${API_KEY}`;

      const response = await axios.get(endpoint);
      dispatch({ type: 'SET_MOVIES', movies: response.data.results });
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };
};

export default movies;