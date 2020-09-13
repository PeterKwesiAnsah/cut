import React from 'react';
import '../movie.css';
import { ReactComponent as Fav } from './fav.svg';
import { ReactComponent as Play } from './play.svg';
import { ReactComponent as Watch } from './watchlist.svg';

const Movie = ({ path }) => {
	return (
		<div className="movie-poster-box">
			<img src={path} alt="movie posters" className="movie-poster"></img>
			<div className="movie-poster__filter"></div>
            <div className='icon-box'>
            <Fav></Fav>
			<Play></Play>
			<Watch></Watch>
            </div>
			
		</div>
	);
};

export default Movie;
