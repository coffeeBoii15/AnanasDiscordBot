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