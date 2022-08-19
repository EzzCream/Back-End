import { generalMongo } from './generalMongo.DAO.js';

const selectedDAO = process.argv[2];

let DAO = null;

switch (selectedDAO) {
	default:
		DAO = new generalMongo();
		break;
}

export default DAO;
