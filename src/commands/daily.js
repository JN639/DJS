const User = require('../db/User.js');
const dailyAmount = 500;

require('colors').enable();

module.exports = {
    name: 'daily',
    description: 'Get your daily check',
    memberPermissions: [],
    requiredRoles: [],
    allowedUserIds: [],
    options: [],
    run: async (client, interaction) => {
        try {
            await interaction.reply('Collecting your dailies...');

            let user = await User.findOne({
                userId: interaction.member.id,
            });

            if (user) {
                const lastDailyDate = user.lastDailyCollected?.toDateString();
                const currentDate = new Date().toDateString();

                if (lastDailyDate === currentDate) {
                    await interaction.editReply('You have already collected your dailies today. Come back tomorrow.');
                    return;
                }
            } else {
                user = new User({
                    userId: interaction.member.id,
                });
            }

            user.balance += dailyAmount;
            user.lastDailyCollected = new Date();

            await user.save();

            await interaction.editReply(`${dailyAmount} was added to your balance.\nNew balance: $${user.balance}`);
        } catch (e) {
            console.log(`[DAILY] Error while executing command: ${e}`.red);
        }
    }
}