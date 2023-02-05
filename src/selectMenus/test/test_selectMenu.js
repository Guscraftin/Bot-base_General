module.exports = {
    data: {
        name: "test_selectMenu",
    },
    async execute(interaction) {
        switch (interaction.values[0]) {
            case "first_option":
                return interaction.reply({ content: "Vous avez choisi la première option !", ephemeral: true});
            case "second_option":
                return interaction.reply({ content: "Vous avez choisi la deuxième option !", ephemeral: true});
            default:
                return interaction.reply({ content: "Vous n'avez pas choisi d'option !", ephemeral: true});
        }
    }
}