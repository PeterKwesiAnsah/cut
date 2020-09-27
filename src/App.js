import React, { useState, useEffect } from 'react';

import './App.css';
import Home from './Home';
// import Moviebox from './components/Moviebox';
import Movietile from './components/Movietile';
// import Headertile from './components/Headertile';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import MyList from './MyList';
import MyFav from './MyFavorite';

import { useLocal } from './hooks/useLocal';
import Search from './Search';
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
	const [initLikes, initWatch] = useLocal('likes', 'watchList');
	const [likes, setLikes] = useState(initLikes || []);
	const [watchList, setWatchList] = useState(initWatch || []);

	//state to handle search
	const [search,setSearch]=useState('')

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
				sethide
				
			}}
		>
			<Router>
				<main className="App">
					<Switch>
						<Route path="/search">
							<Search></Search>
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
