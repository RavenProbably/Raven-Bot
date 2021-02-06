const path = require('path');
const { promisify } = require('util');
const glob = promisify(require('glob'));
const Command = require('./Command.js');
const Event = require('./Event.js');

module.exports = class Util {

	constructor(client) {
		this.client = client;
	}

	isClass(input) {
		return typeof input === 'function' &&
			typeof input.prototype === 'object' &&
			input.toString().substring(0, 5) === 'class';
	}

	get directory() {
		return `${path.dirname(require.main.filename)}${path.sep}`;
	}

	trimArray(arr, maxLen = 10) {
		if (arr.length > maxLen) {
			const len = arr.length - maxLen;
			arr = arr.slice(0, maxLen);
			arr.push(`${len} more...`);
		}
		return arr;
	}

	formatBytes(bytes) {
		if (bytes === 0) return '0 Bytes';
		const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
		const i = Math.floor(Math.log(bytes) / Math.log(1024));
		return `${parseFloat((bytes / Math.pow(1024, i)).toFixed(2))} ${sizes[i]}`;
	}

	removeDuplicates(arr) {
		return [...new Set(arr)];
	}

	capitalise(string) {
		return string.split(' ').map(str => str.slice(0, 1).toUpperCase() + str.slice(1)).join(' ');
	}

	async loadCommands() {
		return glob(`${this.directory}commands/**/*.js`).then(commands => {
			for (const commandFile of commands) {
				delete require.cache[commandFile];
				const { name } = path.parse(commandFile);
				const File = require(commandFile);
				if (!this.isClass(File)) throw new TypeError(`Command ${name} doesn't export a class.`);
				const command = new File(this.client, name.toLowerCase());
				if (!(command instanceof Command)) throw new TypeError(`Command ${name} doesn't belong in Commands.`);
				this.client.commands.set(command.name, command);
				if (command.aliases.length) {
					for (const alias of command.aliases) {
						this.client.aliases.set(alias, command.name);
					}
				}
			}
		});
	}

	async loadEvents() {
		return glob(`${this.directory}events/**/*.js`).then(events => {
			for (const eventFile of events) {
				delete require.cache[eventFile];
				const { name } = path.parse(eventFile);
				const File = require(eventFile);
				if (!this.isClass(File)) throw new TypeError(`Event ${name} doesn't export a class!`);
				const event = new File(this.client, name);
				if (!(event instanceof Event)) throw new TypeError(`Event ${name} doesn't belong in Events`);
				this.client.events.set(event.name, event);
				event.emitter[event.type](name, (...args) => event.run(...args));
			}
		});
	}

	capitaliseFirst(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}

	checkDays(date) {
		let now = new Date();
		let diff = now.getTime() - date.getTime();
		let days = Math.floor(diff / 86400000);
		return days + (days == 1 ? ' day' : ' days') + ' ago';
	}

	duration(ms) {
		let sec = Math.floor((ms / 1000) % 60).toString();
		let min = Math.floor((ms / (1000 * 60)) % 60).toString();
		let hrs = Math.floor((ms / (1000 * 60 * 60)) % 60).toString();
		let days = Math.floor((ms / (1000 * 60 * 60 * 24)) % 60).toString();
		return `${days.padStart(1, `0`)} days, ${hrs.padStart(2, `0`)} hours, ${min.padStart(2, `0`)} minutes, ${sec.padStart(2, `0`)} seconds.`;
	}

	contains(target, pattern) {
        var value = 0;
        pattern.forEach(function(word){
          value = value + target.includes(word);
        });
        return (value === 1);
    }

    randomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    isNumeric(value) {
        return !isNaN(value);
	}
	
	isMultiple(number) {
		if (number === 1) return false;
		if (number > 1 || number === 0) return true;
	}
	
	winPercentage(wins, games) {
		return (wins * 100 / games).toFixed(2);
	}

	round(number) { 
		return Math.ceil(number / 5) * 5;
	}

	formatItem(item) {
		let formatted = item.toUpperCase().replace(/_/g, ' ');
		return formatted;
	}

	filterValue(obj, key, value) {
		return obj.find(function(v){ return v[key] === value});
	}

	countCharacters(string) {
		return string.replace(/\s/g, "").trim().length;
	}

	reverseString(string) {
		var splitString = string.split("");
		var reverseArray = splitString.reverse();
		var joinArray = reverseArray.join("");
		return joinArray;
	}

}