const { SlashCommandBuilder } = require("discord.js");
const fs = require("fs");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("reload")
        .setDescription("Reload a command.")
        .addStringOption((option) =>
            option.setName("command").setDescription("The command to reload.")
        ),
    async execute(interaction) {
        const commandName = interaction.options
            .getString("command")
            ?.toLowerCase();
        if (!commandName) {
            const folders = fs.readdirSync("./commands");
            for (const folder of folders) {
                const commandFiles = fs
                    .readdirSync(`./commands/${folder}`)
                    .filter((file) => file.endsWith(".js"));
                for (const file of commandFiles) {
                    const commandPath = `../${folder}/${file}`;
                    delete require.cache[require.resolve(commandPath)];
                    try {
                        const newCommand = require(commandPath);
                        interaction.client.commands.set(
                            newCommand.data.name,
                            newCommand
                        );
                    } catch (error) {
                        console.error(error);
                        await interaction.reply({
                            content: `There was an error while reloading a command \`${file}\`:\n\`${error.message}\``,
                            ephemeral: true,
                        });
                    }
                }
            }
            await interaction.reply({
                content: `All commands were reloaded!`,
                ephemeral: true,
            });
        } else {
            const command = interaction.client.commands.get(commandName);
            if (!command) {
                return interaction.reply(
                    `There is no command with name \`${commandName}\`!`
                );
            }

            const folders = fs.readdirSync("./commands");
            const folderName = folders.find((folder) =>
                fs
                    .readdirSync(`./commands/${folder}`)
                    .includes(`${commandName}.js`)
            );

            const commandPath = `../${folderName}/${command.data.name}.js`;

            delete require.cache[require.resolve(commandPath)];

            try {
                interaction.client.commands.delete(command.data.name);
                const newCommand = require(commandPath);
                interaction.client.commands.set(
                    newCommand.data.name,
                    newCommand
                );
                await interaction.reply({
                    content: `Command \`${newCommand.data.name}\` was reloaded!`,
                    ephemeral: true,
                });
            } catch (error) {
                console.error(error);
                await interaction.reply({
                    content: `There was an error while reloading a command \`${command.data.name}\`:\n\`${error.message}\``,
                    ephemeral: true,
                });
            }
        }
    },
};
