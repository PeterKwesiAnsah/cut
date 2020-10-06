import React from 'react';
import Rightbar from './components/Rightbar';
import Leftbar from './components/Leftbar';
import Moviebox from './components/Moviebox';
import Nodata from './components/Nodata';
import './header.css';

const MyFav = ({global}) => {
    //get the watch list from the global object prop
    const {likes}=global
	return (
		<>
			<div className="header-row header-row__list">
				<Rightbar></Rightbar>
			</div>
            {likes.length === 0 ? (
				<Nodata>No movie was found in my favorite.</Nodata>
			) :  (
            <Moviebox
                title={'My Favorite'}
                movieP={likes}
                // watchLists
            ></Moviebox>
        )} 
		</>
	);
};

export default MyFav;