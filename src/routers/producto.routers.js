import express from 'express';
import * as Product from '../controllers/producto.controllers.js';

const router = express.Router();

router.get('/', Product.getProducts);

router.get('/:id', Product.getProductsById);

router.post('/', Product.createProducts);

router.delete('/:id', Product.deleteProduct);

router.put('/:id', Product.updateProduct);

export default router;
