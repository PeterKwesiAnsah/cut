import React from 'react';
import { Link } from 'react-router-dom';
import '../navbar.css';

const Rightbar = () => {
	return (
		<nav>
			<ul className="navbar-list">
				<li>
					<Link className="link-item" to="/">
						Home
					</Link>
				</li>
				<li>
					<Link className="link-item">Series</Link>
				</li>
				<li>
					<Link className="link-item">Films</Link>
				</li>
				<li>
					<Link className="link-item">Latest</Link>
				</li>
				<li>
					<Link to="/myList" className="link-item">
						My List
					</Link>
				</li>
				<li>
					<Link to="/myFavorite" className="link-item">
						My Favorite
					</Link>
				</li>
			</ul>
		</nav>
	);
};

export default Rightbar;
