const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    
    data: new SlashCommandBuilder()
        .setName("server")
        .setDescription("Stampa delle informazioni riguardo il server discord."),

    async execute(interaction) {
        await interaction.reply(`Nome del server: ${interaction.guild.name}. Numero dei membri nel server: ${interaction.guild.memberCount}`);
    },

};