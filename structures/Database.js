const db = require('better-sqlite3')('./raven-bot.db');

module.exports = class Database {

	constructor(client) {
		this.client = client;
	}

	getXp(id) {
		let query = 'SELECT xp FROM xp WHERE id = ?';
		const row = db.prepare(query).get(id);
		if (row === undefined) {
			return;
		} else {
			return row.xp;
		}
	}

	getLvl(id) {
		let query = 'SELECT level FROM xp WHERE id = ?';
		const row = db.prepare(query).get(id);
		if (row === undefined) {
			return;
		} else {
			return row.level;
		}
	}

	getPrestige(id) {
		let query = 'SELECT prestige FROM xp WHERE id = ?';
		const row = db.prepare(query).get(id);
		if (row === undefined) {
			return;
		} else {
			return row.prestige;
		}
	}

	getNextLvl(id) {
		let query = 'SELECT next FROM xp WHERE id = ?';
		const row = db.prepare(query).get(id);
		if (row === undefined) {
			return;
		} else {
			return row.next;
		}
	}

	getCoins(id) {
		let query = 'SELECT coins FROM coins WHERE id = ?';
		const row = db.prepare(query).get(id);
		if (row === undefined) {
			return;
		} else {
			return row.coins;
		}
	}

	getGems(id) {
		let query = 'SELECT gems FROM gems WHERE id = ?';
		const row = db.prepare(query).get(id);
		if (row === undefined) {
			return;
		} else {
			return row.gems;
		}
	}

	getBio(id) {
		let query = 'SELECT bio FROM bios WHERE id = ?';
		const row = db.prepare(query).get(id);
		if (row === undefined) {
			return;
		} else {
			return row.bio;
		}
	}

	getColor(id) {
		let query = 'SELECT hex FROM colors WHERE id = ?';
		const row = db.prepare(query).get(id);
		if (row === undefined) {
			return;
		} else {
			return row.hex;
		}
	}

	getMessages(id) {
		let query = 'SELECT global FROM messages WHERE id = ?';
		const row = db.prepare(query).get(id);
		if (row === undefined) {
			return;
		} else {
			return row.global;
		}
	}

	getCommandRan(name) {
		let query = 'SELECT ran FROM commands WHERE name = ?';
		const row = db.prepare(query).get(name);
		if (row === undefined) {
			return;
		} else {
			return row.ran;
		}
	}

	getTopXp() {
		let query = 'SELECT * FROM xp ORDER BY xp DESC LIMIT 10';
		const rows = db.prepare(query).all();
		if (rows === undefined) {
			return;
		} else {
			return rows;
		}
	}

	getTopCoins() {
		let query = 'SELECT * FROM coins ORDER BY coins DESC LIMIT 10';
		const rows = db.prepare(query).all();
		if (rows === undefined) {
			return;
		} else {
			return rows;
		}
	}

	getTopGems() {
		let query = 'SELECT * FROM gems ORDER BY gems DESC LIMIT 10';
		const rows = db.prepare(query).all();
		if (rows === undefined) {
			return;
		} else {
			return rows;
		}
	}

	getTopMessages() {
		let query = 'SELECT * FROM messages ORDER BY global DESC LIMIT 10';
		const rows = db.prepare(query).all();
		if (rows === undefined) {
			return;
		} else {
			return rows;
		}
	}

	getTopCommands() {
		let query = 'SELECT * FROM commands ORDER BY ran DESC LIMIT 10';
		const rows = db.prepare(query).all();
		if (rows === undefined) {
			return;
		} else {
			return rows;
		}
	}

	insertBio(id, bio) {
		let user = this.client.users.cache.find(user => user.id === id);
		let query = 'SELECT bio FROM bios WHERE id = ?';
		const row = db.prepare(query).get(id);
		if (row === undefined) {
            let insert = db.prepare('INSERT INTO bios VALUES(?,?,?)');
            insert.run(user.tag, id, bio);
        } else {
            let update = db.prepare('UPDATE bios SET username = ?, bio = ? WHERE id = ?');
            update.run(user.tag, bio, id);
        };
	}

	insertColor(id, color) {
		let user = this.client.users.cache.find(user => user.id === id);
		let query = 'SELECT hex FROM colors WHERE id = ?';
		const row = db.prepare(query).get(id);
		if (row === undefined) {
            let insert = db.prepare('INSERT INTO colors VALUES(?,?,?)');
            insert.run(user.tag, id, color);
        } else {
            let update = db.prepare('UPDATE colors SET username = ?, hex = ? WHERE id = ?');
            update.run(user.tag, color, id);
        };
	}

	chargeCoins(id, amount) {
		let user = this.client.users.cache.find(user => user.id === id);
		let query = 'SELECT coins FROM coins WHERE id = ?';
		const row = db.prepare(query).get(id);
		if (row === undefined) {
			return;
        } else {
			let update = db.prepare('UPDATE coins SET username = ?, coins = ? WHERE id = ?');
			update.run(user.tag, row.coins - amount, id);
        };
	}

	payCoins(id, amount) {
		let user = this.client.users.cache.find(user => user.id === id);
		let query = 'SELECT coins FROM coins WHERE id = ?';
		const row = db.prepare(query).get(id);
		if (row === undefined) {
			let insert = db.prepare('INSERT INTO coins VALUES(?,?,?)');
			insert.run(user.tag, id, amount);
			return;
        } else {
			let update = db.prepare('UPDATE coins SET username = ?, coins = ? WHERE id = ?');
			update.run(user.tag, row.coins + amount, id);
        };
	}

	addCommand(name) {
		let query = 'SELECT ran FROM commands WHERE name = ?';
		const row = db.prepare(query).get(name);
		if (row === undefined) {
			let insert = db.prepare('INSERT INTO commands VALUES(?,?)');
			insert.run(name, 1);
			return;
        } else {
			let update = db.prepare('UPDATE commands SET ran = ? WHERE name = ?');
			update.run(row.ran + 1, name);
        };
	}

	addMessage(id) {
		let user = this.client.users.cache.find(user => user.id === id);
		let query = 'SELECT global FROM messages WHERE id = ?';
		const row = db.prepare(query).get(id);
		if (row === undefined) {
			let insert = db.prepare('INSERT INTO messages VALUES(?,?,?)');
			insert.run(user.tag, id, 1);
			return;
        } else {
			let update = db.prepare('UPDATE messages SET username = ?, global = ? WHERE id = ?');
			update.run(user.tag, row.global + 1, id);
        };
	}

	addXp(id, amount) {
		let user = this.client.users.cache.find(user => user.id === id);
		let query = 'SELECT xp FROM xp WHERE id = ?';
		const row = db.prepare(query).get(id);
		if (row === undefined) {
			let insert = db.prepare('INSERT INTO xp VALUES(?,?,?,?,?,?)');
			insert.run(user.tag, id, 0, 1, 0, 1000);
			return;
        } else {
			let update = db.prepare('UPDATE xp SET username = ?, xp = ? WHERE id = ?');
			update.run(user.tag, row.xp + amount, id);
        };
	}

	addLvl(id, amount) {
		let user = this.client.users.cache.find(user => user.id === id);
		let query = 'SELECT level FROM xp WHERE id = ?';
		const row = db.prepare(query).get(id);
		if (row === undefined) {
			let insert = db.prepare('INSERT INTO xp VALUES(?,?,?,?,?,?)');
			insert.run(user.tag, id, 0, 1, 0, 1000);
			return;
        } else {
			let update = db.prepare('UPDATE xp SET username = ?, level = ? WHERE id = ?');
			update.run(user.tag, row.level + amount, id);
        };
	}

	addPrestige(id, amount) {
		let user = this.client.users.cache.find(user => user.id === id);
		let query = 'SELECT prestige FROM xp WHERE id = ?';
		const row = db.prepare(query).get(id);
		if (row === undefined) {
			let insert = db.prepare('INSERT INTO xp VALUES(?,?,?,?,?,?)');
			insert.run(user.tag, id, 0, 1, 0, 1000);
			return;
        } else {
			let update = db.prepare('UPDATE xp SET username = ?, prestige = ? WHERE id = ?');
			update.run(user.tag, row.prestige + amount, id);
        };
	}

	addNextLvl(id) {
		let user = this.client.users.cache.find(user => user.id === id);
		let query = 'SELECT next FROM xp WHERE id = ?';
		const row = db.prepare(query).get(id);
		if (row === undefined) {
			let insert = db.prepare('INSERT INTO xp VALUES(?,?,?,?,?,?)');
			insert.run(user.tag, id, 0, 1, 0, 1000);
			return;
        } else {
			let update = db.prepare('UPDATE xp SET username = ?, next = ? WHERE id = ?');
			update.run(user.tag, row.next + 1000, id);
        };
	}

	clearLvl(id) {
		let user = this.client.users.cache.find(user => user.id === id);
		let query = 'SELECT level FROM xp WHERE id = ?';
		const row = db.prepare(query).get(id);
		if (row === undefined) {
			let insert = db.prepare('INSERT INTO xp VALUES(?,?,?,?,?,?)');
			insert.run(user.tag, id, 0, 1, 0, 1000);
			return;
        } else {
			let update = db.prepare('UPDATE xp SET username = ?, level = ? WHERE id = ?');
			update.run(user.tag, 1, id);
        };
	}

	addLogs(guildId, channelName, channelId) {
		let guild = this.client.guilds.cache.find(guild => guild.id === guildId);
		let query = 'SELECT guildid FROM logs WHERE guildid = ?';
		const row = db.prepare(query).get(guildId);
        if (row === undefined) {
            let insert = db.prepare('INSERT INTO logs VALUES(?,?,?,?)');
            insert.run(guild.name, guildId, channelName, channelId);
        } else {
            let update = db.prepare('UPDATE logs SET guildname = ?, channelname = ?, channelid = ? WHERE guildid = ?');
            update.run(guild.name, channelName, channelId, guildId);
        };
	}

	getLogs(id) {
		let query = 'SELECT * FROM logs WHERE guildid = ?';
		const row = db.prepare(query).get(id);
		if (row === undefined) {
			return;
        } else {
			return row;
		}
	}

	deleteLogs(id) {
		let query = `DELETE FROM logs WHERE guildid = ?`;
		db.prepare(query).run(id);
	}

	addPrefix(guildId, prefix) {
		let guild = this.client.guilds.cache.find(guild => guild.id === guildId);
		let query = 'SELECT guildid FROM prefixes WHERE guildid = ?';
		const row = db.prepare(query).get(guildId);
        if (row === undefined) {
            let insert = db.prepare('INSERT INTO prefixes VALUES(?,?,?)');
            insert.run(guild.name, guildId, prefix);
        } else {
            let update = db.prepare('UPDATE prefixes SET guildname = ?, prefix = ? WHERE guildid = ?');
            update.run(guild.name, prefix, guildId);
        };
	}

	getPrefix(id) {
		let query = 'SELECT prefix FROM prefixes WHERE guildid = ?';
		const row = db.prepare(query).get(id);
		if (row === undefined) {
			return;
        } else {
			return row.prefix;
		}
	}

	deletePrefix(id) {
		let query = `DELETE FROM prefixes WHERE guildid = ?`;
		db.prepare(query).run(id);
	}

	addAutorole(guildId, roleName, roleId) {
		let guild = this.client.guilds.cache.find(guild => guild.id === guildId);
		let query = 'SELECT guildid FROM autoroles WHERE guildid = ?';
		const row = db.prepare(query).get(guildId);
		if (row === undefined) {
			let insert = db.prepare('INSERT INTO autoroles VALUES(?,?,?,?)');
			insert.run(guild.name, guildId, roleName, roleId);
		} else {
			let update = db.prepare('UPDATE autoroles SET guildname = ?, rolename = ?, roleid = ? WHERE guildid = ?');
			update.run(guild.name, roleName, roleId, guildId);
		};
	}

	getAutorole(id) {
		let query = 'SELECT * FROM autoroles WHERE guildid = ?';
		const row = db.prepare(query).get(id);
		if (row === undefined) {
			return;
		} else {
			return row;
		}
	}

	deleteAutorole(id) {
		let query = `DELETE FROM autoroles WHERE guildid = ?`;
		db.prepare(query).run(id);
	}

	addMute(username, id, start, end) {
		let query = 'SELECT id FROM mutes WHERE id = ?';
		const row = db.prepare(query).get(id);
		if (row === undefined) {
			let insert = db.prepare('INSERT INTO mutes VALUES(?,?,?,?)');
			insert.run(username, id, start, end);
		} else {
			let update = db.prepare('UPDATE mutes SET username = ?, start = ?, end = ? WHERE id = ?');
			update.run(username, start, end, id);
		};
	}

	getMute(id) {
		let query = 'SELECT * FROM mutes WHERE id = ?';
		const row = db.prepare(query).get(id);
		if (row === undefined) {
			return;
		} else {
			return row;
		}
	}

	deleteMute(id) {
		let query = `DELETE FROM mutes WHERE id = ?`;
		db.prepare(query).run(id);
	}

	setDaily(id, last, next, claim) {
		let user = this.client.users.cache.find(user => user.id === id);
		let query = `SELECT * FROM dailies WHERE id = ?`;
		const row = db.prepare(query).get(id);
		if (row === undefined) {
			let insert = db.prepare('INSERT INTO dailies VALUES(?,?,?,?,?)');
            insert.run(user.tag, id, last, next, 1);
		} else {
			if (claim === 0) {
				let update = db.prepare('UPDATE dailies SET username = ?, last = ?, next = ? WHERE id = ?');
				update.run(user.tag, last, next, id);		
			};
			if (claim === 1) {
				let update = db.prepare('UPDATE dailies SET username = ?, last = ?, next = ?, claims = ? WHERE id = ?');
				update.run(user.tag, last, next, row.claims + 1, id);
			};
        };
	}

	getDaily(id) {
		let query = 'SELECT next FROM dailies WHERE id = ?';
		const row = db.prepare(query).get(id);
		if (row === undefined) {
			return;
        } else {
			return row.next;
		}
	}

	getDailyClaims(id) {
		let query = 'SELECT claims FROM dailies WHERE id = ?';
		const row = db.prepare(query).get(id);
		if (row === undefined) {
			return;
        } else {
			return row.claims;
		}
	}

	setBond(id, secondusername, secondid, date) {
		let user = this.client.users.cache.find(user => user.id === id);
		let query = `SELECT * FROM bonds WHERE id = ?`;
		const row = db.prepare(query).get(id);
		if (row === undefined) {
			let insert = db.prepare('INSERT INTO bonds VALUES(?,?,?,?,?)');
            insert.run(user.tag, id, secondusername, secondid, date);
		} else {
			let update = db.prepare('UPDATE bonds SET username = ?, secondusername = ?, secondid = ?, date = ? WHERE id = ?');
			update.run(user.tag, secondusername, secondid, date, id);
        };
	}

	getBond(id) {
		let query = 'SELECT * FROM bonds WHERE id = ? OR secondid = ?';
		const row = db.prepare(query).get(id, id);
		if (row === undefined) {
			return;
        } else {
			return row;
		};
	}

	deleteBond(id) {
		let query = `DELETE FROM bonds WHERE id = ?`;
		db.prepare(query).run(id);
	}

	addGambleWin(id) {
		let user = this.client.users.cache.find(user => user.id === id);
		let query = 'SELECT wins FROM gambles WHERE id = ?';
		const row = db.prepare(query).get(id);
		if (row === undefined) {
			return;
		} else {
			let update = db.prepare('UPDATE gambles SET username = ?, wins = ? WHERE id = ?');
			update.run(user.tag, row.wins + 1, id);
		};
	}

	addGambleLost(id, lost) {
		let user = this.client.users.cache.find(user => user.id === id);
		let query = 'SELECT lost FROM gambles WHERE id = ?';
		const row = db.prepare(query).get(id);
		if (row === undefined) {
			return;
		} else {
			let update = db.prepare('UPDATE gambles SET username = ?, lost = ? WHERE id = ?');
			update.run(user.tag, row.lost + lost, id);
		};
	}

	addGambleGame(id) {
		let user = this.client.users.cache.find(user => user.id === id);
		let query = 'SELECT games FROM gambles WHERE id = ?';
		const row = db.prepare(query).get(id);
		if (row === undefined) {
			let insert = db.prepare('INSERT INTO gambles VALUES(?,?,?,?,?)');
			insert.run(user.tag, id, 0, 1, 0);
		} else {
			let update = db.prepare('UPDATE gambles SET username = ?, games = ? WHERE id = ?');
			update.run(user.tag, row.games + 1, id);
		};
	}

	getGamble(id) {
		let query = 'SELECT * FROM gambles WHERE id = ?';
		const row = db.prepare(query).get(id);
		if (row === undefined) {
			return;
		} else {
			return row;
		}
	}

	chargeGems(id, amount) {
		let user = this.client.users.cache.find(user => user.id === id);
		let query = 'SELECT gems FROM gems WHERE id = ?';
		const row = db.prepare(query).get(id);
		if (row === undefined) {
			return;
        } else {
			let update = db.prepare('UPDATE gems SET username = ?, gems = ? WHERE id = ?');
			update.run(user.tag, row.gems - amount, id);
        };
	}

	payGems(id, amount) {
		let user = this.client.users.cache.find(user => user.id === id);
		let query = 'SELECT gems FROM gems WHERE id = ?';
		const row = db.prepare(query).get(id);
		if (row === undefined) {
			let insert = db.prepare('INSERT INTO gems VALUES(?,?,?)');
			insert.run(user.tag, id, amount);
			return;
        } else {
			let update = db.prepare('UPDATE gems SET username = ?, gems = ? WHERE id = ?');
			update.run(user.tag, row.gems + amount, id);
        };
	}

	addBooster(id, type, end) {
		let user = this.client.users.cache.find(user => user.id === id);
		let query = 'SELECT id FROM boosters WHERE id = ?';
		const row = db.prepare(query).get(id);
		if (row === undefined) {
			let insert = db.prepare('INSERT INTO boosters VALUES(?,?,?,?)');
			insert.run(user.tag, id, type, end);
		} else {
			let update = db.prepare('UPDATE boosters SET username = ?, type = ?, end = ? WHERE id = ?');
			update.run(user.tag, type, end, id);
		};
	}

	getBooster(id) {
		let query = 'SELECT * FROM boosters WHERE id = ?';
		const row = db.prepare(query).get(id);
		if (row === undefined) {
			return;
		} else {
			return row;
		}
	}

	deleteBooster(id) {
		let query = `DELETE FROM boosters WHERE id = ?`;
		db.prepare(query).run(id);
	}

}