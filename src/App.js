import React, { useContext, useState, useEffect } from 'react';


import './App.css';
import Moviebox from './components/Moviebox';
import Movietile from './components/Movietile';
const API_KEY = 'dad5bd632b1e04f64447930a6bda5cb3';
const base_URL = 'https://api.themoviedb.org/3';
const base_URL_Bulk = 'https://api.themoviedb.org/3/movie';
const imgBase_URL = 'https://image.tmdb.org/t/p/original';
const movieReq=(movieID)=>`${base_URL}/movie/${movieID}?api_key=${API_KEY}`
const query = '';

//
//const imgBase_URL="https://image.tmdb.org/t/p/original/kwUQFeFXOOpgloMgZaadhzkbTI4.jpg"


	

const requests = {
	queryMovies: `${base_URL}/search/movie?query=${encodeURIComponent(
		query
	)}&api_key=${API_KEY}`,

	getUpcoming: `${base_URL_Bulk}/upcoming?api_key=${API_KEY}`,
	getPopular: `${base_URL_Bulk}/now_playing?api_key=${API_KEY}`,
	getNowPlaying: `${base_URL_Bulk}/popular?api_key=${API_KEY}`,
	getTrending: ` ${base_URL}/trending/all/day?api_key=${API_KEY}`,
};

 export const SetItems = React.createContext();

const App = () => {
	const [movieId, setMovieId] = useState(0);
	const [showTile, setShowTile] = useState(false);
	//use conditional rendering to render each movie poster true/false boolean...true to show the movie and it title ...false to go back to what was being rendered already
	return (
		<SetItems.Provider value={{setMovieId,setShowTile}}>
			<main className="App">
				<h1 className="logo-title">Find the right movie for you ..... </h1>

				{showTile ? (
					<><Movietile id={movieId} request={movieReq}></Movietile></>
				) : (
					<>
						<Moviebox
							title={'Upcoming Movies'}
							request={requests.getUpcoming}
							imgBase_URL={imgBase_URL}
						></Moviebox>
						<Moviebox
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
						></Moviebox>
					</>
				)}
			</main>
		</SetItems.Provider>
	);
};

export default App;
