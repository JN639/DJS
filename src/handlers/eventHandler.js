const fs = require("fs");
module.exports = (client) => {
    console.log('Loading events...');

    let count = 0;

    try {
        fs.readdirSync('src/events').forEach(file => {
            const event = require(`../events/${file}`);

            if (event.name && event.description && event.run) {
                if (event.once) {
                    client.once(event.name, (...args) => event.run(client, ...args))
                } else {
                    client.on(event.name, (...args) => event.run(client, ...args))
                }

                count++;
            } else {
                console.log(`[ERROR] Event is missing name/description/run: ${file}`.red);
            }
        });

        console.log(`${count} events loaded.`);
    } catch (e) {
        console.log(`[ERROR] Error while loading event files: ${e}`.red);
    }
}