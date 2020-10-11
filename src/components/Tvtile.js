import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../movietile.css';
import { Palette } from 'react-palette';
import Fav from './Fav';
import WatchList from './WatchList';
import convertHexToRGBA from '../hexRGB';
import { useAdded } from '../hooks/useAdded';
import { useParams,useLocation } from 'react-router-dom';
import Rightbar from './Rightbar';
import Leftbar from './Leftbar';

import '../header.css';

const Tvtile = ({ request, global }) => {

	const {pathname}=useLocation()
	const type=pathname.split('/')[1]

	//movie tile needs work
	const id = parseInt(useParams().id);

	//Creating a state for movie data from fetch
	const [movie, setMovie] = useState({});

	//deconstructing the movie object for necessary information to render
	const {
		name,
		overview,
		tagline,
		episode_run_time,
		genres,
		backdrop_path,
		poster_path,
		created_by,
		number_of_seasons,
	} = movie;

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
			setLikes([
				...likes,
				{
					id,
					title: name,
					path: `https://image.tmdb.org/t/p/original${poster_path}`,
					type
				},
			]);
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
			setWatchList([
				...watchList,
				{
					id,
					title: name,
					path: `https://image.tmdb.org/t/p/original${poster_path}`,
					type
				},
			]);
		}

		//setLikes([...likes,{id,title:original_title,path:url}])
	};

	useEffect(() => {
		let isMounted = true;
		const fetchData = async () => {
			const movie = await axios.get(request(id, type));
			setMovie(movie.data);
			// setURL(`https://image.tmdb.org/t/p/original${movie.data.poster_path}`);
		};
		if(isMounted){
			fetchData();
		}
		return ()=>{
			isMounted=false;
		}
		
	}, []);
	//function returns span of genres in the genres array
	const getGenre = (genres) =>
		genres.map(({ name, id }) => (
			<span className="movie-genre" key={id}>
				{name}
			</span>
		));

	//function returns span of the creators in the created_by array
	const getCreator = (creators) =>
		creators.map(({ name, id }) => (
			<span className="movie-creator" key={id}>
				{name}
			</span>
		));

	return (
		<Palette
			src={
				poster_path ? `https://image.tmdb.org/t/p/original${poster_path}` : ''
			}
		>
			{({ data, loading, error }) => {
				const { darkMuted, darkVibrant, lightMuted, lightVibrant } = data;

				//Hex code color conversion for linear gradient

				const rgba = {
					darkVibrant: convertHexToRGBA(darkVibrant, 80),
					darkMuted: convertHexToRGBA(darkMuted, 80),
					lightMuted: convertHexToRGBA(lightMuted, 60),
					lightVibrant: convertHexToRGBA(lightVibrant, 60),
				};

				
				return (
					<div
						style={{
							backgroundImage: `linear-gradient(to right,${rgba.darkVibrant},${
								rgba.darkVibrant
							}),url(${
								backdrop_path
									? `https://image.tmdb.org/t/p/original${backdrop_path}`
									: ''
							})`,
						}}
						className="movie-tile"
					>

						<div className="movie-container">
							<div className="header-row header-row__tile">
								<Rightbar></Rightbar>
								<Leftbar></Leftbar>
							</div>
							<div className='movie-parentbox'>
								<div
									className="movie-card"
									style={{
										backgroundImage: `url(${
											poster_path
												? `https://image.tmdb.org/t/p/original${poster_path}`
												: ''
										})`,
									}}
									alt="movie-card"
								></div>
								<div className="movie-desc">
									<div className="movie-title">
										<h2 className="movie-title__header">{name}</h2>
										<div className="movie-title__genre">
											{genres && getGenre(genres)}
											<span className="movie-period">.</span>
											<span className="movie-runtime">
												{episode_run_time && episode_run_time[0]} mins
											</span>
										</div>
									</div>
									<div className="movie-icons">
										<Fav
											medium
											liked={isLiked}
											handleLike={handleLike}
											id={id}
										></Fav>
										<WatchList
											medium
											watched={isWatched}
											handleWatch={handleWatch}
										></WatchList>
										<h1 className='season-text'>
											{`${number_of_seasons} Season${number_of_seasons > 1 ?'s':''}`}
										</h1>
			
									</div>
									<p className="movie-tagline">{tagline}</p>
									<div className="movie-overview">
										<h3>Overview</h3>
										<p>{overview}</p>
									</div>

									<div className="creators-list">
										<h1>Created by</h1>
										{created_by && getCreator(created_by)}
									</div>
								</div>
							</div>
						</div>
					</div>
				);
			}}
		</Palette>
	);
};

export default React.memo(Tvtile);
