import React from 'react';
import '../../src/Skeleton.css';

const Skeleton = ({ className }) => {
	return <div className={'skeleton ' + className}></div>;
};

export default Skeleton;
