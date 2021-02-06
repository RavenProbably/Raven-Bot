const RavenClient = require('./structures/Client');
const config = require('./config.json');

const client = new RavenClient(config);

client.launch();