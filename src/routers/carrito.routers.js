import express from 'express';
import * as Cart from '../controllers/carrito.controllers.js';

const router = express.Router();

router.post('/', Cart.createCart);

router.delete('/:id', Cart.deleteCart);

router.get('/:id/productos', Cart.getCart);

router.post('/:id/productos/:idProd', Cart.addProdCart);

router.delete('/:id/productos/:idProd', Cart.deleteProdCart);

export default router;
