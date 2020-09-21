import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../movietile.css';
import { Palette } from 'react-palette';
import Play from './Play';
import Fav from './Fav';
import WatchList from './WatchList';
import { ReactComponent as Close } from './close.svg';
import convertHexToRGBA from '../hexRGB';
import Playtrailer from './Playtrailer';
// import { SetItems } from '../App';
import { useAdded } from '../hooks/useAdded';

const Movietile = ({ id, request, setShowTile, global }) => {
	const [url, setURL] = useState('');
	//Creating a state for movie data from fetch
	const [movie, setMovie] = useState({});
	//deconstructing the movie object for necessary information to render
	const { original_title, overview, tagline, runtime, genres } = movie;

	//State to show movie Trailer or not
	const [showTrailer, setShowTrailer] = useState(false);
	//Global likes and watchList state
	const { setLikes, likes, setWatchList, watchList } = global;
	//searches for an item with id inside an array of items
	const [isLiked] = useAdded(likes, id);
	const [isWatched] = useAdded(watchList, id);

	const handleLike = () => {
		//if movie is liked,remove it
		if (isLiked) {
			//remove the movie from likes
			const filterdMovies = likes.filter((movie) => movie.id !== id);
			//update likes with the filtered movies
			setLikes(filterdMovies);
		}
		//if movie is not liked,add it
		else {
			//add the movie to the likes
			setLikes([...likes, { id, title: original_title, path: url }]);
		}

		//setLikes([...likes,{id,title:original_title,path:url}])
	};

	const handleWatch = () => {
		//if movie is  added to the watch,remove it
		if (isWatched) {
			//remove the already added movie from watch
			/*
			1.use filter function
			*/
			const filterdList = watchList.filter((movie) => movie.id !== id);
			setWatchList(filterdList);
		}
		//if movie is  not added to the watch,add it
		else {
			//add the movie to the watchList
			setWatchList([...watchList, { id, title: original_title, path: url }]);
		}

		//setLikes([...likes,{id,title:original_title,path:url}])
	};

	useEffect(() => {
		const fetchData = async () => {
			const movie = await axios.get(request(id));
			setMovie(movie.data);
			setURL(`https://image.tmdb.org/t/p/original${movie.data.poster_path}`);
		};
		fetchData();
	}, []);
	//function returns span of genres in the genres array
	const getGenre = (genres) =>
		genres.map(({ name, id }) => (
			<span className="movie-genre" key={id}>
				{name}
			</span>
		));

	//function handles showing the moviePosters
	const handleClick = () => [setShowTile(false)];

	//function handles youtube trailer
	const handlePlay = () => {
		setShowTrailer(true);
	};

	return (
		<Palette src={url}>
			{({ data, loading, error }) => {
				const { darkMuted, darkVibrant, lightMuted, lightVibrant } = data;

				//Hex code color conversion for linear gradient

				const rgba = {
					darkVibrant: convertHexToRGBA(darkVibrant, 72),
					darkMuted: convertHexToRGBA(darkMuted, 72),
					lightMuted: convertHexToRGBA(lightMuted, 52),
					lightVibrant: convertHexToRGBA(lightVibrant, 52),
				};

				//write logic here
				return (
					<div
						style={{
							backgroundImage: `linear-gradient(to right,${rgba.darkMuted},${rgba.lightVibrant}),url(${url})`,
						}}
						className="movie-tile"
					>
						{showTrailer && (
							<Playtrailer
								showTrailer={setShowTrailer}
								name={original_title || movie.title || ''}
							></Playtrailer>
						)}
						<Close onClick={handleClick}></Close>
						<div className="movie-container">
							<div
								className="movie-card"
								style={{ backgroundImage: `url(${url})` }}
								alt="movie-card"
							></div>
							<div className="movie-desc">
								<div className="movie-title">
									<h2 className="movie-title__header">{original_title}</h2>
									<div className="movie-title__genre">
										{genres && getGenre(genres)}
										<span className="movie-period">.</span>
										<span className="movie-runtime">{runtime} mins</span>
									</div>
								</div>
								<div className="movie-icons">
									<Fav medium liked={isLiked} handleLike={handleLike}></Fav>
									<WatchList
										medium
										watched={isWatched}
										handleWatch={handleWatch}
									></WatchList>
									<div onClick={handlePlay} className="movie-icons__play">
										<Play medium></Play>
										<span className="play-text">Play Trailer</span>
									</div>
								</div>
								<p className="movie-tagline">{tagline}</p>
								<div className="movie-overview">
									<h3>Overview</h3>
									{overview}
								</div>
							</div>
						</div>
					</div>
				);
			}}
		</Palette>
	);
};

export default React.memo(Movietile);
