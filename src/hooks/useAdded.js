//searches for an item with id inside an array of items 
export const useAdded = (data, id) => {
	
	const filterd = data.filter((item) => item.id === parseInt(id));
	return [Boolean(filterd.length)];
};
