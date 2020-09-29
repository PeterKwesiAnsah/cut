import React, { useState, useEffect } from 'react';

import './App.css';
import Home from './Home';
// import Moviebox from './components/Moviebox';
import Movietile from './components/Movietile';
import Tvtile from './components/Tvtile';
// import Headertile from './components/Headertile';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import MyList from './MyList';
import MyFav from './MyFavorite';
import Series from './Series';

import { useLocal } from './hooks/useLocal';
import Search from './Search';
const API_KEY = 'dad5bd632b1e04f64447930a6bda5cb3';
const base_URL = 'https://api.themoviedb.org/3';
const base_URL_Bulk = 'https://api.themoviedb.org/3/movie';
const imgBase_URL = 'https://image.tmdb.org/t/p/original';
const getItem = (ID,type) => `${base_URL}/${type}/${ID}?api_key=${API_KEY}`;
const tvReq = (tvID) => `${base_URL}/tv/${tvID}?api_key=${API_KEY}`;
const searchQuery = (query,type) =>
	`${base_URL}/search/${type}?query=${encodeURIComponent(
		query
	)}&api_key=${API_KEY}`;
// const tvSearch = (query) =>
// 	`${base_URL}/search/tv?query=${encodeURIComponent(query)}&api_key=${API_KEY}`;

//const imgBase_URL="https://image.tmdb.org/t/p/original/kwUQFeFXOOpgloMgZaadhzkbTI4.jpg"

const requests = {
	getUpcoming: `${base_URL_Bulk}/upcoming?api_key=${API_KEY}`,
	getPopular: `${base_URL_Bulk}/now_playing?api_key=${API_KEY}`,
	getNowPlaying: `${base_URL_Bulk}/popular?api_key=${API_KEY}`,
	getTrending: ` ${base_URL}/trending/all/day?api_key=${API_KEY}`,
	getTvPopular: `${base_URL}/tv/popular?api_key=${API_KEY}&language=en-US&page=1`,
	getNeflixOriginals: `${base_URL}/discover/tv?api_key=${API_KEY}&with_networks=213`,
};

const tvRequests = {
	getLatest: `${base_URL}/tv/latest?api_key=${API_KEY}&language=en-US`,
	getAirToday: `${base_URL}/tv/airing_today?api_key=${API_KEY}&language=en-US&page=1`,
	getTvPopular: `${base_URL}/tv/popular?api_key=${API_KEY}&language=en-US&page=1`,
	getTopRated: `${base_URL}/tv/top_rated?api_key=${API_KEY}&language=en-US&page=1`,
	getAiring: `${base_URL}/tv/on_the_air?api_key=${API_KEY}&language=en-US&page=1`,
};

export const SetItems = React.createContext();

const App = () => {
	const [initLikes, initWatch] = useLocal('likes', 'watchList');
	const [likes, setLikes] = useState(initLikes || []);
	const [watchList, setWatchList] = useState(initWatch || []);

	//state to handle search
	const [search, setSearch] = useState('');

	//use to determine the type of search request to provide
	const [searchType, setSearchType] = useState('movie');

	//state is used to show or hide bars
	const [hide, sethide] = useState(true);

	//liikes and watchlist should be global and persisted using locale storage
	useEffect(() => {
		//converts the array into string to be be persited in local
		const stringLikes = JSON.stringify(likes);
		const stringWatch = JSON.stringify(watchList);

		localStorage.setItem('likes', stringLikes);
		localStorage.setItem('watchList', stringWatch);
	}, [likes, watchList]);

	return (
		<SetItems.Provider
			value={{
				setLikes,
				likes,
				setWatchList,
				watchList,
				search,
				setSearch,
				hide,
				sethide,
				searchType,
				setSearchType,
			}}
		>
			<Router>
				<main className="App">
					<Switch>
						<Route path="/search">
							<Search
								global={{ imgBase_URL }}
								request={searchQuery(search,searchType)}
								type={searchType}
							></Search>
						</Route>
						<Route path="/movie/:id">
							<Movietile
								request={getItem}
								global={{ setLikes, likes, setWatchList, watchList }}
								type={searchType}
							></Movietile>
						</Route>
						<Route path="/tv/:id">
							<Tvtile
								request={getItem}
								global={{ setLikes, likes, setWatchList, watchList }}
								type={searchType}
							></Tvtile>
						</Route>

						<Route path="/myList">
							<MyList global={{ watchList, setWatchList }}></MyList>
						</Route>
						<Route path="/myFavorite">
							<MyFav global={{ likes, setLikes }}></MyFav>
						</Route>
						<Route path="/series">
							<Series
								global={{ tvRequests, imgBase_URL, likes, watchList }}
							></Series>
						</Route>
						<Route path="/" exact>
							<Home global={{ requests, imgBase_URL, likes, watchList }}></Home>
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
