const {EmbedBuilder} = require("discord.js");
require('colors').enable();
module.exports = {
    name: 'rps',
    description: 'Rock, Paper, Scissors!',
    memberPermissions: [],
    requiredRoles: [],
    allowedUserIds: [],
    options: [
        {
            "StringChoices": {
            name: 'rps',
                description: 'Your choice',
                required: true,
                choices: [
                    {name: 'Rock', value: 'rock'},
                    {name: 'Paper', value: 'paper'},
                    {name: 'Scissors', value: 'scissors'}
                ]
            }
        },
    ],
    run: async (client, interaction) => {
        try {
            const { options } = interaction;
            let choice = options.getString('rps');

            choice = choice.charAt(0).toUpperCase() + choice.slice(1);

            const myChoice = ['Rock', 'Paper', 'Scissors'][Math.floor(Math.random() * 3)];
            let outcome = 'tied';
            let color = 0x3498db;

            if ((choice.toLowerCase() === 'rock' && myChoice === 'Paper') ||
                (choice.toLowerCase() === 'paper' && myChoice === 'Scissors') ||
                (choice.toLowerCase() === 'scissors' && myChoice === 'Rock')) {
                outcome = 'lost'
                color = 0xff0000;
            } else if ((choice.toLowerCase() === 'rock' && myChoice === 'Scissors') ||
                (choice.toLowerCase() === 'paper' && myChoice === 'Rock') ||
                (choice.toLowerCase() === 'scissors' && myChoice === 'Paper')) {
                outcome = 'won'
                color = 0x00ff00;
            }

            await interaction.reply({embeds: [
                    new EmbedBuilder()
                        .setColor(color)
                        .setFooter({
                            text: 'DJS | Powered by Jappie639',
                            iconURL: 'https://bytebots.gallerycdn.vsassets.io/extensions/bytebots/discordjs-simplifier/1.2.0/1604088092425/Microsoft.VisualStudio.Services.Icons.Default'
                        })
                        .setTitle(`You ${outcome}!`)
                        .setDescription(`Your choice: ${choice}\nMy choice: ${myChoice}`)
                ]
            });
        } catch (e) {
            console.log(`[RPS] Error while executing command: ${e}`.red);
        }
    }
}