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

const { ModalBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle } = require("discord.js");

module.exports = {
    data: {
        name: "test",
    },
    async execute(interaction) {
        const modal = new ModalBuilder()
            .setCustomId("test_modal")
            .setTitle("Tester les modals !");

        const newNameInput = new TextInputBuilder()
            .setCustomId("newTest")
            .setLabel("Ce test est concluant ?")
            .setMinLength(1)
            .setMaxLength(32)
            .setPlaceholder("Tape ta réponse ici !")
            .setStyle(TextInputStyle.Short);

        modal.addComponents(new ActionRowBuilder().addComponents(newNameInput));

        return interaction.showModal(modal);
    }
}