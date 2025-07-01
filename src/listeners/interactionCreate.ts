import { Listener } from "@sapphire/framework";
import { EmbedBuilder, Interaction, Colors } from "discord.js";

export class RoleSelectListener extends Listener {
  public constructor(
    context: Listener.LoaderContext,
    options: Listener.Options
  ) {
    super(context, {
      ...options,
      event: "interactionCreate",
    });
  }

  public async run(interaction: Interaction) {
    if (!interaction.isStringSelectMenu()) return;
    if (interaction.customId !== "select-game-role") return;

    const roleMap: Record<string, string> = {
      minecraft: "MINECRAFT",
      valorant: "VALORANT",
      pubgm: "PUBG",
      ml: "MLBB",
      hok: "HOK",
      ff: "FREEFIRE",
    };

    const member = await interaction.guild?.members.fetch(interaction.user.id);
    if (!member) {
      return interaction.reply({
        content: "❌ Gagal menemukan member.",
        ephemeral: true,
      });
    }

    const added: string[] = [];
    const removed: string[] = [];

    for (const value of interaction.values) {
      const roleName = roleMap[value];
      const role = interaction.guild?.roles.cache.find(
        (r) => r.name === roleName
      );

      if (!role) continue;

      if (member.roles.cache.has(role.id)) {
        await member.roles.remove(role);
        removed.push(role.toString());
      } else {
        await member.roles.add(role);
        added.push(role.toString());
      }
    }

    const embed = new EmbedBuilder()
      .setTitle("User roles updated")
      .setColor(Colors.Green)
      .addFields(
        {
          name: "Ditambahkan:",
          value: added.length ? added.join(" , ") : "/",
        },
        {
          name: "Dihapus:",
          value: removed.length ? removed.join(" , ") : "/",
        }
      )
      .setFooter({
        text: `${
          interaction.user.username
        } • Today at ${new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}`,
        iconURL: interaction.user.displayAvatarURL(),
      });

    return interaction.reply({
      embeds: [embed],
      ephemeral: true,
    });
  }
}
