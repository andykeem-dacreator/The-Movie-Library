import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const ShowCard = () => {

  const { shows } = useSelector((state) => state);
  console.log('shows', shows);
  const IMAGE_PATH = 'https://image.tmdb.org/t/p/w500'

  return (
    <div className='container'>
      {shows.map((show) => {
        return (
          <div className='show-card' key={show.id}>
            {show.poster_path ? <img className='show-cover' src={`${IMAGE_PATH}${show.poster_path}`} alt=''/>
              : null
            }
          
            <h5 className ='show-title'>{show.name}</h5>
          </div>
        );
      })}
    </div>
  );
};

export default ShowCard;