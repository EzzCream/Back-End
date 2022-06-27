import mongoose from 'mongoose';

const Schema = new mongoose.Schema({
	userID: {
		type: String,
	},
	timestamp: {
		type: String,
		required: true,
	},
	products: {
		type: Array,
		required: true,
	},
});

export const CartModels = mongoose.model('carrito', Schema);
