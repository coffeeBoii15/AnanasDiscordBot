const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    
    cooldown: 5,
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Utilizza un algoritmo complicatissimo per sapere il tuo ping."),
    
    async execute(interaction) {
        await interaction.reply("Pong!");
    },
};