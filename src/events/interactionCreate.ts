import { MyClient } from "../extend/classes.js";
import { Collection, Events, Interaction } from "discord.js";
import { Command } from "../extend/interfaces.js";
import { Timestamps } from "../extend/types.js";

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction: Interaction) {
        if (!interaction.isChatInputCommand()) return;

        const client: MyClient = interaction.client as MyClient;
        const command: Command | undefined = client.commands.get(
            interaction.commandName
        );

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
        const cooldownAmount = command.cooldown ?? defaultCooldownDuration;

        try {
            await command.execute(interaction);
            console.log(`Executing /${interaction.commandName}`);
        } catch (error) {
            console.error(`Error execute ${interaction.commandName}`);
            console.error(error);
        }
    },
};
