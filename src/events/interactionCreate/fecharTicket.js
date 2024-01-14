const getLocalCommands = require("../../utils/getLocalCommands");
const { ticketLogs, ticketArquivos } = require("../../../config.json");

const { createTranscript } = require("discord-html-transcripts");

const {
    EmbedBuilder,
    ButtonBuilder,
    ButtonStyle,
    ActionRowBuilder,
    ApplicationCommandOptionType,
    StringSelectMenuBuilder,
    StringSelectMenuOptionBuilder,
} = require("discord.js");

module.exports = async (client, interaction) => {
    if (!interaction.isButton()) return;

    if (interaction.customId === "fecharTicket") {
        let tipo = "";

        suporte = interaction.channel.name.split("-");

        if (suporte[0] === "duvidas") {
            tipo = "Dúvidas";
        } else if (suporte[0] === "financeiro") {
            tipo = "Problemas financeiros";
        }

        const arquivo = await createTranscript(interaction.channel, {
            limit: -1,
            returnBuffer: false,
            filename: `${interaction.channel.name}.html`,
        });

        const discordTranscripts = require("discord-html-transcripts");
        const channel = interaction.message.channel;
        const attachment = await discordTranscripts.createTranscript(channel);

        const arquivos = client.channels.cache.get(ticketArquivos);
        const mensagem = await arquivos.send({ files: [attachment] });

        cname = interaction.channel.name.split("-");

        const name = cname[1];
        const user = interaction.guild.members.cache.find(
            (u) => u.user.username === name
        );
        const name2 = interaction.user.username;
        const staff = interaction.guild.members.cache.find(
            (u) => u.user.username === name2
        );

        if (user === undefined) {
            const user = name;
        }

        const ticketLog = new EmbedBuilder()
            .setTitle(":newspaper: **Ticket - Logs**")
            .addFields(
                { name: "Criador do ticket", value: `${user}`, inline: true },
                {
                    name: "Quem fechou o ticket",
                    value: `${staff}`,
                    inline: true,
                },
                { name: "Tipo do ticket", value: `${tipo}`, inline: true }
            )
            .setThumbnail(
                interaction.user.displayAvatarURL({ dynamic: true, size: 1024 })
            )
            .setTimestamp()
            .setColor("#99FF00")
            .setFooter({
                text: "© 2024 PentaMC • Todos os direitos reservados.",
            });

        const link = new ButtonBuilder()
            .setLabel("Ticket Logs")
            .setURL(
                `https://mahto.id/chat-exporter?url=${
                    mensagem.attachments.first()?.url
                }`
            )
            .setStyle(ButtonStyle.Link)
            .setEmoji("📝");

        const row = new ActionRowBuilder().addComponents(link);

        const clogs = client.channels.cache.get(ticketLogs);
        clogs.send({
            embeds: [ticketLog],
            attachments: attachment,
            components: [row],
        });
        interaction.channel.delete();
    }
};
