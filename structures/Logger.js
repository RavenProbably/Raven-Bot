const chalk = require('chalk');
const moment = require('moment');
let timestamp;

setInterval(() => {
	timestamp = `[${moment().format('YYYY-MM-DD HH:mm:ss')}]:`;
}, 1000);

module.exports = class Logger {

	constructor(client) {
		this.client = client;
	}

	log(content, type = 'log') {
		console.log(`${timestamp} ${chalk.bgBlue(type.toUpperCase())} ${content}`);	
	}

	warn(content, type = 'warn') {
		return console.log(`${timestamp} ${chalk.black.bgYellow(type.toUpperCase())} ${content}`);
	}

	info(content, type = 'info') {
		return console.log(`${timestamp} ${chalk.cyan(type.toUpperCase())} ${content}`);
	}

	report(user, value, type) {
		if (type === 'xp') {
			return console.log(`${timestamp} ${chalk.cyan(type.toUpperCase())} [${chalk.cyan(value)}] - ${user}`);
		};
		if (type === 'level') {
			return console.log(`${timestamp} ${chalk.cyan(type.toUpperCase())} [${chalk.cyan(value)}] - ${user}`);
		};
		if (type === 'coins') {
			return console.log(`${timestamp} ${chalk.cyan(type.toUpperCase())} [${chalk.cyan(value)}] - ${user}`);
		};
		if (type === 'gems') {
			return console.log(`${timestamp} ${chalk.cyan(type.toUpperCase())} [${chalk.cyan(value)}] - ${user}`);
		};
	}

	error(content, type = 'error') {
		return console.log(`${timestamp} ${chalk.bgRed(type.toUpperCase())} ${content}`);
	}

	debug(content, type = 'debug') {
		return console.log(`${timestamp} ${chalk.green(type.toUpperCase())} ${content}`);
	}

	cmd(content, type = 'cmd') {
		return console.log(`${timestamp} ${chalk.black.bgWhite(type.toUpperCase())} ${content}`);
	}

	panel(content, type = 'panel') {
		return console.log(`${timestamp} ${chalk.black.bgCyan(type.toUpperCase())} ${content}`);
	}

	ready(content, type = 'ready') {
		return console.log(`${timestamp} ${chalk.black.bgGreen(type.toUpperCase())} ${content}`);
	}

}