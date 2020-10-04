import React from 'react';
import Headertile from './components/Headertile';
import Moviebox from './components/Moviebox';

const Home = ({ global }) => {
	const { requests, imgBase_URL, likes, watchList } = global;
	return (
		<>
			<Headertile
				request={requests.getPopular}
				imgBase_URL={imgBase_URL}
			></Headertile>
			{/* <h1 className="logo-title">Find the right movie for you ..... </h1> */}
			{/* <Moviebox
				title={'Upcoming Movies'}
				request={requests.getUpcoming}
                imgBase_URL={imgBase_URL}
                scroll
			></Moviebox> */}
			{/* {likes && (
            <Moviebox
                title={'My Favorite'}
                movieP={likes}
                // likedMovies
            ></Moviebox>
        )}
        

        {watchList && (
            <Moviebox
                title={'My List'}
                movieP={watchList}
                // watchLists
            ></Moviebox>
        )} */}
			{/* <Moviebox
					title={'Popular Movies'}
					request={requests.getPopular}
					imgBase_URL={imgBase_URL}
				></Moviebox>
				{
					<Moviebox
						title={'Trending Now'}
						request={requests.getTrending}
						imgBase_URL={imgBase_URL}
						isLarge
					></Moviebox>
				}
				<Moviebox
					title={'In Cinema Now'}
					request={requests.getNowPlaying}
					imgBase_URL={imgBase_URL}
				></Moviebox> */}
		</>
	);
};

export default Home;
