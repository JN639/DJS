require('colors').enable();
module.exports = {
    name: 'ping',
    description: 'Returns the ping of the bot and the Discord API',
    memberPermissions: [],
    requiredRoles: [],
    allowedUserIds: [],
    options: [
        // {"String": { name: 'title', description: 'What do you need to input', required: true } },
        // {"User": { name: 'title', description: 'What do you need to input', required: true } },
        // {"Integer": { name: 'title', description: 'What do you need to input', required: true } },
        // {"Channel": { name: 'title', description: 'What do you need to input', required: true } },
        // {"Role": { name: 'title', description: 'What do you need to input', required: true } },
        // {"StringChoices": { name: 'title', description: 'What do you need to input', required: true, choices: [['whatUserSees', 'value'], ['whatUserSees2', 'value2']] } },
        // {"IntegerChoices": { name: 'title', description: 'What do you need to input', required: true, choices: [['whatUserSees', 123], ['whatUserSees2', 456]] } },
    ],
    run: async (client, interaction) => {
        try {
            const date = Date.now();
            await interaction.reply(`Pinging...`);

            await interaction.editReply(`Ping: \`${Math.round(Date.now() - date)}ms\` \nApi latency: \`${Math.round(client.ws.ping)}ms\` `)
        } catch (e) {
            console.log(`[PING] Error while executing command: ${e}`.red);
        }
    }
}