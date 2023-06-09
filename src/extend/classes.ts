import { Client, ClientOptions, Collection } from "discord.js";
import { Command } from "./interfaces.js";
import { Timestamps } from "./types.js";
import fs from "fs";
import path from "path";
import logWithTimestamp from "../log-with-timestamp.js";

export class MyClient extends Client {
    commands: Collection<string, Command>;
    cooldowns: Collection<string, Timestamps>;
    constructor(options: ClientOptions) {
        super(options);
        this.commands = new Collection();
        this.cooldowns = new Collection();
        this.loadEvent();
        this.loadCommands();
    }
    loadEvent(): void {
        const eventPath = path.join(__dirname, "..", "events");
        const eventFiles = fs
            .readdirSync(eventPath)
            .filter((file) => file.endsWith(".js"));

        for (const file of eventFiles) {
            const filePath = path.join(eventPath, file);
            const event = require(filePath);
            if (event.once)
                this.once(event.name, (...args) => event.execute(...args));
            else this.on(event.name, (...args) => event.execute(...args));
        }
    }
    loadCommands(): void {
        const commandRoot = path.join(__dirname, "..", "commands");
        const commandFolders = fs.readdirSync(commandRoot);

        for (const folder of commandFolders) {
            const commandPath = path.join(commandRoot, folder);
            const commandFiles = fs
                .readdirSync(commandPath)
                .filter((file) => file.endsWith(".js"));
            for (const file of commandFiles) {
                const filePath = path.join(commandPath, file);
                const command = require(filePath);
                if ("data" in command && "execute" in command) {
                    logWithTimestamp(`Loading command /${command.data.name}.`);
                    this.commands.set(command.data.name, command);
                } else
                    logWithTimestamp(
                        `[WARNING] The command at ${filePath} is missing a required or "execute property.`
                    );
            }
        }
    }
}
