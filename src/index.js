const discord = require('discord.js');
require('dotenv').config();

const client = new discord.Client({
    intents: [
        discord.GatewayIntentBits.Guilds,
        discord.GatewayIntentBits.GuildMembers,
        discord.GatewayIntentBits.GuildBans,
        discord.GatewayIntentBits.GuildEmojisAndStickers,
        discord.GatewayIntentBits.GuildIntegrations,
        discord.GatewayIntentBits.GuildWebhooks,
        discord.GatewayIntentBits.GuildInvites,
        discord.GatewayIntentBits.GuildVoiceStates,
        discord.GatewayIntentBits.GuildMessages,
        discord.GatewayIntentBits.GuildMessageReactions,
        discord.GatewayIntentBits.GuildMessageTyping,
        discord.GatewayIntentBits.DirectMessages,
        discord.GatewayIntentBits.DirectMessageReactions,
        discord.GatewayIntentBits.DirectMessageTyping,
        discord.GatewayIntentBits.GuildScheduledEvents,
        discord.GatewayIntentBits.MessageContent
    ]
});

client.commands = new discord.Collection();

require('./handlers/commandHandler.js')(client);
require('./handlers/eventHandler.js')(client);

client.login(process.env.TOKEN);