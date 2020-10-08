import React ,{useState}from 'react';
import { NavLink } from 'react-router-dom';
import '../navbar.css';
import {ReactComponent as NaviIcon} from '../navigation.svg'

const Rightbar = () => {
	const [show,setShow]=useState(false)

	//use to toggle between states
	const toggle=()=>{
		setShow(state=>!state)
	}
	return (
		<div className={` navbox ${show && 'navbox--show'}`}>
		<NaviIcon className='navicon' onClick={toggle}></NaviIcon>
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
		</div>
	
	);
};

export default Rightbar;
