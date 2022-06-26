import log4js from 'log4js';

log4js.configure({
	appenders: {
		consola: { type: 'console' },
		archivoWarn: { type: 'file', filename: 'warn.log' },
		archivoError: { type: 'file', filename: 'error.log' },
		loggerInfo: {
			type: 'logLevelFilter',
			appender: 'consola',
			level: 'trace',
		},
		loggerWarn: {
			type: 'logLevelFilter',
			appender: 'archivoWarn',
			level: 'warn',
		},
		loggerError: {
			type: 'logLevelFilter',
			appender: 'archivoError',
			level: 'error',
		},
	},
	categories: {
		default: {
			appenders: ['loggerInfo', 'loggerWarn', 'loggerError'],
			level: 'all',
		},
	},
});

export const logger = log4js.getLogger('default');
