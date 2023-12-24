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
    (await pGlob(`${process.cwd()}/src/selectMenus/*/*.js`, { windowsPathsNoEscape: 
        process.env.ON_WINDOWS })).map(async (menuFile) => {
        const menu = require(menuFile);

        if ('data' in menu && 'execute' in menu) {
            client.selectMenus.set(menu.data.name, menu);
        } else {
            console.log(`[AVERTISSEMENT] Le selectMenu à ${menuFile} manque le champs "data" ou "execute".`);
        }
    });
};