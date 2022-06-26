import mongoose from 'mongoose';

const Schema = new mongoose.Schema({
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
