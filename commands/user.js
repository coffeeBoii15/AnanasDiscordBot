const { SlashCommandBuilder } = require("discord.js");

module.exports = {

    data: new SlashCommandBuilder()
        .setName("user")
        .setDescription("Informazioni generali sull'utente."),

    async execute(interaction) {
        // interaction.user rappresent the user who executed the command
        // interaction.guild rappresent the guild where the command was executed
        await interaction.reply(`Il comando è stato eseguito da ${interaction.user} nel gruppo discord ${interaction.guild.name}.`);
    },

};