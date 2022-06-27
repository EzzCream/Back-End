import path from 'path';
import { time } from '../helpers/time.helpers.js';
import { logger } from '../logsConfig/loggers.logs.js';
import { CartModels } from '../models/carrito.models.js';

export function getSignup(req, res) {
	res.sendFile(path.resolve() + '/src/views/pages/signup.html');
}
export async function postSignup(req, res) {
	const user = req.user;
	const timestamp = time();
	const obj = {
		userID: user._id,
		timestamp,
		products: [],
	};
	await CartModels.create(obj);
	res.sendFile(path.resolve() + '/src/views/pages/login.html');
}
export function failSignup(req, res) {
	res.render('pages/failSignup', {});
}
export function getLogin(req, res) {
	if (req.isAuthenticated()) {
		const prueba = req.user;
		res.render('pages/index', { prueba });
	} else {
		res.sendFile(path.resolve() + '/src/views/pages/login.html');
	}
}
export function postLogin(req, res) {
	res.sendFile(path.resolve() + '/src/views/pages/index.html');
}
export function failLogin(req, res) {
	res.sendFile(path.resolve() + '/src/views/pages/login.html');
}
export function logout(req, res) {
	req.logout(function (err) {
		if (err) {
			logger.error(err);
		}
		res.redirect('/');
	});
}
