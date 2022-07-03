export const create = async (model, obj) => {
	const response = await model.create(obj);
	return response._id;
};
export const deleteOne = async (model, id) => {
	await model.deleteOne({ id });
};
export const getAll = async (model, id) => {
	const response = await model.findOne({ _id: id });
	return response;
};
