// require the discord.js classes
const { Client, Events, GatewayIntentBits } = require("discord.js");
const { token } = require("./config.json");

// new client instance
const client = new Client( { intents: [GatewayIntentBits.Guilds] } );

// when client is ready. Call this function ONE time (once)
client.once(Events.ClientReady, e => {
    console.log(`${e.user.tag} si è connesso a discord!`);
});

// login discord
client.login(token);