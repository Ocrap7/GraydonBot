import { ChatInputCommandInteraction, CommandInteraction, SlashCommandBuilder } from "discord.js";

export const command = new SlashCommandBuilder()
    .setName('stereo')
    .setDescription('Music stereo')


export const onExecute = async (_interaction: CommandInteraction) => {
    if (!_interaction.isChatInputCommand()) return;
    const interaction = _interaction as ChatInputCommandInteraction;

    interaction.deferReply();

    interaction.reply('You have been helped')
}