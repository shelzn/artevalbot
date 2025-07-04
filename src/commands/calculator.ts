import { Command } from "@sapphire/framework";
import {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  EmbedBuilder,
  Colors,
  MessageFlags,
} from "discord.js";
import {
  calculateMagicWheel,
  calculateWinRate,
  calculateZodiac,
} from "../utils/formula";

export class CalculatorCommand extends Command {
  public override registerApplicationCommands(registry: Command.Registry) {
    registry.registerChatInputCommand(
      new SlashCommandBuilder()
        .setName("calculator")
        .setDescription("Kalkulator Game Tools")
        .addSubcommand((sub) =>
          sub
            .setName("winrate")
            .setDescription("Hitung winrate kamu")
            .addIntegerOption((option) =>
              option
                .setName("match")
                .setDescription("Jumlah total pertandingan saat ini")
                .setRequired(true)
            )
            .addIntegerOption((option) =>
              option
                .setName("winrate")
                .setDescription("Jumlah total winrate saat ini")
                .setRequired(true)
            )
            .addIntegerOption((option) =>
              option
                .setName("target")
                .setDescription("Target winrate yang ingin dicapai")
                .setRequired(true)
            )
        )
        .addSubcommand((sub) =>
          sub
            .setName("magicwheel")
            .setDescription(
              "Hitung estimasi jumlah draw untuk dapat skin legend (Magic Wheel)"
            )
            .addIntegerOption((option) =>
              option
                .setName("fragment")
                .setDescription(
                  "Jumlah magic crystal fragment yang sudah dimiliki"
                )
                .setRequired(true)
            )
        )
        .addSubcommand((sub) =>
          sub
            .setName("zodiac")
            .setDescription("Hitung estimasi diamond untuk dapat skin zodiac")
            .addIntegerOption((option) =>
              option
                .setName("star")
                .setDescription("Jumlah starlight gem yang sudah dimiliki")
                .setRequired(true)
            )
        )
    );
  }

  public override async chatInputRun(interaction: ChatInputCommandInteraction) {
    const subcommand = interaction.options.getSubcommand();

    if (subcommand === "winrate") {
      const match = interaction.options.getInteger("match", true);
      const winrate = interaction.options.getInteger("winrate", true);
      const target = interaction.options.getInteger("target", true);

      const calculateWr = calculateWinRate(match, winrate, target);

      const embed = new EmbedBuilder()
        .setTitle("📊 Winrate Calculator")
        .setDescription(
          `Jumlah pertandingan: **${match}**\nWinrate saat ini: **${winrate}**%\nTarget winrate: **${target}%**\n\nKamu perlu **${calculateWr}** pertandingan tanpa kalah untuk mencapai winrate **${target}%**.`
        )
        .setColor(Colors.Blue);

      return interaction.reply({
        embeds: [embed],
        flags: MessageFlags.Ephemeral,
      });
    }

    if (subcommand === "magicwheel") {
      const fragment = interaction.options.getInteger("fragment", true);
      const calculateMW = calculateMagicWheel(fragment);

      const embed = new EmbedBuilder()
        .setTitle("🎡 Magic Wheel Calculator")
        .setDescription(
          `Fragment dimiliki: **${fragment}**\n\nKamu perlu maksimal **${calculateMW}** diamond untuk melakukan draw pada Magic Wheel.`
        )
        .setColor(Colors.Purple);

      return interaction.reply({
        embeds: [embed],
        flags: MessageFlags.Ephemeral,
      });
    }

    if (subcommand === "zodiac") {
      const star = interaction.options.getInteger("star", true);
      const zodiacCalculated = calculateZodiac(star);

      const embed = new EmbedBuilder()
        .setTitle("♈ Zodiac Calculator")
        .setDescription(
          `**Star dimiliki:** ${star}\n\nKamu perlu maksimal **${zodiacCalculated}** diamond untuk mendapatkan skin zodiac.`
        )
        .setColor(Colors.Orange);

      return interaction.reply({
        embeds: [embed],
        flags: MessageFlags.Ephemeral,
      });
    }

    return interaction.reply("Subcommand tidak ditemukan.");
  }
}
