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

const { Events } = require('discord.js');

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
		if (interaction.isCommand()) {
			const command = interaction.client.commands.get(interaction.commandName);

			if (!command) {
				console.error(`Aucune commande correspondant à ${interaction.commandName} n'a été trouvée.`);
				return;
			}

			try {
				await command.execute(interaction);
			} catch (error) {
				console.error(`Erreur lors de l'exécution de la commande ${interaction.commandName}`);
				console.error(error);
			}
		} else if (interaction.isButton()) {
			const { buttons } = interaction.client;
            const { customId } = interaction;
            const button = buttons.get(customId);
            if (!button) return new Error("Il n'y a pas de code pour ce bouton.");

            try {
                await button.execute(interaction);
            } catch (error) {
                console.error(`Erreur d'exécution du boutton : ${interaction.customId}`);
                console.error(error);
            }
		} else if (interaction.isStringSelectMenu()) {
			const { selectMenus } = interaction.client;
			const { customId } = interaction;
			const selectMenu = selectMenus.get(customId);
			if (!selectMenu) return new Error("Il n'y a pas de code pour ce menu déroulant.");

			try {
				await selectMenu.execute(interaction);
			} catch (error) {
				console.error(`Erreur d'exécution du menu déroulant : ${interaction.customId}`);
				console.error(error);
			}
		} else if (interaction.isModalSubmit()) {
			const { modals } = interaction.client;
			const { customId } = interaction;
			const modal = modals.get(customId);
			if (!modal) return new Error("Il n'y a pas de code pour cette modal.");

			try {
				await modal.execute(interaction);
			} catch (error) {
				console.error(`Erreur d'exécution de la modal : ${interaction.customId}`);
				console.error(error);
			}
		} else if (interaction.isUserContextMenuCommand()) {
			const { contextMenus } = interaction.client;
			const { customId } = interaction;
			const contextMenu = contextMenus.get(customId);
			if (!contextMenu) return new Error("Il n'y a pas de code pour ce menu contextuel.");

			try {
				await contextMenu.execute(interaction);
			} catch (error) {
				console.error(`Erreur d'exécution du menu contextuel : ${interaction.customId}`);
				console.error(error);
			}
		} else {
			console.error(`Interaction inconnue : ${interaction}`);
		}
	},
};