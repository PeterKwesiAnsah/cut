import React, { useEffect, useState } from 'react';
import YouTube from 'react-youtube';
import 'movie-trailer';
import movieTrailer from 'movie-trailer';
import '../playtrailer.css';

const Playtrailer = ({ name,showTrailer }) => {

    //state for traier IDs
    const [vidID, setvidID] = useState('');
    
    //react-youtube opts for react youtube
    const opts = {
        height: '430',
        width: '840',
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
          autoplay: 1,
        }
    }
//A async function to return video ID based on name prop
	const fetchTrailer = async () => {
		const trailer = await movieTrailer(name);
		const parsedUrl = new URLSearchParams(new URL(trailer).search);
		setvidID(parsedUrl.get('v'));
    };
	fetchTrailer();

	return (
		//div element going to be a backdrop for the youtube trailer for the movietile component

		<div className='trailer-backdrop' onClick={()=>{showTrailer(false)}}>
            <YouTube videoId={vidID} opts={opts}></YouTube>
        </div>
	);
};

export default Playtrailer;
