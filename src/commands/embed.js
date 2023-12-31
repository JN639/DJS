const {EmbedBuilder} = require("discord.js");
require('colors').enable();
module.exports = {
    name: 'embed',
    description: 'Creates an embed and replies it to the user',
    memberPermissions: [],
    requiredRoles: [],
    allowedUserIds: [],
    options: [
        {"String": { name: 'title', description: 'The title of the embed', required: true } },
        {"String": { name: 'description', description: 'The description of the embed', required: true } },
    ],
    run: async (client, interaction) => {
        try {
            const { options } = interaction;
            const title = options.getString('title');
            const description = options.getString('description');

            await interaction.reply({embeds: [
                new EmbedBuilder()
                    .setColor(0x3498db)
                    .setFooter({
                        text: 'DJS | Powered by Jappie639',
                        iconURL: 'https://bytebots.gallerycdn.vsassets.io/extensions/bytebots/discordjs-simplifier/1.2.0/1604088092425/Microsoft.VisualStudio.Services.Icons.Default'
                    })
                    .setTitle(title)
                    .setDescription(description)
                ]
            });
        } catch (e) {
            console.log(`[EMBED] Error while executing command: ${e}`.red);
        }
    }
}