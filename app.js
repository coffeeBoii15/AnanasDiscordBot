// require the necessary classes
const fs = require("node:fs");
const path = require("node:path");
const { Client, Events, GatewayIntentBits, Collection } = require("discord.js");
const { token } = require("./config.json");

// new client instance
const client = new Client( { intents: [GatewayIntentBits.Guilds] } );
client.commands = new Collection(); // attaching Commands proprety to client object

// searching for commands
const commandsPath = path.join(__dirname, "commands"); // helps to construct a path to commands
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js")); // create an array of all files that ends with .js

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file); // search for the current file (command)
    const command = require(filePath);

    //set a new item in the client.Commands collection
    if("data" in command && "execute" in command) {
        client.commands.set(command.data.name, command);
    } 
    else {
        console.log(`[ATTENZIONE] il comando che si trova a ${filePath} non coniente "data" o "execute".`);
    }
} 

client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;

    // if the command dosen't exist, don't execute the code
    const command = interaction.client.commands.get(interaction.commandName);
    
    if (!command) {
        console.error(`Non è stato trovato alcun comando di nome ${interaction.commandName}`);
        return;
    }

    try {
        await command.execute(interaction);
    }

    catch(error) {
        if (interaction.replied || interaction.deferred) {
            interaction.followUp({ content: `E' stato riscontrato un errore nell'eseguire il comando.`, ephemeral: true });
        }
        else {
            interaction.reply({ content: `E' stato riscontrato un errore nell'eseguire il comando.`, ephemeral: true });
        }
    }   

    console.log(interaction);
});

// when client is ready. Call this function ONE time (once)
client.once(Events.ClientReady, e => {
    console.log(`${e.user.tag} si è connesso a discord!`);
});

// login discord
client.login(token);