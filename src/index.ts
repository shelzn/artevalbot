import {
  ApplicationCommandRegistries,
  RegisterBehavior,
  SapphireClient,
} from "@sapphire/framework";
import { GatewayIntentBits } from "discord.js";
import dotenv from "dotenv";

dotenv.config();

ApplicationCommandRegistries.setDefaultBehaviorWhenNotIdentical(
  RegisterBehavior.BulkOverwrite
);

const client = new SapphireClient({
  defaultPrefix: "!",
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.login(process.env.TOKEN).then(() => {
  console.log("Bot is online!");
});
