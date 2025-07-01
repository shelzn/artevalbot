import { Listener } from "@sapphire/framework";
import { EmbedBuilder, Interaction, Colors, ButtonInteraction } from "discord.js";

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
    if (!interaction.isButton()) return;
    
    // Check if the button interaction is for role selection
    if (!interaction.customId.startsWith("role-")) return;

    const roleMap: Record<string, string> = {
      "role-minecraft": "MINECRAFT",
      "role-valorant": "VALORANT",
      "role-pubgm": "PUBG",
      "role-ml": "MLBB",
      "role-hok": "HOK",
      "role-ff": "FREEFIRE",
    };

    const member = await interaction.guild?.members.fetch(interaction.user.id);
    if (!member) {
      return interaction.reply({
        content: "❌ Gagal menemukan member.",
        ephemeral: true,
      });
    }

    const roleName = roleMap[interaction.customId];
    if (!roleName) {
      return interaction.reply({
        content: "❌ Role tidak ditemukan.",
        ephemeral: true,
      });
    }

    const role = interaction.guild?.roles.cache.find(
      (r) => r.name === roleName
    );

    if (!role) {
      return interaction.reply({
        content: `❌ Role ${roleName} tidak ditemukan di server.`,
        ephemeral: true,
      });
    }

    let action: string;
    let added: string[] = [];
    let removed: string[] = [];

    if (member.roles.cache.has(role.id)) {
      await member.roles.remove(role);
      removed.push(role.toString());
      action = "dihapus";
    } else {
      await member.roles.add(role);
      added.push(role.toString());
      action = "ditambahkan";
    }

    const embed = new EmbedBuilder()
      .setTitle("Role Updated")
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