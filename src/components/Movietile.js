import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../movietile.css';
import { Palette } from 'react-palette';
import { ReactComponent as Fav } from './fav.svg';
import { ReactComponent as Play } from './play.svg';
import { ReactComponent as Watch } from './watchlist.svg';

const Movietile = ({ id, request }) => {
	const [url, setURL] = useState('');
	//Creating a state for movie data from fetch
	const [movie, setMovie] = useState({});

	useEffect(() => {
		const fetchData = async () => {
			const movie = await axios.get(request(id));
			setMovie(movie.data);
			setURL(`https://image.tmdb.org/t/p/original${movie.data.poster_path}`);
		};
		fetchData();
	}, []);
//function returns span of genres in the genres array
const getGenre = (genres) => genres.map(({ name ,id}) => <span className='movie-genre' key={id}>{name}</span>);

/*

c
*/
	console.log(movie);
	/*
	original_language: "en"
original_title: "Tenet"
overview: "Armed with only one word - Tenet - and fighting for the survival of the entire world, the Protagonist journeys through a twilight world of international espionage on a mission that will unfold in something beyond real time."
popularity: 274.155
poster_path: "/k68nPLbIST6NP96JmTxmZijEvCA.jpg"
production_companies: (2) [{…}, {…}]
production_countries: (3) [{…}, {…}, {…}]
release_date: "2020-08-22"
revenue: 146200000
runtime: 150
spoken_languages: [{…}]
status: "Released"
tagline: "Time runs out."
title: "Tenet"
video: false
vote_average: 7.5
vote_count: 1557
genres: Array(3)
0: {id: 28, name: "Action"}
1: {id: 53, name: "Thriller"}
2: {id: 878, name: "Science Fiction"}
	*/

	return (
		<Palette src={url}>
			{({ data, loading, error }) => {
				const { vibrant } = data;

				//deconstructing the movie object for necessary information to render
				const { original_title, overview, tagline, runtime,genres } = movie;
				//

				//write logic here
				return (
					<div
						style={{
							backgroundImage: `url(${url})`,
							backgroundColor: vibrant, //use gradient
							backgroundBlendMode: 'overlay',
						}}
						className="movie-tile"
					>
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
									<span className='movie-period'>.</span>
									<span className='movie-runtime'>{runtime} mins</span>
									</div>
								</div>
								<div className="movie-icons">
									<Fav></Fav>
									<Play></Play>
									<Watch></Watch>
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

export default Movietile;
