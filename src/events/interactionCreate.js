const {EmbedBuilder} = require("discord.js");
module.exports = {
    name: 'interactionCreate',
    description: 'Runs when an interaction is created',
    run: (client, interaction) => {
        const command = client.commands.get(interaction.commandName);

        if (command.memberPermissions && command.memberPermissions.length > 0 && interaction.member.permissions.has(command.memberPermissions)) {
            return interaction.reply({ ephemeral: true, embeds: [
                    new EmbedBuilder()
                        .setColor(0xe01e01)
                        .setFooter({
                            text: 'DJS | Powered by Jappie639',
                            iconURL: 'https://bytebots.gallerycdn.vsassets.io/extensions/bytebots/discordjs-simplifier/1.2.0/1604088092425/Microsoft.VisualStudio.Services.Icons.Default'
                        })
                        .setTitle('❌ You are not allowed to run this command!')
                        .setDescription(`You need these Permissions:\n${command.memberPermissions}`)
                ]
            });
        }

        if (command.requiredRoles && command.requiredRoles.length > 0 && interaction.member.roles.cache.size > 0 && !interaction.member.roles.cache.some(r => command.requiredRoles.includes(r.id))) {
            return interaction.reply({ ephemeral: true, embeds: [
                    new EmbedBuilder()
                        .setColor(0xe01e01)
                        .setFooter({
                            text: 'DJS | Powered by Jappie639',
                            iconURL: 'https://bytebots.gallerycdn.vsassets.io/extensions/bytebots/discordjs-simplifier/1.2.0/1604088092425/Microsoft.VisualStudio.Services.Icons.Default'
                        })
                        .setTitle('❌ You are not allowed to run this command!')
                        .setDescription(`You need to have one of the following roles:\n${command.memberPermissions}`)
                ]
            });
        }

        if (command.allowedUserIds && command.allowedUserIds.length > 0 && !command.allowedUserIds.includes(interaction.member.id)) {
            return interaction.reply({ ephemeral: true, embeds: [
                    new EmbedBuilder()
                        .setColor(0xe01e01)
                        .setFooter({
                            text: 'DJS | Powered by Jappie639',
                            iconURL: 'https://bytebots.gallerycdn.vsassets.io/extensions/bytebots/discordjs-simplifier/1.2.0/1604088092425/Microsoft.VisualStudio.Services.Icons.Default'
                        })
                        .setTitle('❌ You are not allowed to run this command!')
                        .setDescription(`You need to be one of the following users:\n${command.memberPermissions}`)
                ]
            });
        }


        command.run(client, interaction, interaction.member, interaction.guild);
    }
}