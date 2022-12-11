import { SlashCommandBuilder } from "@discordjs/builders";
import { REST } from "@discordjs/rest";

import { Routes } from "discord-api-types/v9";
import {
	Awaitable,
	Client,
	CommandInteraction,
	EmbedBuilder,
	GatewayIntentBits,
	Partials,
	TextChannel,
} from "discord.js";
import path from "path";
import fs from 'fs'
import config from './config.json';

const rest = new REST({ version: "9" }).setToken(config.token);

const client = new Client({
	partials: [Partials.Channel],
	intents: [
		/*Intents.FLAGS.DIRECT_MESSAGES, Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_VOICE_STATES */
		GatewayIntentBits.DirectMessages,
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.GuildVoiceStates,
		GatewayIntentBits.MessageContent,
	],
});

const commands: {
	command: SlashCommandBuilder;
	onExecute: (options: CommandInteraction) => Awaitable<void>;
}[] = [];

const root = path.join(__dirname, "..");
const command_path = path.join(__dirname, "commands");

const ready_promises: Promise<void>[] = [];

ready_promises.push(
	new Promise((resolve, reject) => {
		fs.readdir(command_path, async (err, files) => {
			if (err) return reject(err);

			const command_files = files.filter(
				(file) => file.endsWith(".ts") || file.endsWith(".js")
			);

			for (const file of command_files) {
				const module = await import(path.join(command_path, file));
				commands.push(module);
			}

			resolve();
		});
	})
);


client.on("ready", async () => {
	console.log("Bot Ready");

	try {
		console.log("Started refreshing application (/) commands.");

		await rest.put(Routes.applicationCommands(client.user!.id), {
			body: commands.map((v) => v.command),
		});

		console.log("Successfully reloaded application (/) commands.");
	} catch (error) {
		console.error(error);
		console.dir(error);
	}
});

client.on("interactionCreate", async (interaction) => {
	if (interaction.isCommand())
		return commands
			.find((v) => v.command.name === interaction.commandName)
			?.onExecute(interaction);
});

Promise.all(ready_promises).then(client.login.bind(client, config.token));
