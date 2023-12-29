# Use this template to add commands:
```js
module.exports = {
    name: 'name', // Name of command in lowercase and without spaces
    description: 'Description for in the help command',
    memberPermissions: [], // Permissions needed to run this command
    requiredRoles: [], // Roles needed to run this command (role IDs)
    allowedUserIds: [], // Allowed User IDs that can run this command
    options: [
        {"String": { name: 'string', description: 'The user will see this, so explain the option', required: true } },
        {"User": { name: 'user', description: 'The user will see this, so explain the option', required: true } },
        {"Integer": { name: 'integer', description: 'The user will see this, so explain the option', required: true } },
        {"Channel": { name: 'channel', description: 'The user will see this, so explain the option', required: true } },
        {"Role": { name: 'role', description: 'The user will see this, so explain the option', required: true } },
        {"StringChoices": { name: 'string_choices', description: 'The user will see this, so explain the option', required: true, choices: [{name: 'Choice 1', value: 'value1'}, {name: 'Choice 2', value: 'value2'}] } },
        {"IntegerChoices": { name: 'integer_choices', description: 'The user will see this, so explain the option', required: true, choices: [{name: 'Choice 1', value: 123}, {name: 'Choice 2', value: 456}] } },
    ],
    run: async (client, interaction) => {
        const { options } = interaction;

        const string = options.getString('string');
        const user = options.getUser('user');
        const integer = options.getInteger('integer');
        const channel = options.getChannel('channel');
        const role = options.getRole('role');
        const string_choices = options.getString('string_choices');
        const integer_choices = options.getInteger('integer_choices');
        
        // reply to the user in text
        await interaction.reply('Do what you want')
        
        // reply to the user in embed
        // Add 'ephemeral: true' to only let the issuer see the reply
        await interaction.reply({ephemeral: true, embeds: [
            new EmbedBuilder()
                .setTitle('title')
                .setDescription('description')
                .setColor(0x3498db)
                .setFooter({
                    text: 'DJS | Powered by Jappie639',
                    iconURL: 'https://bytebots.gallerycdn.vsassets.io/extensions/bytebots/discordjs-simplifier/1.2.0/1604088092425/Microsoft.VisualStudio.Services.Icons.Default'
                })
            ]
        });
    }
}
```