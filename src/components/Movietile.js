import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../movietile.css';
import { Palette } from 'react-palette';
import { ReactComponent as Fav } from './fav.svg';
import { ReactComponent as Play } from './play.svg';
import { ReactComponent as Watch } from './watchlist.svg';
import { ReactComponent as Close } from './close.svg';

import convertHexToRGBA from '../hexRGB';
import Playtrailer from './Playtrailer';
import Movie from './Movie';

const Movietile = ({ id, request, setShowTile }) => {
	const [url, setURL] = useState('');
	//Creating a state for movie data from fetch
	const [movie, setMovie] = useState({});
	//State to show movie Trailer or not
	const [showTrailer, setShowTrailer] = useState(false);

	//SVG style
	const svgStyle = {
		width: '3.5rem',
		height: '3.5rem',
		cursor: 'pointer',
	};

	useEffect(() => {
		const fetchData = async () => {
			const movie = await axios.get(request(id));
			setMovie(movie.data);
			setURL(`https://image.tmdb.org/t/p/original${movie.data.poster_path}`);
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

	//function handles showing the moviePosters
	const handleClick = () => [setShowTile(false)];

	//function handles youtube trailer
	const handlePlay = () => {
		setShowTrailer(true)
	};

	return (
		<Palette src={url}>
			{({ data, loading, error }) => {
				const { darkMuted, darkVibrant, lightMuted, lightVibrant } = data;

				//Hex code color conversion for linear gradient

				const rgba = {
					darkVibrant: convertHexToRGBA(darkVibrant, 72),
					darkMuted: convertHexToRGBA(darkMuted, 72),
					lightMuted: convertHexToRGBA(lightMuted, 52),
					lightVibrant: convertHexToRGBA(lightVibrant, 52),
				};

				//deconstructing the movie object for necessary information to render
				const { original_title, overview, tagline, runtime, genres } = movie;
				//

				//write logic here
				return (
					<div
						style={{
							backgroundImage: `linear-gradient(to right,${rgba.darkMuted},${rgba.lightVibrant}),url(${url})`,
						}}
						className="movie-tile"
					>
					{showTrailer && <Playtrailer showTrailer={setShowTrailer} name={original_title || movie.title || ""}></Playtrailer>}
						<Close onClick={handleClick}></Close>
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
										<span className="movie-period">.</span>
										<span className="movie-runtime">{runtime} mins</span>
									</div>
								</div>
								<div className="movie-icons">
									<Fav style={svgStyle}></Fav>
									<Watch style={svgStyle}></Watch>
									<div className="movie-icons__play">
										<Play style={svgStyle} onClick={handlePlay}></Play>
										<span className="play-text">Play Trailer</span>
									</div>
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
