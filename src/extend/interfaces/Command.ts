import { SlashCommandBuilder, CommandInteraction } from "discord.js";

export default interface Command {
    cooldown?: number;
    data: Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">;
    execute(interaction: CommandInteraction): Promise<void>;
}
