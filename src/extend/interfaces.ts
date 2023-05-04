import { SlashCommandBuilder, CommandInteraction } from "discord.js";

export interface Command {
    cooldown?: number;
    data: Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">;
    execute(interaction: CommandInteraction): Promise<void>;
}
