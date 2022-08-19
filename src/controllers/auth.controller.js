import path from 'path';
import { createTransport } from 'nodemailer';
import dotenv from 'dotenv';
import twilio from 'twilio';
import { time } from '../helpers/time.helpers.js';
import { logger } from '../logsConfig/loggers.logs.js';
import { CartModels } from '../models/carrito.models.js';
import { OrdenModels } from '../models/orden.model.js';
import { UserModel } from '../models/user.model.js';
import DAO from '../services/DAO/generalFaactory.DAO.js';

dotenv.config();

const client = twilio(process.env.SID, process.env.TOKEN);

const mensaje = {
	body: 'Hola, pedido realizado',
	from: '+19897955353',
	to: '+52 55 3023 4861',
};

const transporter = createTransport({
	service: 'gmail',
	port: 587,
	auth: {
		user: process.env.EMAIL,
		pass: process.env.PASS,
	},
});

export function getSignup(req, res) {
	res.sendFile(path.resolve() + '/src/views/pages/signup.html');
}
export async function postSignup(req, res) {
	try {
		const user = req.user;
		const timestamp = time();
		const message = `El usuario '${user.username}' ha creado su cuenta con el correo ${user.email} y el numero ${user.number} `;
		// const mailOptions = {
		// 	from: process.env.USER,
		// 	to: ['oscar.7n7@gmail.com'],
		// 	subject: 'Nuevo user',
		// 	text: message,
		// };
		// await transporter.sendMail(mailOptions);
		const obj = {
			userID: user._id,
			timestamp,
			products: [],
		};
		await DAO.create(CartModels, obj);
		res.sendFile(path.resolve() + '/src/views/pages/login.html');
	} catch (error) {
		logger.error(error);
	}
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
export async function genOrder(req, res) {
	const user = req.user;
	const response = await CartModels.findOne({ userID: user._id });
	const mailOptions = {
		from: process.env.USER,
		to: user.email,
		subject: 'Nuevo user',
		text: JSON.stringify(response.products),
	};
	await transporter.sendMail(mailOptions);
	const obj = {
		username: user.username,
		number: user.number,
		direccion: user.direccion,
		email: user.email,
		products: response.products,
	};
	await OrdenModels.create(obj);
	await CartModels.updateOne({ userID: user._id }, { products: [] });
	//await client.messages.create(mensaje);
	res.status(200).send(
		'<script type="text/javascript">alert("Orden generada");window.location.href = "/productos";</script>',
	);
}

export async function updateImg(req, res) {
	const user = req.user;
	const doc = req.file;
	const mess = `./uploads/${doc.originalname}`;
	await UserModel.updateOne({ _id: user._id }, { img: mess });
	res.status(200).send(
		'<script type="text/javascript">alert("Imagen actualizada");window.location.href = "/productos";</script>',
	);
}
