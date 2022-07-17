import axios from 'axios';
import { logger } from '../logsConfig/loggers.logs.js';

const getAxios = async () => {
	const response = await axios.get('http://localhost:8080/api/producto');
	logger.info(response);
};

//getAxios();

const postAxios = async () => {
	const dataAxios = {
		name: 'Nombre 1',
		price: 50,
		stock: 50,
		img: 'img link',
		description: 'Descripcion 1',
		category: 'Categoria 1',
		timestamp: 'Hoy',
	};
	await axios.post('http://localhost:8080/api/producto', dataAxios);
	logger.info('Creado');
};

//postAxios();

const deleteAxios = async () => {
	await axios.delete(
		'http://localhost:8080/api/producto/62d38a73e095c9871bc34042',
	);
	logger.info('Eliminado');
};

//deleteAxios();

const updateAxios = async () => {
	const dataUpdateAxios = {
		name: 'Nombre 1 act',
		price: 50,
		stock: 50,
		img: 'img link act',
		description: 'Descripcion 1 act',
		category: 'Categoria 1 act',
		timestamp: 'Hoy act',
	};
	await axios.put(
		'http://localhost:8080/api/producto/62d38e76b2c979a766a29a4a',
		dataUpdateAxios,
	);
	logger.info('Actualizado');
};

updateAxios();
