import React from 'react';
import Headertile from './components/Headertile';
import Moviebox from './components/Moviebox';

const Netflix = ({ global }) => {
	const { tvNetflixReqs, imgBase_URL, likes, watchList } = global;
	return (
		<>
			<Headertile
				request={tvNetflixReqs.getNeflixOriginals}
				imgBase_URL={imgBase_URL}
			></Headertile>
			<Moviebox
				title={'Animations'}
				request={tvNetflixReqs.getAnim}
				imgBase_URL={imgBase_URL}
			></Moviebox>


			{/* <Moviebox
				title={'Latest TV Shows'}
				request={tvRequests.getLatest}
				imgBase_URL={imgBase_URL}
			></Moviebox>

			{likes.length > 0 && (
				<Moviebox
					title={'My Favorite'}
					movieP={likes}
					// likedMovies
				></Moviebox>
			)}

			<Moviebox
				title={'Airing Today'}
				request={tvRequests.getAirToday}
				imgBase_URL={imgBase_URL}
			></Moviebox>

			{watchList.length > 0 && (
				<Moviebox
					title={'My List'}
					movieP={watchList}
					// watchLists
				></Moviebox>
			)}

			<Moviebox
				title={'Top Rated TV shows'}
				request={tvRequests.getTopRated}
				imgBase_URL={imgBase_URL}
				isLarge
			></Moviebox>

			<Moviebox
				title={'Aired TV shows'}
				request={tvRequests.getAiring}
				imgBase_URL={imgBase_URL}
			></Moviebox> */}
		</>
	);
};

export default Netflix;
