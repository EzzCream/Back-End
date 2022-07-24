import { buildSchema } from 'graphql';
import { time } from '../helpers/time.helpers.js';
import { logger } from '../logsConfig/loggers.logs.js';
import { ProductsModels } from '../models/producto.models.js';
import DAO from '../services/DAO/generalFaactory.DAO.js';

export const schema = buildSchema(`
  type Products {
    id: ID!
    name: String
    price: Int
    stock: Int
    img: String
    description: String
    category: String
    timestamp: String
  }
  input ProductsInput {
    name: String
    price: Int
    stock: Int
    img: String
    description: String
    category: String
  }
  type Query {
    getProducts:[Products]
    getProductsById(id:ID!):Products
  }
  type Mutation {
    createProducts(data:ProductsInput): Products
    deleteProduct(id:ID!):Products
    updateProduct(data:ProductsInput, id:ID!): Products
  }
`);

export const getProducts = async () => {
	try {
		const response = await DAO.getFind(ProductsModels);
		return response;
	} catch (error) {
		logger.error(error);
	}
};

export const getProductsById = async (_id) => {
	try {
		const response = await DAO.getAll(ProductsModels, _id);
		return response;
	} catch (error) {
		logger.error(error);
	}
};

export const createProducts = async (body) => {
	try {
		time();
		const timestamp = time();
		const obj = {
			...body,
			timestamp,
		};
		const response = DAO.create(ProductsModels, obj);
		return response;
	} catch (error) {
		logger.error(error);
	}
};

export const deleteProduct = async (_id) => {
	try {
		const response = DAO.deleteOne(ProductsModels, _id);
		return response;
	} catch (error) {
		logger.error(error);
	}
};

export const updateProduct = async (body, id) => {
	try {
		time();
		const timestamp = time();
		const obj = {
			...body,
			timestamp,
		};
		const response = await ProductsModels.updateOne({ _id: id }, obj);
		return response;
	} catch (error) {
		logger.error(error);
	}
};
