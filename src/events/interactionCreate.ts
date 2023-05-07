import { Collection, Events, Interaction, time } from "discord.js";
import { MyClient } from "../extend/classes.js";
import { Command } from "../extend/interfaces.js";
import { Timestamps } from "../extend/types.js";
import logWithTimestamp from "../log-with-timestamp.js";

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction: Interaction) {
        if (!interaction.isChatInputCommand()) return;

        const client = interaction.client as MyClient;
        const command = client.commands.get(interaction.commandName) as Command;

        if (!command) {
            console.error(`No command matching ${interaction.commandName}`);
            return;
        }

        const { cooldowns } = client;

        if (!cooldowns.has(command.data.name))
            cooldowns.set(command.data.name, new Collection());

        const now = Date.now();
        const timestamps = cooldowns.get(command.data.name) as Timestamps;
        const defaultCooldownDuration = 5;
        const cooldownAmount =
            (command.cooldown ?? defaultCooldownDuration) * 1000;

        if (timestamps.has(interaction.user.id)) {
            const user = timestamps.get(interaction.user.id) as number;
            const expirationTime = user + cooldownAmount;
            if (now < expirationTime) {
                const expirationTimeStamp = Math.round(expirationTime / 1000);
                return interaction.reply({
                    content: `Please wait, you are on a cooldown for \`${command.data.name}\`. You can use it again <t:${expirationTimeStamp}:R>.`,
                    ephemeral: true,
                });
            }
        }

        timestamps.set(interaction.user.id, now);
        setTimeout(() => {
            () => timestamps.delete(interaction.user.id);
        }, cooldownAmount);

        try {
            await command.execute(interaction);
            logWithTimestamp(
                `Executing /${interaction.commandName} by ${interaction.user.tag}`
            );
        } catch (error) {
            console.error(`Error execute ${interaction.commandName}`);
            console.error(error);
        }
    },
};
