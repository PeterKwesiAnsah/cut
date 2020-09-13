import React, { useContext, useState, useEffect } from 'react';
import './App.css';
import Moviebox from './components/Moviebox';
const API_KEY = 'dad5bd632b1e04f64447930a6bda5cb3';
const base_URL = 'https://api.themoviedb.org/3';
const base_URL_Bulk = 'https://api.themoviedb.org/3/movie';
const imgBase_URL = 'https://image.tmdb.org/t/p/original';
const query = '';

//const getMovie=`${base_URL}/movie/${movieID}?api_key=${API_KEY}`
//const imgBase_URL="https://image.tmdb.org/t/p/original/kwUQFeFXOOpgloMgZaadhzkbTI4.jpg"

const requests = {
	queryMovies: `${base_URL}/search/movie?query=${encodeURIComponent(
		query
	)}&api_key=${API_KEY}`,

	getUpcoming: `${base_URL_Bulk}/upcoming?api_key=${API_KEY}`,
	getPopular: `${base_URL_Bulk}/now_playing?api_key=${API_KEY}`,
  getNowPlaying: `${base_URL_Bulk}/popular?api_key=${API_KEY}`,
  getTrending:` ${base_URL}/trending/all/day?api_key=${API_KEY}`
};

const App = () => {
	return (
		<main className="App">
			<h1 className="logo-title">Find the right movie for you ..... </h1>
      {/* <Moviebox
				title={'Latest Movies'}
				request={requests.getLatest}
        imgBase_URL={imgBase_URL}
        isLarge
			></Moviebox> */}
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
        { <Moviebox
				title={'Trending Now'}
				request={requests.getTrending}
        imgBase_URL={imgBase_URL}
        isLarge
			></Moviebox>}
			<Moviebox
				title={'In Cinema Now'}
				request={requests.getNowPlaying}
				imgBase_URL={imgBase_URL}
			></Moviebox>
		</main>
	);
};

export default App;
