const User = require('../db/User.js');
require('colors').enable();

module.exports = {
    name: 'balance',
    description: 'Returns your balance',
    memberPermissions: [],
    requiredRoles: [],
    allowedUserIds: [],
    options: [],
    run: async (client, interaction) => {
        try {
            await interaction.reply('Collecting your balance...');

            let user = await User.findOne({
                userId: interaction.member.id,
            });

            if (!user) {
                user = new User({
                    userId: interaction.member.id,
                });

                await user.save();
            }

            await interaction.editReply(`Your balance is: $${user.balance}`);
        } catch (e) {
            console.log(`[BALANCE] Error while executing command: ${e}`.red);
        }
    }
}