import React from 'react';
import Rightbar from './components/Rightbar';
import Leftbar from './components/Leftbar';

import Moviebox from './components/Moviebox';
import Nodata from './components/Nodata';
import './header.css';

const MyList = ({ global }) => {
	//get the watch list from the global object prop
	const { watchList } = global;
	return (
		<div>
			<div className=" header-row header-row__list">
				<Rightbar></Rightbar>
			</div>
			{watchList.length === 0 ? (
				<Nodata>No movie was found in my list.</Nodata>
			) : (
				<Moviebox
					title={'My List'}
					movieP={watchList}
					// watchLists
				></Moviebox>
			)}
		</div>
	);
};

export default MyList;
