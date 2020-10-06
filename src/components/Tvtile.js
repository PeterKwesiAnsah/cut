import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../movietile.css';
import { Palette } from 'react-palette';
// import Play from './Play';
import Fav from './Fav';
import WatchList from './WatchList';
import convertHexToRGBA from '../hexRGB';
// import Playtrailer from './Playtrailer';
// import { SetItems } from '../App';
import { useAdded } from '../hooks/useAdded';
import { useParams,useLocation } from 'react-router-dom';
import Rightbar from './Rightbar';
import Leftbar from './Leftbar';

import '../header.css';
/* http://localhost:3000/tv/48866*/
const Tvtile = ({ request, global }) => {

	const {pathname}=useLocation()
	const type=pathname.split('/')[1]

	//movie tile needs work
	const id = parseInt(useParams().id);

	// //(you can get rid of the url state since the image url can be found in the move state data)
	// const [url, setURL] = useState('');
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
	// console.log(
	// 	likes.includes({ id, path: url, title: original_title })
	// );
	// console.log(typeof likes[0].id)
	// console.table(likes)
	//use to determine if a movie poster is liked or not
	// const [liked, setLiked] = useState(isLiked);
	// const [watched, setWatched] = useState(isWatched);

	// if (isLiked && !liked) {
	// 	setLiked(true);
	// } else if (isWatched && !watched) {
	// 	setWatched(true);
	// }

	// if (!isLiked && liked) {
	// 	setLiked(false);
	// } else if (!isWatched && watched) {
	// 	setWatched(false);
	// }

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
		const fetchData = async () => {
			const movie = await axios.get(request(id, type));
			setMovie(movie.data);
			// setURL(`https://image.tmdb.org/t/p/original${movie.data.poster_path}`);
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

	//function returns span of the creators in the created_by array
	const getCreator = (creators) =>
		creators.map(({ name, id }) => (
			<span className="movie-creator" key={id}>
				{name}
			</span>
		));

	// //function handles showing the moviePosters
	// const handleClick = () => [setShowTile(false)];

	//function handles youtube trailer
	// const handlePlay = () => {
	// 	setShowTrailer(true);
	// };

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

				//write logic here
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
						{/* {showTrailer && (
							<Playtrailer
								showTrailer={setShowTrailer}
								name={name || movie.title || ''}
							></Playtrailer>
						)} */}
						{/* <Link to='/'>
						<Close></Close>
						</Link> */}

						<div className="movie-container">
							<div className="header-row header-row__tile">
								<Rightbar></Rightbar>
								<Leftbar></Leftbar>
							</div>
							<div style={{ display: 'flex' }}>
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
										{/* <div onClick={handlePlay} className="movie-icons__play">
											<Play medium></Play>
											<span className="play-text">Play Trailer</span>
										</div> */}
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
/*[
  {
    "name": "Params",
    "subHooks": [
      {
        "name": "Context",
        "value": {
          "history": "{action: \"PUSH\", block: ƒ block() {}, createHref: ƒ…}",
          "location": "{hash: \"\", key: \"vqa7xs\", pathname: \"/tv/63174\", se…}",
          "match": "{isExact: true, params: {…}, path: \"/tv/:id\", url: …}"
        },
        "subHooks": []
      }
    ]
  },
  {
    "name": "State",
    "value": "https://image.tmdb.org/t/p/original/4EYPN5mVIhKLfxGruy7Dy41dTVn.jpg",
    "subHooks": []
  },
  {
    "name": "State",
    "value": {
      "backdrop_path": "/ta5oblpMlEcIPIS2YGcq9XEkWK2.jpg",
      "created_by": "[{…}]",
      "episode_run_time": [
        45
      ],
      "first_air_date": "2016-01-25",
      "genres": "[{…}, {…}]",
      "homepage": "https://www.netflix.com/title/80057918",
      "id": 63174,
      "in_production": true,
      "languages": "[\"en\"]",
      "last_air_date": "2020-08-21",
      "last_episode_to_air": "{air_date: \"2020-08-21\", episode_number: 8, id: 239…}",
      "name": "Lucifer",
      "next_episode_to_air": null,
      "networks": "[{…}, {…}]",
      "number_of_episodes": 75,
      "number_of_seasons": 5,
      "origin_country": "[\"US\"]",
      "original_language": "en",
      "original_name": "Lucifer",
      "overview": "Bored and unhappy as the Lord of Hell, Lucifer Morningstar abandoned his throne and retired to Los Angeles, where he has teamed up with LAPD detective Chloe Decker to take down criminals. But the longer he's away from the underworld, the greater the threat that the worst of humanity could escape.",
      "popularity": 1026.327,
      "poster_path": "/4EYPN5mVIhKLfxGruy7Dy41dTVn.jpg",
      "production_companies": "[{…}, {…}, {…}, {…}, {…}]",
      "seasons": "[{…}, {…}, {…}, {…}, {…}, {…}]",
      "status": "Returning Series",
      "type": "Scripted",
      "vote_average": 8.5,
      "vote_count": 5463
    },
    "subHooks": []
  },
  {
    "name": "State",
    "value": false,
    "subHooks": []
  },
  {
    "name": "Effect",
    "value": "ƒ () {}",
    "subHooks": []
  }
] */
export default React.memo(Tvtile);
