import path from 'path';
import { logger } from '../logs/loggers.logs.js';

export function getSignup(req, res) {
	res.sendFile(path.resolve() + '/src/views/pages/signup.html');
}
export function postSignup(req, res) {
	res.sendFile(path.resolve() + '/src/views/pages/login.html');
}
export function failSignup(req, res) {
	res.render('pages/failSignup', {});
}
export function getLogin(req, res) {
	if (req.isAuthenticated()) {
		const prueba = req.user;
		console.log(prueba.img);
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
	req.logout();
	res.sendFile(path.resolve() + '/src/views/pages/login.html');
}