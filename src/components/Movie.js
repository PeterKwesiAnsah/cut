import React, { useContext, useState, useEffect } from 'react';
import '../movie.css';
import Play from './Play';
import Fav from './Fav';
import WatchList from './WatchList';
import { SetItems } from '../App';
import { useAdded } from '../hooks/useAdded';
import { Link,useLocation } from 'react-router-dom';

const Movie = ({ path, id, title, scroll }) => {
	//gets me the current url's pathname 
		const {pathname}=useLocation()
	const { setLikes, likes, setWatchList, watchList ,searchType} = useContext(SetItems);

	const [isLiked] = useAdded(likes, id);
	const [isWatched] = useAdded(watchList, id);
	//use to determine if a movie poster is liked or not
	const [liked, setLiked] = useState(isLiked);
	const [watched, setWatched] = useState(isWatched);

	// if (isLiked && !liked) {
	// 	setLiked(true);
	// } else if (isWatched && !watched) {
	// 	setWatched(true);
	// }

	//function determines if a function is Liked or not
	// const isLiked = () => {
	// 	const filterdMovies = likes.filter((movie) => movie.id === id);
	// 	return filterdMovies.length;
	// };

	// const isWatched = () => {
	// 	const filterdList = watchList.filter((movie) => movie.id === id);
	// 	return filterdList.length;
	// };

	//if state is true and you cant find the movie in the likes array set liked to false
	// if (!isLiked && liked) {
	// 	setLiked(false);
	// } else if (!isWatched && watched) {
	// 	setWatched(false);
	// }
	//liked/watched movies should have the liked/

	// //handles the click event
	// const handleClick = (e) => {
	// 	if (
	// 		e.target.matches('.movie-poster-box') ||
	// 		e.target.matches('.movie-poster__filter')
	// 	) {
	// 		setMovieId(id);
	// 		setShowTile(true);
	// 	}
	// };

	//used to set
	const handleLike = () => {
		//if movie is liked,remove it
		if (liked) {
			//you can refacter this out i think when you are cleaning up the code
			setLiked(false);
			//remove the movie from likes
			const filterdMovies = likes.filter((movie) => movie.id !== id);
			//update likes with the filtered movies
			setLikes(filterdMovies);
		}
		//if movie is not liked,add it
		else {
			setLiked(true);

			//add the movie to the likes
			setLikes([...likes, { id, title, path }]);
		}

		//setLikes([...likes,{id,title,path}])
	};

	const handleWatch = () => {
		//if movie is  added to the watch,remove it
		if (watched) {
			setWatched(false);
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
			//add the movie to the watchList
			setWatchList([...watchList, { id, title, path }]);
		}

		//setLikes([...likes,{id,title,path}])
	};
	//if the imgage source is  null don't render

	return (
		<>
		{ (!path.includes('undefined') && !path.includes('null') ) &&
			<>
			<div className="movie-poster-box">
			<img
				src={path}
				alt="movie posters"
				className={`movie-poster ${scroll && 'movie-poster__scroll'}`}
			></img>
			<Link to={`/${searchType}/${id}`}>
				<div className="movie-poster__filter"></div>
			</Link>
			<div className="icon-box">
				<Fav liked={liked} handleLike={handleLike}></Fav>
				<WatchList watched={watched} handleWatch={handleWatch}></WatchList>
				<Play></Play>
			</div>
		</div>
		</>
		}
		</>
		
	
		
	);
};

export default Movie;
