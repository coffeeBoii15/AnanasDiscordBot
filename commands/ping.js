const { SlashCommandBuilder } = require("discord.js");
const wait = require('node:timers/promises').setTimeout;

module.exports = {
    
    cooldown: 5,
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Utilizza un algoritmo complicatissimo per sapere il tuo ping."),
    
    async execute(interaction) {
        // await interaction.reply({ content: "Pong segreto!", ephemeral: true });
        await interaction.reply("Pong!");
        await wait(3000);
        await interaction.editReply("Ecco il tuo ping: 🏓ms");
    },
};