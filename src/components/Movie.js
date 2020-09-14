import React ,{useContext}from 'react';
import '../movie.css';
import { ReactComponent as Fav } from './fav.svg';
import { ReactComponent as Play } from './play.svg';
import { ReactComponent as Watch } from './watchlist.svg';
import { SetItems } from '../App'

const Movie = ({ path,id }) => {
	const {setMovieId,setShowTile}=useContext(SetItems)
	const handleClick=()=>{
		setMovieId(id)
		setShowTile(true)
	}
	
	return (
		<div className="movie-poster-box" onClick={handleClick}>
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
