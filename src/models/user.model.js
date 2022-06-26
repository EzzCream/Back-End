import mongoose from 'mongoose';

const Schema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		direccion: {
			type: String,
			required: true,
		},
		age: {
			type: Number,
			required: true,
		},
		number: {
			type: String,
			required: true,
		},
		img: {
			type: String,
			require: true,
		},
	},
	{
		timestamps: true,
	},
);

export const UserModel = mongoose.model('User', Schema);
