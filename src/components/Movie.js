import React from 'react'
import '../movie.css'

const Movie = ({path}) => {


    return (
        <div  className='movie-poster-box'>
             <img src={path} alt='movie posters' className='movie-poster'></img>
             <div className='movie-poster__filter'>
             </div>
        </div>
       
    )
}

export default Movie
