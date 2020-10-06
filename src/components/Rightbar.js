import React from 'react';
import { NavLink } from 'react-router-dom';
import '../navbar.css';

const Rightbar = () => {
	return (
		<nav>
			<ul className="navbar-list">
				<li>
					<NavLink className="link-item" to="/" activeClassName='active' exact>
						Home
					</NavLink>
				</li>
				<li>
					<NavLink className="link-item" activeClassName='active' to='/series'>Series</NavLink>
				</li>
				<li>
					<NavLink className="link-item" activeClassName='active' to='/netflixTV'>Netflix Shows</NavLink>
				</li>

				<li>
					<NavLink to="/myList" className="link-item" activeClassName='active'>
						My List
					</NavLink>
				</li>
				<li>
					<NavLink to="/myFavorite" className="link-item" activeClassName='active'>
						My Favorite
					</NavLink>
				</li>
			</ul>
		</nav>
	);
};

export default Rightbar;
