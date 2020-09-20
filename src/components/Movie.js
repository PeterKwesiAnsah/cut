import React, { useContext, useState } from 'react';
import '../movie.css';
import Play from './Play'
import Fav from './Fav'
import WatchList from './WatchList'
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
	const [liked, setLiked] = useState(false);
	const [watched, setWatched] = useState(false);

	//liked/watched movies should have the liked/ 

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
		//if movie is liked,remove it
		if (liked) {
			setLiked(false);
			console.log(`${title} was unliked`);
			//remove the movie from likes
			const filterdMovies = likes.filter((movie) => movie.id !== id);
			//update likes with the filtered movies
			setLikes(filterdMovies);
		}
		//if movie is not liked,add it
		else {
			setLiked(true);
			console.log(`${title} was liked`);
			//add the movie to the likes
			setLikes([...likes, { id, title, path ,liked}]);
		}

		//setLikes([...likes,{id,title,path}])
	};


	const handleWatch = () => {
		//if movie is  added to the watch,remove it
		if (watched) {
			setWatched(false);
			console.log(`${title} was removed from watch list`);
			//remove the already added movie from watch
			/*
			1.use filter function
			*/
			const filterdList = watchList.filter((movie) => movie.id !== id);
			setWatchList(filterdList);
		}
		//if movie is  not added to the watch,add it
		else {
			setWatched(true);
			console.log(`${title} was added to the watch list`);
			//add the movie to the watchList
			setWatchList([...watchList, { id, title, path ,watched}]);
		}

		//setLikes([...likes,{id,title,path}])
	};

	return (
		<div className="movie-poster-box" onClick={handleClick}>
			<img src={path} alt="movie posters" className="movie-poster"></img>
			<div className="movie-poster__filter"></div>
			<div className="icon-box">
				<Fav liked={liked} handleLike={handleLike}></Fav>
				<WatchList watched={watched} handleWatch={handleWatch}></WatchList>
				<Play></Play>
			</div>
		</div>
	);
};

export default Movie;
