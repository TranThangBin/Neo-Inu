import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { MyClient } from "../../extend/classes";
import fs from "fs";
import path from "path";

module.exports = {
    data: new SlashCommandBuilder()
        .setName("reload")
        .setDescription("Reload commands.")
        .addStringOption((option) =>
            option
                .setName("command")
                .setDescription(
                    "The command you want to reload (blank if reload all)."
                )
        ),
    async execute(interaction: CommandInteraction) {
        const client = interaction.client as MyClient;
        const commandName = interaction.options.get("command")?.value as string;
        if (!commandName) {
            const commandRoot = path.join(__dirname, "..");
            const commandFolders = fs.readdirSync(commandRoot);
            for (const folder of commandFolders) {
                const commandPath = path.join(commandRoot, folder);

                const commandFiles = fs
                    .readdirSync(commandPath)
                    .filter((file) => file.endsWith(".js"));

                for (const file of commandFiles) {
                    const command = path.join(commandPath, file);
                    delete require.cache[require.resolve(command)];
                    try {
                        const newCommand = require(command);
                        console.log(
                            `Reloading command /${newCommand.data.name}.`
                        );
                        client.commands.set(newCommand.data.name, newCommand);
                    } catch (error: any) {
                        console.error(error);
                        await interaction.reply({
                            content: `There was an error while reloading a command \`${file}\`:\n\`${error.message}\``,
                            ephemeral: true,
                        });
                    }
                }
            }
            await interaction.reply({
                content: `\`All commands\` were reloaded!`,
                ephemeral: true,
            });
            return;
        }

        const command = client.commands.get(commandName);
        if (!command) {
            return interaction.reply(
                `There is no command with name \`/${commandName}\`!`
            );
        }

        const commandRoot = path.join(__dirname, "..");
        const folderName =
            fs
                .readdirSync(commandRoot)
                .find((folder) =>
                    fs
                        .readdirSync(path.join(commandRoot, folder))
                        .includes(`${commandName}.js`)
                ) ?? "";

        const commandPath = path.join(
            commandRoot,
            folderName,
            `${command.data.name}.js`
        );

        delete require.cache[require.resolve(commandPath)];

        try {
            client.commands.delete(command.data.name);
            const newCommand = require(commandPath);
            console.log(`Reloading command /${newCommand.data.name}.`);
            client.commands.set(newCommand.data.name, newCommand);
            await interaction.reply({
                content: `Command \`/${newCommand.data.name}\` was reloaded!`,
                ephemeral: true,
            });
        } catch (error: any) {
            console.error(error);
            await interaction.reply({
                content: `There was an error while reloading a command \`${command.data.name}\`:\n\`${error.message}\``,
                ephemeral: true,
            });
        }
    },
};
