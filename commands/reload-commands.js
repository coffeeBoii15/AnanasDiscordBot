const { SlashCommandBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("reload")
		.setDescription("Serve per ricaricare un comando se modificato.")
		.addStringOption(option =>
			option.setName("comando")
				.setDescription("Il comando da ricaricare")
				.setRequired(true)),
	async execute(interaction) {
        
		const commandName = interaction.options.getString("comando", true).toLowerCase();
		const command = interaction.client.commands.get(commandName);

		if (!command) {
			return interaction.reply(`Non esiste alcun comando di nome \`${commandName}\`!`);
		}

        delete require.cache[require.resolve(`./${command.data.name}.js`)];

        try {
        	interaction.client.commands.delete(command.data.name);
        	const newCommand = require(`./${command.data.name}.js`);
        	interaction.client.commands.set(newCommand.data.name, newCommand);
        	await interaction.reply(`Il comando \`${newCommand.data.name}\` è stato ricaricato!`);
        } catch (error) {
        	console.error(error);
        	await interaction.reply(`C'è stato un errore mentre stavo ricaricando il comando \`${command.data.name}\`:\n\`${error.message}\``);
        } 
	},
};