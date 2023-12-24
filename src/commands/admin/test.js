/*
** Copyright (C) 2023  Guscraftin
**
** This program is free software: you can redistribute it and/or modify
** it under the terms of the GNU General Public License as published by
** the Free Software Foundation, either version 3 of the License, or
** (at your option) any later version.
** 
** This program is distributed in the hope that it will be useful,
** but WITHOUT ANY WARRANTY; without even the implied warranty of
** MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
** GNU General Public License for more details.
** 
** You should have received a copy of the GNU General Public License
** along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, StringSelectMenuBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("test")
        .setDescription("Permet de tester les différents composants.")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .setDMPermission(false),
    async execute(interaction) {
        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('test')
                    .setLabel('Lancer le modal !')
                    .setStyle(ButtonStyle.Primary)
                    .setEmoji('🚧'),
            );

        const row1 = new ActionRowBuilder()
            .addComponents(
                new StringSelectMenuBuilder()
                    .setCustomId('test_selectMenu')
                    .setPlaceholder('Sélectionnez une option')
                    .addOptions(
                        {
                            label: 'Choisissez-moi',
                            description: 'Voici une description',
                            value: 'first_option',
                        },
                        {
                            label: 'Choisissez-moi aussi',
                            description: 'Voici une autre description',
                            value: 'second_option',
                        },
                    ),
            );

        const embed = new EmbedBuilder()
            .setTitle('Embed Test')
            .setDescription("Voici un bouton ci dessous qui doit répondre une phrase.")
            .setColor('DarkAqua')
            .setTimestamp()
            .setFooter({ text: interaction.user.username, iconURL: interaction.user.displayAvatarURL() });

        return interaction.reply({ content: 'Je pense que le déploiement des modules, fonctionne bien.', ephemeral: true, embeds: [embed], components: [row1, row] });
    },
};
