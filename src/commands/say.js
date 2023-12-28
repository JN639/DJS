const {EmbedBuilder} = require("discord.js");
require('colors').enable();

module.exports = {
    name: 'say',
    description: 'Says what the user inputs',
    memberPermissions: [],
    requiredRoles: [],
    allowedUserIds: [],
    options: [
        {"String": { name: 'message', description: 'What you want me to say', required: true } },
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
            const msg = options.getString('message');

            await interaction.channel.send(msg);
            await interaction.reply({ephemeral: true, embeds: [
                new EmbedBuilder()
                    .setColor(0x3498db)
                    .setFooter({
                        text: 'DJS | Powered by Jappie639',
                        iconURL: 'https://bytebots.gallerycdn.vsassets.io/extensions/bytebots/discordjs-simplifier/1.2.0/1604088092425/Microsoft.VisualStudio.Services.Icons.Default'
                    })
                    .setTitle('DJS')
                    .setDescription('Message sent!')
                ]
            });

        } catch (e) {
            console.log(`[SAY] Error while executing command: ${e}`.red);
        }
    }
}