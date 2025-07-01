import { Command } from "@sapphire/framework";
import {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  ActionRowBuilder,
  StringSelectMenuBuilder,
} from "discord.js";

export class SelectRoleCommand extends Command {
  public override registerApplicationCommands(registry: Command.Registry) {
    registry.registerChatInputCommand(
      new SlashCommandBuilder()
        .setName("selectrole")
        .setDescription("Pilih Game Role yang kamu suka!")
    );
  }

  public override async chatInputRun(interaction: ChatInputCommandInteraction) {
    const selectMenu = new StringSelectMenuBuilder()
      .setCustomId("select-game-role")
      .setPlaceholder("Pilih Game Role kamu disini!")
      .setMinValues(1)
      .setMaxValues(6)
      .addOptions(
        {
          label: "Minecraft",
          value: "minecraft",
          emoji: "<:minecraft:1389414456525721640>",
          description: "Klik disini untuk mendapatkan role Minecraft",
        },
        {
          label: "Valorant",
          value: "valorant",
          emoji: "<:valorant:1389415976986083428>",
          description: "Klik disini untuk mendapatkan role Valorant",
        },
        {
          label: "PUBG Mobile",
          value: "pubgm",
          emoji: "<:pubgm:1389415973823447080>",
          description: "Klik disini untuk mendapatkan role PUBG Mobile",
        },
        {
          label: "Mobile Legends",
          value: "ml",
          emoji: "<:mlbb:1389415967435526246>",
          description: "Klik disini untuk mendapatkan role Mobile Legends",
        },
        {
          label: "Honor of Kings",
          value: "hok",
          emoji: "<:hok:1389415963849392129>",
          description: "Klik disini untuk mendapatkan role Honor of Kings",
        },
        {
          label: "Free Fire",
          value: "ff",
          emoji: "<:freefire:1389415960577970297>",
          description: "Klik disini untuk mendapatkan role Free Fire",
        }
      );

    const row = new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(
      selectMenu
    );

    await interaction.reply({
      content: "Silahkan pilih roles sesuai dengan Game kesukaan mu",
      components: [row],
    });
  }
}
