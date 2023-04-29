const { SlashCommandBuilder } = require("discord.js");

module.exports = {

    data: new SlashCommandBuilder()
        .setName("8-ball")
        .setDescription("Vuoi sapere come sarà il tuo futuro?"),

    async execute(interaction) {
        let randomNumber = Math.floor(Math.random() * 3);

        switch(randomNumber) {
            case 0:
                await interaction.reply("Vedo un futuro radioso e pieno di soldi! Purtoppo esiste Sister e non HopeTale.");
                break;
            
            case 1:
                await interaction.reply("Non vedo nessun futuro lol. Leggo solo il passato!");
                break;
            
            case 2:
                await interaction.reply("Ananas, vedo solo ananas.");
                break;

            case 3:
                await interaction.reply("Vedo...vedo un futuro orribile. In questo futuro, viene aggiunto il parmigiano alla pasta alle vongole.");
                break;
        };
    },

}