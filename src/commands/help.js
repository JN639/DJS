const {EmbedBuilder} = require("discord.js");
require('colors').enable();

module.exports = {
    name: 'help',
    description: 'Sends help on the given command',
    memberPermissions: [],
    requiredRoles: [],
    allowedUserIds: [],
    options: [
        {"String": { name: 'command', description: 'The command you want help for', required: false } },
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

                let usage = `/${command.name}`

                if (command.options && command.options.length > 0) {
                    for (const option of command.options) {
                        const data = option[Object.keys(option)[0]];

                        if (data.required) {
                            usage += ` [${data.name}]`
                        } else {
                            usage += ` {${data.name}]`
                        }
                    }
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
                                { name: 'Description', value: command.description },
                                { name: 'Usage', value: usage}
                            )
                    ]
                });
            }
        } catch (e) {
            console.log(`[HELP] Error while executing command: ${e}`.red);
        }
    }
}