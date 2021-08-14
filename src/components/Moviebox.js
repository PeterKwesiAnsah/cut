import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../moviebox.css';
import Movie from './Movie';
import { useLocation } from 'react-router-dom';
import { ReactComponent as Loader } from './loader.svg';
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
	const [loader, setLoader] = useState(true);

	//Get pathname from useLocation
	const { pathname } = useLocation();

	useEffect(() => {
		let isMounted = true;

		//asynchronously fetches data
		const fetchdata = async () => {
			const results = await axios.get(request);
			const movies = results.data.results;
			if (isLarge) {
				//if isLarge Props is passed reduced the array into a 4-object array
				movies.length = 4;
				setMovies(movies);
			}
			setLoader(false);
			setMovies(movies);
		};
		if (request && isMounted) {
			//if there is a request prop run the async function
			fetchdata();
		} else {
			//if there is no request prop....then obviously  there's a  movie prop passed
			setMovies(movieP);
			setLoader(false);
		}
		return () => {
			isMounted = false;
		};
	}, [movieP, request, isLarge]);

	return (
		<div
			className={`movie-box ${scroll && 'movie-box__scroll'} ${
				pathname === '/' && 'movie-box--home'
			}`}
		>
			<h1 className="movie-box__title">{title}</h1>
			{loader ? (
				<div className="movie-loader">
					<Loader></Loader>
				</div>
			) : (
				<div
					className={
						request && !search
							? `${!scroll ? 'movie-row' : 'movie-row__scroll'}`
							: 'movie-row--likes'
					}
				>
					{request
						? movies.map(({ poster_path, id, original_title, name }) => (
								<Movie
									path={imgBase_URL + poster_path}
									key={id}
									id={id}
									title={original_title || name}
									scroll={scroll}
								></Movie>
						  ))
						: movies.map(({ path, id, title, type }) => (
								<Movie
									path={path}
									key={id}
									id={id}
									title={title}
									scroll={scroll}
									type={type}
								></Movie>
						  ))}
				</div>
			)}
		</div>
	);
};

export default Moviebox;
