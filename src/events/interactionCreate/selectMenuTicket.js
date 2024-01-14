const getLocalCommands = require("../../utils/getLocalCommands");
const { ticketCategory, roleStaff } = require("../../../config.json");

const {
    EmbedBuilder,
    ButtonBuilder,
    ButtonStyle,
    ActionRowBuilder,
    ApplicationCommandOptionType,
    StringSelectMenuBuilder,
    StringSelectMenuOptionBuilder,
    ChannelType,
} = require("discord.js");

const selectMenuTicket = new StringSelectMenuBuilder()
    .setCustomId("ticketMenu")
    .setPlaceholder("Selecione uma opção")
    .addOptions(
        new StringSelectMenuOptionBuilder()
            .setLabel("Dúvidas")
            .setDescription("Dúvidas em geral do servidor")
            .setValue("ticketMenu.duvidas")
            .setEmoji("📝"),
        new StringSelectMenuOptionBuilder()
            .setLabel("Problemas financeiros")
            .setDescription("Problemas financeiros dentro do servidor")
            .setValue("ticketMenu.financeiro")
            .setEmoji("💳")
    );

module.exports = async (client, interaction) => {
    if (!interaction.isStringSelectMenu()) return;

    if (interaction.customId === "ticketMenu") {
        if (interaction.values[0] === "ticketMenu.duvidas") {
            const row = new ActionRowBuilder().addComponents(selectMenuTicket);
            interaction.message.edit({
                components: [row],
            });
            let existe = "";
            const category = client.channels.cache.get(ticketCategory);
            const ids = category.children.cache.map((c) => c.id);

            for (const IDs of ids) {
                try {
                    const channel = await client.channels.fetch(IDs);
                    if (
                        channel.name === `duvidas-${interaction.user.username}`
                    ) {
                        existe = `true-${channel.id}`;
                    }
                } catch (error) {
                    console.log(`❌Error: ${error}`);
                }
            }

            existente = existe.split("-");

            if (existente[0] === "true") {
                interaction.reply({
                    content: `:x: Você já tem um ticket aberto nessa categoria! <#${existente[1]}>`,
                    ephemeral: true,
                });
            } else {
                const ticketChannel = await interaction.guild.channels.create({
                    name: `duvidas-${interaction.user.username}`,
                    parent: ticketCategory,
                    topic: `Membro ID: "${interaction.user.id}"`,
                    type: ChannelType.GuildText,
                    permissionOverwrites: [
                        {
                            id: interaction.user.id,
                            allow: ["SendMessages", "ViewChannel"],
                        },
                        {
                            id: roleStaff,
                            allow: ["SendMessages", "ViewChannel"],
                        },
                        {
                            id: interaction.guild.roles.everyone,
                            deny: ["ViewChannel"],
                        },
                    ],
                });
                interaction.reply({
                    content: `:white_check_mark: Ticket criado com sucesso. <#${ticketChannel.id}>`,
                    ephemeral: true,
                });
                const ticketOpenEmbed = new EmbedBuilder()
                    .setColor("#99FF00")
                    .setTitle(
                        "**Dúvidas - PentaMC** <:pentanew:1129649178088321066>"
                    )
                    .setDescription(
                        `Olá, ${interaction.user}! :wave:\n \nEm breve o seu ticket será atendido por algum membro da equipe, pedimos que aguarde e que diga o que precisa nesse período.`
                    )
                    .setThumbnail(
                        interaction.user.displayAvatarURL({
                            dynamic: true,
                            size: 1024,
                        })
                    )
                    .setFooter({
                        text: "© 2024 PentaMC Todos os direitos reservados.",
                    })
                    .setTimestamp();

                const fecharTicket = new ButtonBuilder()
                    .setCustomId("fecharTicket")
                    .setLabel("Fechar Ticket")
                    .setStyle(ButtonStyle.Danger)
                    .setEmoji("🔐");

                const row = new ActionRowBuilder().addComponents(fecharTicket);

                ticketChannel.send({
                    embeds: [ticketOpenEmbed],
                    content: `${interaction.user} | <@&${roleStaff}>`,
                    components: [row],
                });
            }
        } else if (interaction.values[0] === "ticketMenu.financeiro") {
            const row = new ActionRowBuilder().addComponents(selectMenuTicket);
            interaction.message.edit({
                components: [row],
            });
            const category = client.channels.cache.get(ticketCategory);
            const ids = category.children.cache.map((c) => c.id);

            let existe = "";
            for (const IDs of ids) {
                try {
                    const channel = await client.channels.fetch(IDs);
                    if (
                        channel.name ===
                        `financeiro-${interaction.user.username}`
                    ) {
                        existe = `true-${channel.id}`;
                    }
                } catch (error) {
                    console.log(`❌Error: ${error}`);
                }
            }

            existente = existe.split("-");

            if (existente[0] === "true") {
                interaction.reply({
                    content: `:x: Você já tem um ticket aberto nessa categoria! <#${existente[1]}>`,
                    ephemeral: true,
                });
            } else {
                const ticketChannel = await interaction.guild.channels.create({
                    name: `financeiro-${interaction.user.username}`,
                    parent: ticketCategory,
                    topic: `Membro ID: "${interaction.user.id}"`,
                    type: ChannelType.GuildText,
                    permissionOverwrites: [
                        {
                            id: interaction.user.id,
                            allow: ["SendMessages", "ViewChannel"],
                        },
                        {
                            id: roleStaff,
                            allow: ["SendMessages", "ViewChannel"],
                        },
                        {
                            id: interaction.guild.roles.everyone,
                            deny: ["ViewChannel"],
                        },
                    ],
                });
                interaction.reply({
                    content: `:white_check_mark: Ticket criado com sucesso. <#${ticketChannel.id}>`,
                    ephemeral: true,
                });
                const ticketOpenEmbed = new EmbedBuilder()
                    .setColor("#99FF00")
                    .setTitle(
                        "**Problemas Financeiros - PentaMC** <:pentanew:1129649178088321066>"
                    )
                    .setDescription(
                        `Olá, ${interaction.user}! :wave:\n \nEm breve o seu ticket será atendido por algum membro da equipe, pedimos que aguarde e que diga o que precisa nesse período.`
                    )
                    .setThumbnail(
                        interaction.user.displayAvatarURL({
                            dynamic: true,
                            size: 1024,
                        })
                    )
                    .setFooter({
                        text: "© 2024 PentaMC Todos os direitos reservados.",
                    })
                    .setTimestamp();

                const fecharTicket = new ButtonBuilder()
                    .setCustomId("fecharTicket")
                    .setLabel("Fechar Ticket")
                    .setStyle(ButtonStyle.Danger)
                    .setEmoji("🔐");

                const row = new ActionRowBuilder().addComponents(fecharTicket);

                ticketChannel.send({
                    embeds: [ticketOpenEmbed],
                    content: `${interaction.user} | <@&${roleStaff}>`,
                    components: [row],
                });
            }
        }
    }
};
