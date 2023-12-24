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

const { promisify } = require('util');
const { glob } = require('glob');
const pGlob = promisify(glob);

module.exports = async (client) => {
    (await pGlob(`${process.cwd()}/src/modals/*/*.js`, { windowsPathsNoEscape: 
        process.env.ON_WINDOWS })).map(async (modalFile) => {
        const modal = require(modalFile);

        if ('data' in modal && 'execute' in modal) {
            client.modals.set(modal.data.name, modal);
        } else {
            console.log(`[AVERTISSEMENT] Le modal à ${modalFile} manque le champs "data" ou "execute".`);
        }
    });
};