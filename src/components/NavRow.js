import React from 'react';
import Leftbar from './Leftbar';
import Rightbar from './Rightbar';
import '../header.css'

const NavRow = ({ styles }) => {
	return (
		<div style={styles} className="header-row">
			<Rightbar></Rightbar>
			<Leftbar></Leftbar>
		</div>
	);
};

export default NavRow;
