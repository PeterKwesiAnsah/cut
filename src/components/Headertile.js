import React, { useState, useEffect } from 'react';
import '../header.css';
import axios from 'axios';
import Rightbar from './Rightbar';
import Leftbar from './Leftbar'
import Fav from './Fav'
import Play from './Play'
import WatchList from './WatchList'

const Headertile = ({ request, imgBase_URL }) => {
/*
nice header Ids=89641
*/

	//state for the header
	const [header, setHeader] = useState({});

	const initStyle = {
		top: '0px',
		position: 'relative',
		backgroundColor: 'transparent',
	};
	const [style, setStyle] = useState(initStyle);
	const { name, overview, poster_path } = header;

	//function truncate string and returns .......
	const truncate = (str, n) => {
		if (str) {
			return str.length > n ? str.substr(0, n - 1) + '.....' : str;
		}
	};

	//Function generates random numbers based on array lenth
	const random = (arr) => {
		return Math.floor(Math.random() * arr.length);
	};
	useEffect(() => {
		let isMounted=true
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
					backgroundColor: 'var(--primary)',
				});
			} else {
				setStyle(initStyle);
			}
		});
		fetchdata();
		return ()=>{
			window.removeEventListener('scroll',this)
			isMounted=false
		}
	}, []);
	return (
		<header
			style={{ backgroundImage: `url(${imgBase_URL + poster_path})` }}
			className="header"
		>
			<div style={style} className="header-row">
				<Rightbar></Rightbar>
				<Leftbar></Leftbar>
			</div>
			<div className="header-wrapper">
				<div className="header-desc">
					<h2 className="header__title">{name}</h2>
					{/* <div className="movie-icons">
									<Fav medium liked={isLiked} handleLike={handleLike} id={id}></Fav>
									<WatchList
										medium
										watched={isWatched}
										handleWatch={handleWatch}
									></WatchList>
									<div onClick={handlePlay} className="movie-icons__play">
										<Play medium></Play>
										<span className="play-text">Play Trailer</span>
									</div>
								</div> */}
								<div className="header-overview">
								<p className="header-overview__text">{truncate(overview, 150)}</p>
								</div>
					
				</div>
			</div>
			<div className='header-filter'></div>
		</header>
	);
};

export default React.memo(Headertile);
