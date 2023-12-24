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
const { REST, Routes } = require('discord.js');

module.exports = async (client) => {
    const commands = [];

    (await pGlob(`${process.cwd()}/src/commands/*/*.js`, { windowsPathsNoEscape: 
        process.env.ON_WINDOWS })).map(async (cmdFile) => {
        const cmd = require(cmdFile);
        commands.push(cmd.data.toJSON());

        if ('data' in cmd && 'execute' in cmd) {
            client.commands.set(cmd.data.name, cmd);
        } else {
            console.log(`[AVERTISSEMENT] La commande à ${cmdFile} manque le champs "data" ou "execute".`);
        }
    });

    const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);
    (async () => {
        try {
            console.log(`Lancement du déploiement des ${commands.length} slash commandes (/).`);
    
            // Deploy our commands to one guild
            const data = await rest.put(
                Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
                { body: commands },
            );

            // Deploy our commands globally
            // const data = await rest.put(
            //     Routes.applicationCommands(process.env.CLIENT_ID),
            //     { body: commands },
            // );
    
            console.log(`Déploiement des ${data.length} slash commandes (/) réussit.`);
        } catch (error) {
            console.error(error);
        }
    })();
};