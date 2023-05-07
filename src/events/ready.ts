import { MyClient } from "../extend/classes.js";
import { Events } from "discord.js";
import logWithTimestamp from "../log-with-timestamp.js";

module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(client: MyClient) {
        logWithTimestamp(`Ready! Logged in as ${client.user?.tag}`);
    },
};
