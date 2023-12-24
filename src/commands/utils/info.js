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

const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("info")
        .setDescription("Afficher les informations du bot.")
        .setDMPermission(true),
    async execute(interaction) {
        const botUser = interaction.client.user;
        let isTeamOwner = false;
        let owner = "Aucun";
        await interaction.client.application.fetch().then(function(bot) {
            if (bot.owner.username !== undefined) {
                owner = `▸ [${bot.owner.username}](https://discord.com/users/${bot.owner.id})`
            } else {
                isTeamOwner = true;
                owner = "";
                bot.owner.members.forEach(member => {
                    owner += `▸ [${member.user.username}](https://discord.com/users/${member.user.id})\n`;
                });
            }
        });

        const embed = new EmbedBuilder()
            .setTitle('Information sur le bot :')
            .setAuthor({ name: botUser.username, iconURL: botUser.displayAvatarURL() })
            .setThumbnail(interaction.client.user.displayAvatarURL())
            .setURL('https://apprendre-discord.fr')
            .setDescription("J'ai été créé dans le but d'aider un maximum de personne sur discord.")
            .addFields(
                { name: 'Date de création', value: `<t:${parseInt(botUser.createdTimestamp / 1000)}:R>`, inline: true },
                { name: 'En ligne depuis', value: `<t:${parseInt(interaction.client.readyTimestamp / 1000)}:f>`, inline: true },
                { name: `${isTeamOwner ? "Mes propriétaires" : "Mon propriétaire"} :`, value: owner, inline: true },
                { name: 'Mes développeurs :', value: `▸ [Guscraftin](https://github.com/Guscraftin)`, inline: true },
            )
            .setColor('DarkAqua')
            .setTimestamp()
            .setFooter({ text: interaction.user.username, iconURL: interaction.user.displayAvatarURL() });

        return interaction.reply({ content: null, embeds: [embed] });
    },
};
