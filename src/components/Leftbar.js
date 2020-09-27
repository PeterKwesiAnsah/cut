import React, { useState, useContext, useRef, useEffect } from 'react';
import { ReactComponent as Magni } from '../magni.svg';
import { useHistory } from 'react-router-dom';
import { SetItems } from '../App';

const Leftbar = () => {
	//Get the global search query and it's handler
	const { search, setSearch, hide, sethide } = useContext(SetItems);

	//creating a ref for the input Element
	const inputEl = useRef();

	let history = useHistory();

	const handleClick = () => {
		if (hide) {
			sethide(false);
			inputEl.current.focus();
		} else {
			sethide(true);
		}
	};
	const handleChange = (e) => {
		history.push(`/search?q=${e.target.value}`);
		setSearch(e.target.value);
		//if a change pushes the text input to be empty ...move to browse/home and hide it
		if (!inputEl.current.value) {
			history.push('/');
			sethide(true);
		}
	};

	//if the value is not empty auto focus it using useRef
	useEffect(() => {
		if (inputEl.current.value) {
			inputEl.current.focus();
		}
	}, []);

	//onchange is going change the url by a string

	return (
		<div className="search-box">
			<Magni onClick={handleClick}></Magni>
			<input
				type="text"
				placeholder="Search for your movies,tv shows....."
				className={hide ? 'hide' : 'show'}
				onChange={handleChange}
				value={search}
				ref={inputEl}
			></input>
		</div>
	);
};

export default Leftbar;
