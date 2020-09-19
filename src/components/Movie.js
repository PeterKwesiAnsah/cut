import React, { useContext, useState } from 'react';
import '../movie.css';
import { ReactComponent as Fav } from './fav.svg';
import { ReactComponent as Play } from './play.svg';
import { ReactComponent as Watch } from './watchlist.svg';
import { SetItems } from '../App';

const Movie = ({ path, id, title }) => {
	const {
		setMovieId,
		setShowTile,
		setLikes,
		likes,
		setWatchList,
		watchList,
	} = useContext(SetItems);
	//use to determine if a movie poster is liked or not
	const [ liked, setLiked]  = useState(false);

	//handles the click event
	const handleClick = (e) => {
		if (
			e.target.matches('.movie-poster-box') ||
			e.target.matches('.movie-poster__filter')
		) {
			setMovieId(id);
			setShowTile(true);
		}
	};

	//used to set
	const handleLike = () => {
		//if movie is not liked,like it 
		if (liked) {
			setLiked(false)
			console.log(`${title} was unliked`)
			//remove the movie from likes
			/*
			1.use filter function
			*/
			const filterdMovies=likes.filter((movie)=>movie.id!==id)
			setLikes(filterdMovies)
		}
		//if movie is liked,remove it 
		else{
			setLiked(true)
			console.log(`${title} was liked`)
			//add the movie to the likes 
			setLikes([...likes,{id,title,path}])
		}
		
		//setLikes([...likes,{id,title,path}])
	};

	return (
		<div className="movie-poster-box" onClick={handleClick}>
			<img src={path} alt="movie posters" className="movie-poster"></img>
			<div className="movie-poster__filter"></div>
			<div className="icon-box">
				<Fav onClick={handleLike}></Fav>
				<Watch></Watch>
				<Play></Play>
			</div>
		</div>
	);
};

export default Movie;
