import mongoose from 'mongoose';

const Schema = new mongoose.Schema({
	username: {
		type: String,
		require: true,
	},
	number: {
		type: String,
		require: true,
	},
	direccion: {
		type: String,
		require: true,
	},
	email: {
		type: String,
		require: true,
	},
	products: {
		type: Array,
		required: true,
	},
});

export const OrdenModels = mongoose.model('orden', Schema);
