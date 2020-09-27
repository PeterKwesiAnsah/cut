import React from 'react';
import Rightbar from './components/Rightbar';
import Leftbar from './components/Leftbar'

import Moviebox from './components/Moviebox';
import './header.css';

const MyList = ({global}) => {
    //get the watch list from the global object prop
    const {watchList}=global
	return (
		<>
			<div className=" header-row header-row__list">
				<Rightbar></Rightbar>
                <Leftbar></Leftbar>
			</div>
            {watchList && (
            <Moviebox
                title={'My List'}
                movieP={watchList}
                // watchLists
            ></Moviebox>
        )} 
		</>
	);
};

export default MyList;
