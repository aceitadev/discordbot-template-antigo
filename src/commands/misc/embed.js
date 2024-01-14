const {
    EmbedBuilder,
    ButtonBuilder,
    ButtonStyle,
    ActionRowBuilder,
    ApplicationCommandOptionType,
    StringSelectMenuBuilder,
    StringSelectMenuOptionBuilder,
} = require("discord.js");

module.exports = {
    name: "embed",
    description: "Mensagens/Painel",
    options: [
        {
            name: "options",
            description: "Options",
            type: ApplicationCommandOptionType.String,
            required: true,
        },
    ],
    callback: async (client, interaction) => {
        const options = interaction.options.get("options").value;

        if (options === "ticketpainel") {
            const ticketEmbed = new EmbedBuilder()
                .setColor("#99FF00")
                .setTitle("Atendimento - PentaMC")
                .setDescription(
                    "Olá, caro jogador :wave:\n\nEstá precisando de atendimento com a nossa equipe?\nCrie um ticket, será um prazer lhe atender!:man_tipping_hand: \n\nSelecione a opção abaixo no que deseja solicitar! :star2:\nUso indevido do ticket resultará em punições! :octagonal_sign:"
                )
                .setThumbnail(
                    "https://cdn.discordapp.com/icons/1086119689647833118/a5ad682a485bd50fb16eafce22908e6e.png?size=2048"
                )
                .setFooter({
                    text: "© 2024 PentaMC Todos os direitos reservados.",
                });

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
                        .setDescription(
                            "Problemas financeiros dentro do servidor"
                        )
                        .setValue("ticketMenu.financeiro")
                        .setEmoji("💳")
                );

            const row = new ActionRowBuilder().addComponents(selectMenuTicket);

            interaction.reply({
                content: `:white_check_mark: Painel enviado com sucesso. <#${interaction.channelId}>`,
                ephemeral: true,
            }),
                interaction.channel.send({
                    embeds: [ticketEmbed],
                    components: [row],
                });
        } else {
            interaction.reply({
                content: `:x: Opção não encontrada.`,
                ephemeral: true,
            });
        }
    },
};
