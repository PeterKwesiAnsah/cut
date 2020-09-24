import React, { useState, useEffect } from 'react';
import '../header.css';
import axios from 'axios';

const Headertile = ({ request, imgBase_URL }) => {
	//state for the header
	const [header, setHeader] = useState({});

	const initStyle = {
		top: '0px',
		position: 'relative',
		backgroundColor: 'transparent',
	};
	const [style, setStyle] = useState(initStyle);

	const { original_title, overview, poster_path } = header;

	//Function generates random numbers based on array lenth
	const random = (arr) => {
		return Math.floor(Math.random() * arr.length);
	};
	useEffect(() => {
		const fetchdata = async () => {
			const movies = await axios.get(request);

			setHeader(movies.data.results[random(movies.data.results)]);
		};

		//setting up a scroll event
		window.addEventListener('scroll', () => {
			if (window.scrollY > 30) {
				setStyle({
					top: '0px',
					position: 'fixed',
					backgroundColor: 'rgb(20, 20, 20)',
				});
			} else {
				setStyle(initStyle);
			}
		});
		fetchdata();
	}, []);
	console.log(header);
	return (
		<header
			style={{ backgroundImage: `url(${imgBase_URL + poster_path})` }}
			className="header"
		>
			<div style={style} className="header-row"></div>
			<div className="header-wrapper"></div>
		</header>
	);
};

export default Headertile;
