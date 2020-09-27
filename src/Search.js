import React from 'react'
import Rightbar from './components/Rightbar';
import Leftbar from './components/Leftbar'
import './header.css';

const Search = () => {
    return (
        <>
        	<div className=" header-row header-row__list">
				<Rightbar></Rightbar>
                <Leftbar></Leftbar>
			</div>
            
        </>
    )
}

export default Search
