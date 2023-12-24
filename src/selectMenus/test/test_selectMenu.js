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