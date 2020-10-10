import React from 'react';
import Headertile from './components/Headertile';
import Moviebox from './components/Moviebox';
import Footer from './components/Footer'

const Netflix = ({ global }) => {
	const { tvNetflixReqs, imgBase_URL, likes, watchList } = global;
	return (
		<>
			<Headertile
				request={tvNetflixReqs.getNeflixOriginals}
				imgBase_URL={imgBase_URL}
			></Headertile>

			  <Moviebox
				title={'Action and Adventure'}
				request={tvNetflixReqs.getActAd}
				imgBase_URL={imgBase_URL}
			></Moviebox>

			     <Moviebox
				title={'Animations'}
				request={tvNetflixReqs.getAnim}
				imgBase_URL={imgBase_URL}
			></Moviebox>
			     <Moviebox
				title={'Comedy'}
				request={tvNetflixReqs.getComedy}
				imgBase_URL={imgBase_URL}
			></Moviebox>
		<Moviebox
				title={'Crime'}
				request={tvNetflixReqs.getCrime}
				imgBase_URL={imgBase_URL}
			></Moviebox>

			     <Moviebox
				title={'Documentaries'}
				request={tvNetflixReqs.getDocu}
				imgBase_URL={imgBase_URL}
			></Moviebox>
				     <Moviebox
				title={'Drama'}
				request={tvNetflixReqs.getDrama}
				imgBase_URL={imgBase_URL}
			></Moviebox>

				     <Moviebox
				title={'Family'}
				request={tvNetflixReqs.getFamily}
				imgBase_URL={imgBase_URL}
			></Moviebox>

				{likes.length > 0 && (
            <Moviebox
                title={'My Favorite'}
                movieP={likes}
                // likedMovies
            ></Moviebox>
        )}
        

        {watchList.length > 0 && (
            <Moviebox
                title={'My List'}
                movieP={watchList}
                // watchLists
            ></Moviebox>
        )}

			     <Moviebox
				title={'Mystery'}
				request={tvNetflixReqs.getMystery}
				imgBase_URL={imgBase_URL}
			></Moviebox>

				     <Moviebox
				title={'War and Politics'}
				request={tvNetflixReqs.getWarPoli}
				imgBase_URL={imgBase_URL}
			></Moviebox>

					     <Moviebox
				title={'Sci-Fi and Fantasy'}
				request={tvNetflixReqs.getSciFan}
				imgBase_URL={imgBase_URL}
			></Moviebox>
            <Footer></Footer>


		
		</>
	);
};

export default Netflix;
