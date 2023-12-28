module.exports = {
    name: 'ready',
    description: 'runs when ready',
    once: true,
    run: (client) => {
        console.log(`Ready! Logged in as ${client.user.tag}`);
    }
}