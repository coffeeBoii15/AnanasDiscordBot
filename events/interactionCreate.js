const { Events } = require("discord.js");

module.exports = {

    name: Events.InteractionCreate,
    async execute(interaction) {
        if (!interaction.isChatInputCommand()) return;

        // if the command dosen't exist, don't execute the code
        const command = interaction.client.commands.get(interaction.commandName);
        
        if (!command) {
            console.error(`Non è stato trovato alcun comando di nome ${interaction.commandName}`);
            return;
        }

        const { cooldowns } = client;

        if (!cooldowns.has(command.data.name)) {
        	cooldowns.set(command.data.name, new Collection());
        }

        const now = Date.now();
        const timestamps = cooldowns.get(command.data.name);
        const defaultCooldownDuration = 3;
        const cooldownAmount = (command.cooldown ?? defaultCooldownDuration) * 1000;

        if (timestamps.has(interaction.user.id)) {
        	const expirationTime = timestamps.get(interaction.user.id) + cooldownAmount;

	        if (now < expirationTime) {
	        	const expiredTimestamp = Math.round(expirationTime / 1000);
	        	return interaction.reply({ content: `Non puoi subito riusare il comando: \`${command.data.name}\`. Puoi riutilizzarlo tra: <t:${expiredTimestamp}:R>.`, ephemeral: true });
	        }
        }

        timestamps.set(interaction.user.id, now);
        setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);

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
    },

}