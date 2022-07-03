import { time } from '../helpers/time.helpers.js';
import path from 'path';
import { logger } from '../logsConfig/loggers.logs.js';
import { ProductsModels } from '../models/producto.models.js';
import { CartModels } from '../models/carrito.models.js';
import * as Service from '../services/general.services.js';

export const getProducts = async (req, res) => {
	try {
		//const response = await ProductsModels.find();
		const response = await Service.getFind(ProductsModels);
		res.status(200).json(response);
	} catch (error) {
		logger.error(error);
	}
};

export const getProductsById = async (req, res) => {
	try {
		const { id } = req.params;
		const _id = id;
		//const response = await ProductsModels.findOne({ _id: id });
		const response = await Service.getAll(ProductsModels, _id);
		res.status(200).json(response);
	} catch (error) {
		logger.error(error);
	}
};

export const createProducts = async (req, res) => {
	try {
		time();
		const timestamp = time();
		const { body } = req;
		const obj = {
			...body,
			timestamp,
		};
		//await ProductsModels.create(obj);
		Service.create(ProductsModels, obj);
		res.status(200).send('Product created');
	} catch (error) {
		logger.error(error);
	}
};

export const deleteProduct = async (req, res) => {
	try {
		const { id } = req.params;
		const _id = id;
		//await ProductsModels.deleteOne({ _id: id });
		Service.deleteOne(ProductsModels, _id);
		res.status(200).send('Product deleted');
	} catch (error) {
		logger.error(error);
	}
};

export const updateProduct = async (req, res) => {
	try {
		const { body } = req;
		const { id } = req.params;
		time();
		const timestamp = time();
		const obj = {
			...body,
			timestamp,
		};
		await ProductsModels.updateOne({ _id: id }, obj);
		res.status(200).send('Product updated');
	} catch (error) {
		logger.error(error);
	}
};

export async function renderProd(req, res) {
	if (req.isAuthenticated()) {
		const prueba = req.user;
		const response = await ProductsModels.find();
		const { _id } = await CartModels.findOne({ userID: prueba._id });
		res.render('pages/productos', { response, prueba, _id });
	} else {
		res.sendFile(path.resolve() + '/src/views/pages/login.html');
	}
}
