import React, { useState, useEffect, useContext } from 'react';
import '../header.css';
import axios from 'axios';
import Rightbar from './Rightbar';
import Leftbar from './Leftbar';
import { Link } from 'react-router-dom';
import { SetItems } from '../App';
import Playtrailer from './Playtrailer';
import NavRow from './NavRow'
// import Fav from './Fav';
//  import Play from './Play';
//  import WatchList from './WatchList';

const Headertile = ({ request, imgBase_URL }) => {
	/*
nice header Ids=89641
*/
    //State to show movie Trailer or not
	const [showTrailer, setShowTrailer] = useState(false);

	const { searchType } = useContext(SetItems);
	//state for the header
	const [header, setHeader] = useState({});

	const initStyle = {
		top: '0px',
		position: 'relative',
		backgroundColor: 'transparent',
	};
	const [style, setStyle] = useState(initStyle);
	const { id, name, overview, backdrop_path, title } = header;

	//function truncate string and returns .......
	const truncate = (str, n) => {
		if (str) {
			return str.length > n ? str.substr(0, n - 1) + '.....' : str;
		}
	};

	//allows users to play trailers
	const handleTrailer=()=>{
		setShowTrailer(true)
	}

	//Function generates random numbers based on array lenth
	const random = (arr) => {
		return Math.floor(Math.random() * arr.length);
	};
	useEffect(() => {
		let isMounted = true;
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
		//this allows you to only fetch data when the component is mounted
		if (isMounted) {
			fetchdata();
		}

		return () => {
			window.removeEventListener('scroll', this);
			isMounted = false;
		};
	}, []);
	return (
		<>
			{backdrop_path && (
				<>
				<header className='mobile-header'>
				<NavRow styles={style}></NavRow>
				</header>
					<header
						style={{ backgroundImage: `url(${imgBase_URL + backdrop_path})` }}
						className="header"
					>
						{/* <div style={style} className="header-row">
							<Rightbar></Rightbar>
							<Leftbar></Leftbar>
						</div> */}
						<NavRow styles={style}></NavRow>
						{showTrailer && (
							<Playtrailer
								showTrailer={setShowTrailer}
								name={name || title || ''}
							></Playtrailer>
						)}
						<div className="header-wrapper">
							<div className="header-desc">
								<h2 className="header__title">{name || title}</h2>

								<div className="header-overview">
									<p className="header-overview__text">
										{truncate(overview, 150)}
									</p>
								</div>
								<div className="header-btns__box">
									{searchType === 'movie' && (
										<button className="btn btn--white" onClick={handleTrailer}>Play Trailer</button>
									)}
									<Link to={`/${searchType}/${id}`}>
										<button className="btn btn--grey">More Info</button>
									</Link>
									<Link to="/myList">
										<button className="btn btn--black">My List</button>
									</Link>
								</div>
							</div>
						</div>
						<div className="header-filter"></div>
					</header>
				</>
			)}
		</>
	);
};
export default React.memo(Headertile);
