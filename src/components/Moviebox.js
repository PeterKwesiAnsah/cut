import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import '../moviebox.css'
import Movie from './Movie'
const Moviebox = ({ title, request,imgBase_URL }) => {
    const [movies,setMovies]=useState([])
	useEffect(() => {
		const fetchdata = async () => {
			const results = await axios.get(request);
            const movies = results.data.results;
            console.log(movies)
			setMovies(movies)
		};
		fetchdata();
	}, []);
	return (
		<div className="movie-box">
			<h1 className="movie-box__title">{title}</h1>
            <div className="movie-row">
                 {movies.map(({poster_path,id}) => (
                     <Movie path={imgBase_URL+poster_path} key={id}></Movie>
                  
                 )
                     
                 
                    
                 )}
            </div>
		</div>
	);
};

export default Moviebox;
