import mongoose from 'mongoose';

const Schema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
	stock: {
		type: Number,
		required: true,
	},
	img: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	category: {
		type: String,
		required: true,
	},
	timestamp: {
		type: String,
		required: true,
	},
});

export const ProductsModels = mongoose.model('producto', Schema);
