import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import '../moviebox.css';
import Movie from './Movie';
const Moviebox = ({ title, request, imgBase_URL, isLarge, movieP }) => {
	const [movies, setMovies] = useState([]);

	useEffect(() => {
		const fetchdata = async () => {
			const results = await axios.get(request);
			const movies = results.data.results;
			if (isLarge) {
				//if isLarge Props is passed reduced the array into a 4-object array
				movies.length = 4;
				setMovies(movies);
			}
			//console.log(movies)
			setMovies(movies);
		};
		if (request) {
			//if there is a request prop run the async function
			fetchdata();
		} else {
			//if there is no request prop....then obviously  there's a  movie prop passed
			setMovies(movieP);
		}
	}, [movieP]);

	return (
		<div className="movie-box">
			<h1 className="movie-box__title">{title}</h1>

			<div className={request ? 'movie-row' : 'movie-row--likes'}>
				{request
					? movies.map(({ poster_path, id, original_title }) => (
							<Movie
								path={imgBase_URL + poster_path}
								key={id}
								id={id}
								title={original_title}
							></Movie>
					  ))
					: movies.map(({ path, id, title }) => (
							<Movie path={path} key={id} id={id} title={title}></Movie>
					  ))}
			</div>
		</div>
	);
};

export default React.memo(Moviebox);
