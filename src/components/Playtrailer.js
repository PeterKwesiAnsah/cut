import React, {useState} from 'react';
import YouTube from 'react-youtube';
import 'movie-trailer';
import movieTrailer from 'movie-trailer';
import '../playtrailer.css';

import {useLocation} from 'react-router-dom';

const Playtrailer = ({ name,showTrailer }) => {

  	//Get pathname from useLocation
    const {pathname}=useLocation()


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
//Trailer should disapper when is out of the view port
		<div className={`trailer-backdrop ${pathname ==='/' && 'trailer-backdrop--home'}`} onClick={()=>{showTrailer(false)}}>
            <YouTube videoId={vidID} opts={opts}></YouTube>
        </div>
	);
};

export default Playtrailer;
