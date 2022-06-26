import express from 'express';
import passport from '../util/passport.utils.js';
import * as AuthController from '../controllers/auth.controller.js';

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

export default router;
