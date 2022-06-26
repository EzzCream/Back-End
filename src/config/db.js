import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { logger } from '../logsConfig/loggers.logs.js';

dotenv.config();

mongoose.connect(process.env.MONGO_URI, (err) => {
	if (err) {
		logger.error(err);
	} else {
		logger.info('Connected to Mongo ✨');
		logger.info(`----------------------------------------------`);
	}
});

export default mongoose;
