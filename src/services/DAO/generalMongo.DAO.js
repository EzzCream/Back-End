import { generalBase } from './generalBase.DAO.js';

export class generalMongo extends generalBase {
	async create(model, obj) {
		const response = await model.create(obj);
		return response._id;
	}
	async deleteOne(model, id) {
		await model.deleteOne({ _id: id });
	}
	async getOne(model, id) {
		const response = await model.findOne({ id });
		return response;
	}
	async getFind(model) {
		const response = await model.find();
		return response;
	}
	async updateOne(model, id, elemNew) {
		await model.updateOne({ _id: id }, { elemNew });
	}
	async getUserId(id, model) {
		const userId = await model.findOne({ userID: id });
		return userId;
	}
	async deleteProdCart(model, id, newProd) {
		await model.updateOne({ _id: id }, { products: newProd });
	}
}
