import express from 'express';
import passport from '../util/passport.utils.js';
import * as AuthController from '../controllers/auth.controller.js';
import * as ProdController from '../controllers/producto.controllers.js';
import * as CartController from '../controllers/carrito.controllers.js';
import multer from 'multer';

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'public/uploads');
	},
	filename: function (req, file, cb) {
		cb(null, file.originalname);
	},
});

const upload = multer({ storage: storage });

const router = express.Router();

router.get('/signup', AuthController.getSignup);

router.post(
	'/signup',
	passport.authenticate('signup', { failureRedirect: '/failSignup' }),
	AuthController.postSignup,
);
router.get('/failSignup', AuthController.failSignup);

router.get('/login', AuthController.getLogin);

router.post(
	'/login',
	passport.authenticate('login', { failureRedirect: '/failLogin' }),
	AuthController.postLogin,
);
router.get('/failLogin', AuthController.failLogin);

router.get('/logout', AuthController.logout);

router.get('/productos', ProdController.renderProd);

router.get('/carrito', CartController.renderCart);

router.get('/orden', AuthController.genOrder);

router.post('/profile', upload.single('avatar'), AuthController.updateImg);

export default router;
