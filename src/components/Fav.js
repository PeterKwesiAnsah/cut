import React from 'react';

const Fav = ({ liked, handleLike }) => {
	return (
		<>
			<svg
				onClick={handleLike}
				className={liked ? '' : 'icon-heart'}
				width="24px"
				height="24px"
				viewBox="0 0 24 24"
				id="_24x24_On_Light_Favorite"
				data-name="24x24/On Light/Favorite"
				xmlns="http://www.w3.org/2000/svg"
			>
				<rect id="view-box--heart" width="24" height="24" fill="none" />
				<path
					id="Shape-heart"
					d="M9.725,18.286l-7.87-7.7.524-.536-.524.536a6.115,6.115,0,0,1,0-8.775,6.406,6.406,0,0,1,8.394-.46,6.406,6.406,0,0,1,8.394.46,6.115,6.115,0,0,1,0,8.775l-7.87,7.7a.75.75,0,0,1-1.049,0Z"
					transform="translate(1.75 3.25)"
					fill={liked ? '#a83f39' : '#141124'}
				/>
			</svg>
		</>
	);
};

export default Fav;
