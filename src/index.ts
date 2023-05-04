import * as dotenv from "dotenv";
import { MyClient } from "./extend/classes.js";
import { GatewayIntentBits } from "discord.js";
dotenv.config();
const token = process.env.TOKEN;

const client = new MyClient({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildVoiceStates,
    ],
});

client.login(token);
