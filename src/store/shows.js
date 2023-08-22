import axios from 'axios';

const shows = (state = [], action) => {
  if (action.type === 'SET_SHOWS') {
    return action.shows;
  }
  return state;
};

export const fetchShows = () => {
  return async (dispatch) => {
    try {
      const API_KEY = process.env.REACT_APP_MOVIE_API_KEY; 
      const API_URL = 'https://api.themoviedb.org/3';
      const endpoint = `${API_URL}/discover/movie?api_key=${API_KEY}`;

      const response = await axios.get(endpoint);
      dispatch({ type: 'SET_SHOWS', shows: response.data.results });
    } catch (error) {
      console.error('Error fetching shows:', error);
    }
  };
};

export default shows;