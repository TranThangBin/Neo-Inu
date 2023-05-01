const { SlashCommandBuilder } = require("discord.js");
const fs = require("fs");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("reload")
        .setDescription("Reload a command.")
        .addStringOption((option) =>
            option
                .setName("command")
                .setDescription("The command to reload.")
                .setRequired(true)
        ),
    async execute(interaction) {
        const commandName = interaction.options
            .getString("command", true)
            .toLowerCase();
        const command = interaction.client.commands.get(commandName);

        if (!command) {
            return interaction.reply(
                `There is no command with name \`${commandName}\`!`
            );
        }

        const folders = fs.readdirSync("./commands");
        const folderName = folders.find((folder) =>
            fs.readdirSync(`./commands/${folder}`).includes(`${commandName}.js`)
        );

        const commandPath = `../${folderName}/${command.data.name}.js`;

        delete require.cache[require.resolve(commandPath)];

        try {
            interaction.client.commands.delete(command.data.name);
            const newCommand = require(commandPath);
            interaction.client.commands.set(newCommand.data.name, newCommand);
            await interaction.reply(
                `Command \`${newCommand.data.name}\` was reloaded!`
            );
        } catch (error) {
            console.error(error);
            await interaction.reply(
                `There was an error while reloading a command \`${command.data.name}\`:\n\`${error.message}\``
            );
        }
    },
};
