import React, { useEffect,useState } from 'react';
import axios from 'axios';
import '../movietile.css'

const Movietile = ({ id, request }) => {
    const [backStyle,setBackStyle]=useState({
        background:'linear-gradient(to right, #0f2027, #203a43, #2c5364)'
    })
    const [movie,setMovie]=useState({})
	useEffect(() => {
        const fetchData=async()=>{
            const movie=await axios.get(request(id))
            console.log(movie.data)
        setBackStyle({background:`url(https://image.tmdb.org/t/p/original${movie.data.poster_path})`})
        }
        fetchData()
    }, []);

	return <div style={backStyle} className='movie-tile'>

    </div>;
};

export default Movietile;
