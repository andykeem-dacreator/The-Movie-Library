const express = require('express');
const app = express.Router();
const axios = require('axios');
const router = express.Router();

module.exports = app;

const API_URL = 'https://api.themoviedb.org/3/';

router.get('/', async (req, res) => {
  try {
    const movieData = await axios.get(`${API_URL}/discover/movie`, {
      params: {
        api_key: process.env.REACT_APP_MOVIE_API_KEY,
      },
    });
    res.json(movieData.data);
  } catch (error) {
    console.error('Error fetching movie data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

