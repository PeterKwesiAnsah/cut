import React, { useState, useEffect } from 'react';

import './App.css';
import Home from './Home';
// import Moviebox from './components/Moviebox';
import Movietile from './components/Movietile';
// import Headertile from './components/Headertile';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import MyList from './MyList';
import MyFav from './MyFavorite';
const API_KEY = 'dad5bd632b1e04f64447930a6bda5cb3';
const base_URL = 'https://api.themoviedb.org/3';
const base_URL_Bulk = 'https://api.themoviedb.org/3/movie';
const imgBase_URL = 'https://image.tmdb.org/t/p/original';
const movieReq = (movieID) => `${base_URL}/movie/${movieID}?api_key=${API_KEY}`;
const query = '';

//const imgBase_URL="https://image.tmdb.org/t/p/original/kwUQFeFXOOpgloMgZaadhzkbTI4.jpg"

const requests = {
	queryMovies: `${base_URL}/search/movie?query=${encodeURIComponent(
		query
	)}&api_key=${API_KEY}`,

	getUpcoming: `${base_URL_Bulk}/upcoming?api_key=${API_KEY}`,
	getPopular: `${base_URL_Bulk}/now_playing?api_key=${API_KEY}`,
	getNowPlaying: `${base_URL_Bulk}/popular?api_key=${API_KEY}`,
	getTrending: ` ${base_URL}/trending/all/day?api_key=${API_KEY}`,
	getTvPopular: `${base_URL}/tv/popular?api_key=${API_KEY}&language=en-US&page=1`,
	getNeflixOriginals: `${base_URL}/discover/tv?api_key=${API_KEY}&with_networks=213`,
};

export const SetItems = React.createContext();

const App = () => {
	const [likes, setLikes] = useState([]);
	const [watchList, setWatchList] = useState([]);

	//liikes and watchlist should be global and persisted using locale storage
	//Likes and watchList data will be rendered as a movie-box with their respective tittles
	/*
	1.first do it all normally
	2.if it works then you persit the data

	*/
	//use conditional rendering to render each movie poster true/false boolean...true to show the movie and it title ...false to go back to what was being rendered already
	return (
		<SetItems.Provider
			value={{
				setLikes,
				likes,
				setWatchList,
				watchList,
			}}
		>
			<Router>
				<main className="App">
					<Switch>
						<Route path="/" exact>
							<Home global={{ requests, imgBase_URL, likes, watchList }}></Home>
						</Route>
						<Route path="/movie/:id">
							<Movietile
								request={movieReq}
								global={{ setLikes, likes, setWatchList, watchList }}
							></Movietile>
						</Route>
						<Route path="/myList">
							<MyList global={{ watchList, setWatchList }}></MyList>
						</Route>
						<Route path="/myFavorite">
							<MyFav global={{ likes, setLikes }}></MyFav>
						</Route>
					</Switch>

					{/* <Moviebox
					title={'Popular Movies'}
					request={requests.getPopular}
					imgBase_URL={imgBase_URL}
				></Moviebox>
				{
					<Moviebox
						title={'Trending Now'}
						request={requests.getTrending}
						imgBase_URL={imgBase_URL}
						isLarge
					></Moviebox>
				}
				<Moviebox
					title={'In Cinema Now'}
					request={requests.getNowPlaying}
					imgBase_URL={imgBase_URL}
				></Moviebox> */}

					{/* {showTile ? (
			<>
				<Movietile
					id={movieId}
					request={movieReq}
					setShowTile={setShowTile}
					global={{ setLikes, likes, setWatchList, watchList }}
				></Movietile>
			</>
		) : (
		
		)} */}
				</main>
			</Router>
		</SetItems.Provider>
	);
};

export default App;
