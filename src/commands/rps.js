const {EmbedBuilder} = require("discord.js");
require('colors').enable();
module.exports = {
    name: 'rps',
    description: 'Rock, Paper, Scissors!',
    memberPermissions: [],
    requiredRoles: [],
    allowedUserIds: [],
    options: [
        {"String": { name: 'choice', description: 'Your choice (rock, paper, scissors)', required: true } },
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
            let choice = options.getString('choice');

            if (choice.toLowerCase() === 'r') {
                choice = 'Rock';
            } else if (choice.toLowerCase() === 'p') {
                choice = 'Paper';
            } else if (choice.toLowerCase() === 's') {
                choice = 'Scissors';
            }

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