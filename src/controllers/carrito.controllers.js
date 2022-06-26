import { CartModels } from '../models/carrito.models.js';
import { time } from '../helpers/time.helpers.js';
import { ProductsModels } from '../models/producto.models.js';
import { logger } from '../logsConfig/loggers.logs.js';

export const createCart = async (req, res) => {
	try {
		const timestamp = time();
		const obj = {
			timestamp,
			products: [],
		};
		const response = await CartModels.create(obj);
		res.status(200).send(response._id);
	} catch (error) {
		logger.error(error);
	}
};

export const deleteCart = async (req, res) => {
	try {
		const { id } = req.params;
		await CartModels.deleteOne({ _id: id });
		res.status(200).send('Cart deleted');
	} catch (error) {
		logger.error(error);
	}
};

export const getCart = async (req, res) => {
	try {
		const { id } = req.params;
		const response = await CartModels.findOne({ _id: id });
		res.status(200).send(response.products);
	} catch (error) {
		logger.error(error);
	}
};

export const addProdCart = async (req, res) => {
	try {
		const { id, idProd } = req.params;
		const product = await ProductsModels.findOne({ _id: idProd });
		const cart = await CartModels.findOne({ _id: id });

		const { products } = cart;
		products.push(product);

		await CartModels.updateOne({ _id: id }, { products });

		res.status(200).send('Product added');
	} catch (error) {
		logger.error(error);
	}
};

export const deleteProdCart = async (req, res) => {
	try {
		const { id, idProd } = req.params;
		const cart = await CartModels.findOne({ _id: id });
		const { products } = cart;

		const newProd = products.filter((res) => {
			res._id !== idProd;
		});

		await CartModels.updateOne({ _id: id }, { products: newProd });

		res.status(200).send('Product deleted from cart');
	} catch (error) {
		logger.error(error);
	}
};
