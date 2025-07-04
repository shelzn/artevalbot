import { Command } from "@sapphire/framework";
import {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
  Colors,
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
    const row1 = new ActionRowBuilder<ButtonBuilder>().addComponents(
      new ButtonBuilder()
        .setCustomId("role-minecraft")
        .setLabel("Minecraft")
        .setEmoji("<:minecraft:1389414456525721640>")
        .setStyle(ButtonStyle.Secondary),
      new ButtonBuilder()
        .setCustomId("role-valorant")
        .setLabel("Valorant")
        .setEmoji("<:valorant:1389415976986083428>")
        .setStyle(ButtonStyle.Secondary),
      new ButtonBuilder()
        .setCustomId("role-pubgm")
        .setLabel("PUBG Mobile")
        .setEmoji("<:pubgm:1389415973823447080>")
        .setStyle(ButtonStyle.Secondary)
    );

    const row2 = new ActionRowBuilder<ButtonBuilder>().addComponents(
      new ButtonBuilder()
        .setCustomId("role-ml")
        .setLabel("Mobile Legends")
        .setEmoji("<:mlbb:1389415967435526246>")
        .setStyle(ButtonStyle.Secondary),
      new ButtonBuilder()
        .setCustomId("role-hok")
        .setLabel("Honor of Kings")
        .setEmoji("<:hok:1389415963849392129>")
        .setStyle(ButtonStyle.Secondary),
      new ButtonBuilder()
        .setCustomId("role-ff")
        .setLabel("Free Fire")
        .setEmoji("<:freefire:1389415960577970297>")
        .setStyle(ButtonStyle.Secondary)
    );

    const embed = new EmbedBuilder()
      .setTitle("Games Role")
      .setDescription("**Silahkan pilih roles sesuai dengan Game kesukaan mu**")
      .setColor(Colors.Blue)
      .setFooter({
        text: "Copyright © ArtevalClan | @shelzndev",
      });

    await interaction.reply({
      embeds: [embed],
      components: [row1, row2],
    });
  }
}
