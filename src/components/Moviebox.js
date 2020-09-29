import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../moviebox.css';
import Movie from './Movie';

const Moviebox = ({
	title,
	request,
	imgBase_URL,
	isLarge,
	movieP,
	scroll,
	search,
}) => {
	const [movies, setMovies] = useState([]);
	// const [empty,setEmpty]=useState(t)
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
	}, [movieP, request, isLarge]);

	return (
		<div className={`movie-box ${scroll && 'movie-box__scroll'}`}>
			<h1 className="movie-box__title">{title}</h1>

			<div
				className={
					request && !search
						? `${!scroll ? 'movie-row' : 'movie-row__scroll'}`
						: 'movie-row--likes'
				}
			>
				{request
					? movies.map(({ poster_path, id, original_title }) => (
							<Movie
								path={imgBase_URL + poster_path}
								key={id}
								id={id}
								title={original_title}
								scroll={scroll}
							></Movie>
					  ))
					: movies.map(({ path, id, title }) => (
							<Movie
								path={path}
								key={id}
								id={id}
								title={title}
								scroll={scroll}
							></Movie>
					  ))}
			</div>
		</div>
	);
};

export default Moviebox;
