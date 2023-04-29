// DEPLOY SLASH COMMANDS
const { REST, Routes } = require("discord.js");
const { clientId, guildId, token } = require("./config.json");
const fs = require("node:fs");
const path = require("node:path");

const commands = [];

// searching for commands
const commandsPath = path.join(__dirname, "commands"); // helps to construct a path to commands
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js")); // create an array of all files that ends with .js

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file); // search for the current file (command)
    const command = require(filePath);

    //push command to guild
    if("data" in command && "execute" in command) {
        commands.push(command.data.toJSON());    
    } 
    else {
        console.log(`[ATTENZIONE] il comando che si trova a ${filePath} non coniente "data" o "execute".`);
    }
} 

// Construct and prepare an instance of the REST module
const rest = new REST().setToken(token);

// and deploy your commands!
(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);

		// The put method is used to fully refresh all commands in the guild with the current set
		const data = await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: commands },
		);

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		// And of course, make sure you catch and log any errors!
		console.error(error);
	}
})();
