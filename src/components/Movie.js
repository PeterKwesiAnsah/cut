import React from 'react'
import '../movie.css'

const Movie = ({path}) => {
    return (
        <img src={path} alt='movie posters' className='movie-poster'></img>
    )
}

export default Movie
