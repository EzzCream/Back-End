import express from 'express';
import dotenv from 'dotenv';
import Products from './routers/producto.routers.js';
import Carrito from './routers/carrito.routers.js';
import UserRouter from './routers/pages.routers.js';
import './config/db.js';
import { logger } from './logsConfig/loggers.logs.js';
import passport from 'passport';
import session from 'express-session';
import cors from 'cors';

const app = express();
dotenv.config();

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
	session({
		secret: process.env.SECRET,
		const: {
			maxAge: Number(process.env.EXPIRE),
		},
		rolling: true,
		resave: true,
		saveUninitialized: true,
	}),
);

app.use(passport.initialize());
app.use(passport.session());
app.use(cors());

app.use('/', UserRouter);
app.use('/api/producto', Products);
app.use('/api/carrito', Carrito);

app.set('views', './src/views');
app.set('view engine', 'ejs');

const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => {
	logger.info(`----------------------------------------------`);
	logger.info(`Server started on http://localhost:${PORT} ✨`);
	logger.info(`----------------------------------------------`);
});
server.on('error', (err) => logger.error(err));
