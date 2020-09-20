import React from 'react';

const WatchList = ({ watched, handleWatch }) => {
	return (
		<>
			<svg
				onClick={handleWatch}
				width="24px"
				height="24px"
				viewBox="0 0 24 24"
				id="_24x24_On_Light_Queue-Add"
				data-name="24x24/On Light/Queue-Add"
				xmlns="http://www.w3.org/2000/svg"
			>
				<rect id="view-box--watch" width="24" height="24" fill="none" />
				<path
					id="Shape"
					d="M3.75,19.5A3.75,3.75,0,0,1,0,15.75V6.607A2.607,2.607,0,0,1,2.607,4H4V2.75A2.754,2.754,0,0,1,6.75,0h10A2.753,2.753,0,0,1,19.5,2.75v10a2.752,2.752,0,0,1-2.75,2.75H15.5v1.393A2.607,2.607,0,0,1,12.892,19.5ZM1.5,6.607V15.75A2.25,2.25,0,0,0,3.75,18h9.142A1.108,1.108,0,0,0,14,16.893V15.5H6.75A2.753,2.753,0,0,1,4,12.75V5.5H2.607A1.107,1.107,0,0,0,1.5,6.607Zm4-3.857v10A1.252,1.252,0,0,0,6.75,14h10A1.251,1.251,0,0,0,18,12.75v-10A1.251,1.251,0,0,0,16.75,1.5h-10A1.252,1.252,0,0,0,5.5,2.75Zm5.5,7.5V8.5H9.25a.75.75,0,1,1,0-1.5H11V5.25a.75.75,0,0,1,1.5,0V7h1.75a.75.75,0,1,1,0,1.5H12.5v1.75a.75.75,0,0,1-1.5,0Z"
					transform="translate(2.25 2.25)"
					fill={watched ? '#8b0000' : '#141124'}
				/>
			</svg>
		</>
	);
};

export default WatchList;
