import React from 'react';
import Headertile from './components/Headertile';
import Moviebox from './components/Moviebox';

const Series = ({ global }) => {
	const { tvRequests, imgBase_URL, likes, watchList } = global;
	return (
		<>
			<Headertile
				request={tvRequests.getTvPopular}
				imgBase_URL={imgBase_URL}
			></Headertile>

            <Moviebox
				title={'Action and Adventure'}
				request={tvRequests.getActAd}
				imgBase_URL={imgBase_URL}
			></Moviebox>

			     <Moviebox
				title={'Animations'}
				request={tvRequests.getAnim}
				imgBase_URL={imgBase_URL}
			></Moviebox>
			     <Moviebox
				title={'Comedy'}
				request={tvRequests.getComedy}
				imgBase_URL={imgBase_URL}
			></Moviebox>



			<Moviebox
				title={'Crime'}
				request={tvRequests.getCrime}
				imgBase_URL={imgBase_URL}
			></Moviebox>

			     <Moviebox
				title={'Documentaries'}
				request={tvRequests.getDocu}
				imgBase_URL={imgBase_URL}
			></Moviebox>
				     <Moviebox
				title={'Drama'}
				request={tvRequests.getDrama}
				imgBase_URL={imgBase_URL}
			></Moviebox>

				     <Moviebox
				title={'Family'}
				request={tvRequests.getFamily}
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
				request={tvRequests.getMystery}
				imgBase_URL={imgBase_URL}
			></Moviebox>
			
			<Moviebox
						title={'Trending Now'}
						request={tvRequests.getTrending}
						imgBase_URL={imgBase_URL}
					></Moviebox>

				     <Moviebox
				title={'War and Politics'}
				request={tvRequests.getWarPoli}
				imgBase_URL={imgBase_URL}
			></Moviebox>

					     <Moviebox
				title={'Sci-Fi and Fantasy'}
				request={tvRequests.getSciFan}
				imgBase_URL={imgBase_URL}
			></Moviebox>
			
		</>
	);
};

export default Series;
