const fs = require("fs");
const {SlashCommandBuilder} = require("discord.js");
const path = require("path");
require('colors').enable();

module.exports = (client) => {
    console.log('Loading commands...');
    try {
        let commands = [];

        fs.readdirSync('src/commands').forEach(file => {
            let pull = require(`../commands/${file}`);

            if (pull.name && pull.description && pull.run) {
                const command = new SlashCommandBuilder()
                    .setName(pull.name.toString().toLowerCase())
                    .setDescription(pull.description)

                if (pull.options && pull.options.length > 0) {
                    for (const option of pull.options) {
                        if (option.String && option.String.name && option.String.description) {
                            command.addStringOption(op => {
                                return op
                                    .setName(option.String.name)
                                    .setDescription(option.String.description)
                                    .setRequired(option.String.required);
                            });
                        } else if (option.User && option.User.name && option.User.description) {
                            command.addUserOption(op => {
                                return op
                                    .setName(option.User.name)
                                    .setDescription(option.User.description)
                                    .setRequired(option.User.required);
                            });
                        } else if (option.Integer && option.Integer.name && option.Integer.description) {
                            command.addIntegerOption(op => {
                                return op
                                    .setName(option.Integer.name)
                                    .setDescription(option.Integer.description)
                                    .setRequired(option.Integer.required);
                            });
                        } else if (option.Channel && option.Channel.name && option.Channel.description) {
                            command.addChannelOption(op => {
                                return op
                                    .setName(option.Channel.name)
                                    .setDescription(option.Channel.description)
                                    .setRequired(option.Channel.required);
                            });
                        } else if (option.Role && option.Role.name && option.Role.description) {
                            command.addRoleOption(op => {
                                return op
                                    .setName(option.Role.name)
                                    .setDescription(option.Role.description)
                                    .setRequired(option.Role.required);
                            });
                        } else if (option.StringChoices && option.StringChoices.name && option.StringChoices.description && option.StringChoices.choices && option.StringChoices.choices.length > 0) {
                            command.addStringOption(op => {
                                return op
                                    .setName(option.StringChoices.name)
                                    .setDescription(option.StringChoices.description)
                                    .setRequired(option.StringChoices.required)
                                    .addChoices(...option.StringChoices.choices);
                            });
                        } else if (option.IntegerChoices && option.IntegerChoices.name && option.IntegerChoices.description && option.IntegerChoices.choices && option.IntegerChoices.choices.length > 0) {
                            command.addIntegerOption(op => {
                                return op
                                    .setName(option.IntegerChoices.name)
                                    .setDescription(option.IntegerChoices.description)
                                    .setRequired(option.IntegerChoices.required)
                                    .addChoices(option.IntegerChoices.choices.map(c => [String(c[0]), parseInt(c[1])]));
                            });
                        } else {
                            console.log(`[COMMAND HANDLER] An option is not configured right from the command: ${pull.name}`.red);
                        }
                    }
                }

                commands.push(command.toJSON());
                client.commands.set(pull.name, pull);

            } else {
                console.log(`[COMMAND HANDLER] ${file} is missing name/description/run`.red)
            }
        });

        client.on('ready', () => {
            client.guilds.cache.map(g => g).forEach(guild => {
                try {
                    guild.commands.set(commands)
                        .then(data => {
                            console.log(`${data.size} commands loaded for guild: ${guild.name}`)
                        }).catch(e => console.log(`${e}`.red));
                } catch (e) {
                    console.log(`[COMMAND HANDLER] Error while setting commands in guild ${guild.name}: ${e}`.red);
                }
            })
        })

        client.on('guildCreate', guild => {
            try {
                guild.commands.set(commands)
                    .then(data => {
                        console.log(`${data.size} commands loaded for guild: ${guild.name}`)
                    }).catch(e => console.log(`${e}`.red));
            } catch (e) {
                console.log(`[COMMAND HANDLER] Error while setting commands in guild ${guild.name}: ${e}`.red);
            }
        })

    } catch (e) {
        console.log(`[ERROR] Error while loading commands:\n ${e}`.red);
    }
}