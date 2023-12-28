const {EmbedBuilder} = require("discord.js");
require('colors').enable();

module.exports = {
    name: 'help',
    description: 'Sends help on the given command',
    memberPermissions: [],
    requiredRoles: [],
    allowedUserIds: [],
    options: [
        {"String": { name: 'command', description: 'The Command you want help for', required: false } },
        // {"User": { name: 'title', description: 'What do you need to input', required: true } },
        // {"Integer": { name: 'title', description: 'What do you need to input', required: true } },
        // {"Channel": { name: 'title', description: 'What do you need to input', required: true } },
        // {"Role": { name: 'title', description: 'What do you need to input', required: true } },
        // {"StringChoices": { name: 'title', description: 'What do you need to input', required: true, choices: [['whatUserSees', 'value'], ['whatUserSees2', 'value2']] } },
        // {"IntegerChoices": { name: 'title', description: 'What do you need to input', required: true, choices: [['whatUserSees', 123], ['whatUserSees2', 456]] } },
    ],
    run: async (client, interaction) => {
        try {
            const { options } = interaction;
            let commandName = options.getString('command');

            if (commandName == null) {
                await interaction.reply({ephemeral: true, embeds: [
                        new EmbedBuilder()
                            .setColor(0x3498db)
                            .setFooter({
                                text: 'DJS | Powered by Jappie639',
                                iconURL: 'https://bytebots.gallerycdn.vsassets.io/extensions/bytebots/discordjs-simplifier/1.2.0/1604088092425/Microsoft.VisualStudio.Services.Icons.Default'
                            })
                            .setTitle('DJS Help')
                            .setDescription('Use `/help [command]` to get more information about a command.')
                            .addFields({ name: 'Commands', value: client.commands.map(c => c.name).filter(c => c !== 'help').join(', ')})
                    ]
                });
            } else {
                const command = client.commands.get(commandName.toLowerCase());

                if (command == null) {
                    await interaction.reply(`Command \`${commandName}\` not found. Try \`/help\` to see all commands.`);
                    return;
                }

                await interaction.reply({ephemeral: true, embeds: [
                        new EmbedBuilder()
                            .setColor(0x3498db)
                            .setFooter({
                                text: 'DJS | Powered by Jappie639',
                                iconURL: 'https://bytebots.gallerycdn.vsassets.io/extensions/bytebots/discordjs-simplifier/1.2.0/1604088092425/Microsoft.VisualStudio.Services.Icons.Default'
                            })
                            .setTitle('DJS Help')
                            .addFields(
                                { name: 'Name', value: command.name },
                                { name: 'Description', value: command.description }
                            )
                    ]
                });
            }
        } catch (e) {
            console.log(`[HELP] Error while executing command: ${e}`.red);
        }
    }
}