require('colors').enable();
module.exports = {
    name: 'ping',
    description: 'Returns the ping of the bot and the Discord API',
    memberPermissions: [],
    requiredRoles: [],
    allowedUserIds: [],
    options: [],
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