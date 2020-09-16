import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import '../movietile.css';
import { Palette } from 'react-palette';

const Movietile = ({ id, request, movieId }) => {
	const [backStyle, setBackStyle] = useState({
		backgroundImage: `linear-gradient(to right, #0f2027, #203a43, #2c5364)`,
	});

	const [url, setURL] = useState('');
	// const {data,error}=usePalette(url)
	// if(Object.keys(data).length){
	// 	console.log(data)
	// 	setBackStyle({backgroundImage: `linear-gradient(to right, ${data.darkMuted}, ${data.darkVibrant}, ${data.lightVibrant})`})
	// }

	// const memoFetch=useCallback(()=>{

	// })
	console.log('ABC');
	useEffect(() => {
		const fetchData = async () => {
			const movie = await axios.get(request(id));
			setURL(`https://image.tmdb.org/t/p/original${movie.data.backdrop_path}`);

			// setBackStyle({
			// 	backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.data.backdrop_path})`,
			// });
		};
		fetchData();
	}, []);

	// return <div style={backStyle} className="movie-tile"></div>;
	return (
		<Palette src={url}>
			{({ data, loading, error }) => {
				const{vibrant}=data

				//write logic here
				return (
					<div
						style={{
							backgroundImage: `url(${url})`,
							backgroundColor:vibrant,
							backgroundBlendMode:"overlay"
						}}
						className="movie-tile"
					></div>
				);
			}}
		</Palette>
	);
};

export default Movietile;
