import React from 'react';
import Rightbar from './components/Rightbar';
import Leftbar from './components/Leftbar';
import './header.css';
import Moviebox from './components/Moviebox';

const Search = ({ global,request,type }) => {
	const { imgBase_URL } = global;


	return (
		<>
			<div className=" header-row header-row__list">
				<Rightbar></Rightbar>
				<Leftbar></Leftbar>
			</div>
			<Moviebox
				title={`Search Results:${type.toUpperCase()}`}
				request={request}
                imgBase_URL={imgBase_URL}
                 search
			></Moviebox>
		</>
	);
};

export default Search;
