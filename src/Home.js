import React from 'react';
import Headertile from './components/Headertile';
import Moviebox from './components/Moviebox';
import Footer from './components/Footer'

const Home = ({ global }) => {
	const { requests, imgBase_URL, likes, watchList } = global;
	return (
		<>
			<Headertile
				request={requests.getPopular}
				imgBase_URL={imgBase_URL}
			></Headertile>
				<Moviebox
				title={'Action'}
				request={requests.getAction}
				imgBase_URL={imgBase_URL}   
			></Moviebox>
				<Moviebox
				title={'Adventure'}
				request={requests.getAdven}
				imgBase_URL={imgBase_URL}   
			></Moviebox>

			
			<Moviebox
				title={'Animations'}
				request={requests.getAnimat}
                imgBase_URL={imgBase_URL}
                
			></Moviebox>
				<Moviebox
				title={'Comedy'}
				request={requests.getComedy}
                imgBase_URL={imgBase_URL}
                
			></Moviebox>
			<Moviebox
				title={'Crime'}
				request={requests.getCrime}
                imgBase_URL={imgBase_URL}
                
			></Moviebox>
				<Moviebox
				title={'Documentries'}
				request={requests.getDocu}
                imgBase_URL={imgBase_URL}
                
			></Moviebox>
				<Moviebox
				title={'Drama'}
				request={requests.getDrama}
                imgBase_URL={imgBase_URL}
                
			></Moviebox>
				<Moviebox
				title={'Family'}
				request={requests.getFamily}
                imgBase_URL={imgBase_URL}
                
			></Moviebox>
					<Moviebox
				title={'Fantasy'}
				request={requests.getFantasy}
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
				title={'Thriller'}
				request={requests.getThriller}
                imgBase_URL={imgBase_URL}
                
			></Moviebox>		
			
			         <Moviebox
						title={'Trending Now'}
						request={requests.getTrending}
						imgBase_URL={imgBase_URL}
					></Moviebox>
			<Moviebox
					title={'Upcoming'}
					request={requests.getUpcoming}
					imgBase_URL={imgBase_URL}
				
				></Moviebox>
				<Footer></Footer>
			
		


		
		        {/* <Moviebox
					title={'Upcoming'}
					request={requests.getUpcoming}
					imgBase_URL={imgBase_URL}
					isLarge
				></Moviebox> */}
	
		</>
	);
};

export default Home;
