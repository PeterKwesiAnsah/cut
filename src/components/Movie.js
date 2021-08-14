import React, { useContext, useEffect, useState } from 'react';
import '../movie.css';
import Play from './Play';
import Fav from './Fav';
import WatchList from './WatchList';
import { SetItems } from '../App';
import { useAdded } from '../hooks/useAdded';
import { Link } from 'react-router-dom';
import Playtrailer from './Playtrailer';
import useIntersectionObserver from '../hooks/useIntersectionObserver';
import Skeleton from './Skeleton';
const GreyBackGround =
	'https://www.solidbackgrounds.com/images/640x960/640x960-gray-web-gray-solid-color-background.jpg';
const Movie = ({ path, id, title, scroll, type }) => {
	const { setLikes, likes, setWatchList, watchList, searchType } =
		useContext(SetItems);

	//State to show movie Trailer or not
	const [showTrailer, setShowTrailer] = useState(false);
	const moviePosterRef = React.useRef();
	const entry = useIntersectionObserver(moviePosterRef, {});
	const [isImageLoaded, setIsImageLoaded] = useState(false);
	const handleOnload = () => {
		console.log("i'm loaded");
		setIsImageLoaded(true);
	};

	//allows users to play trailers
	const handleTrailer = () => {
		setShowTrailer(true);
	};

	const [isLiked] = useAdded(likes, id);
	const [isWatched] = useAdded(watchList, id);
	//use to determine if a movie poster is liked or not
	const [liked, setLiked] = useState(isLiked);
	const [watched, setWatched] = useState(isWatched);

	//Allows every movie component with the same id to share the same state
	useEffect(() => {
		setLiked(isLiked);
		setWatched(isWatched);
	}, [likes, watchList]);

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
			setLikes([...likes, { id, title, path, type: searchType }]);
		}

		//setLikes([...likes,{id,title,path}])
	};

	//shows weather to display play button or not
	const showPlayButton = () => {
		if (type) {
			return type === 'movie';
		} else {
			return searchType === 'movie';
		}
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
			setWatchList([...watchList, { id, title, path, type: searchType }]);
		}

		//setLikes([...likes,{id,title,path}])
	};
	//if the imgage source is  null don't render

	return (
		<>
			{!path.includes('undefined') && !path.includes('null') && (
				<>
					{showTrailer && (
						<Playtrailer
							showTrailer={setShowTrailer}
							name={title || ''}
						></Playtrailer>
					)}
					<div className="movie-poster-box" ref={moviePosterRef}>
						{/* <Link to={`/${type || searchType}/${id}`}>
						<img
							src={path}
							alt="movie posters"
							className={`movie-poster ${scroll && 'movie-poster__scroll'}`}
						></img>
						</Link>
					
						<Link to={`/${type || searchType}/${id}`}>
							<div className="movie-poster__filter"></div>
						</Link>
						<div className={`icon-box ${(searchType === 'tv' || type==='tv') && 'icon-box--tv'} `}>
							<Fav liked={liked} handleLike={handleLike}></Fav>
							<WatchList
								watched={watched}
								handleWatch={handleWatch}
							></WatchList>
							{showPlayButton() && <Play  handlePlay={handleTrailer}></Play>}
						</div> */}

						{entry?.isIntersecting ? (
							<>
								<Link to={`/${type || searchType}/${id}`}>
									<img
										src={!isImageLoaded ? GreyBackGround : path}
										alt="movie posters"
										className={`movie-poster ${
											scroll && 'movie-poster__scroll'
										}`}
										// style={
										// 	!isImageLoaded
										// 		? { visibility: 'none', display: 'none' }
										// 		: { visibility: 'visible', display: 'block' }
										// }
										onLoad={handleOnload}
									></img>
									{/* <Skeleton
										style={
											isImageLoaded
												? { visibility: 'none', display: 'none' }
												: { visibility: 'visible', display: 'block' }
										}
										className={`movie-poster ${
											scroll && 'movie-poster__scroll'
										}`}
									></Skeleton> */}
								</Link>

								<Link to={`/${type || searchType}/${id}`}>
									<div className="movie-poster__filter"></div>
								</Link>
								<div
									className={`icon-box ${
										(searchType === 'tv' || type === 'tv') && 'icon-box--tv'
									} `}
								>
									<Fav liked={liked} handleLike={handleLike}></Fav>
									<WatchList
										watched={watched}
										handleWatch={handleWatch}
									></WatchList>
									{showPlayButton() && <Play handlePlay={handleTrailer}></Play>}
								</div>
							</>
						) : (
							<Skeleton></Skeleton>
						)}
					</div>
				</>
			)}
		</>
	);
};

export default Movie;
