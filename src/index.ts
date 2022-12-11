import { SlashCommandBuilder } from "@discordjs/builders";
import { REST } from "@discordjs/rest";

import { ChatGPTAPI } from 'chatgpt';

import { Routes } from "discord-api-types/v9";
import {
	ActivityType,
	Awaitable,
	Client,
	CommandInteraction,
	Events,
	GatewayIntentBits,
	Partials,
} from "discord.js";
import path from "path";
import fs from 'fs'
import config from './config.json' assert {type: "json"};
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rest = new REST({ version: "10" }).setToken(config.token);

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
	// client.user?.setSta?tus('dnd')
	client.user?.setActivity({type: ActivityType.Listening, name: 'Mao Zedong Propoganda Music: Red sun in the sky'})
	client.user?.setActivity({type: ActivityType.Listening, name: '中文歌'})
	client.user?.setActivity({type: ActivityType.Streaming, name: '冰淇淋', url: 'https://www.twitch.tv/ocrap7'})
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

client.on(Events.MessageCreate, m => {
	if (m.author == client.user) return;

	if (m.author.id === '247545680002809857') {
		m.reply('Oliver please help me code!!!');
		return;
	}

	m.reply('Are you dumb???');
});

client.on("interactionCreate", async (interaction) => {
	if (interaction.isCommand())
		return commands
			.find((v) => v.command.name === interaction.commandName)
			?.onExecute(interaction);
});

Promise.all(ready_promises).then(client.login.bind(client, config.token));


async function example() {
	// sessionToken is required; see below for details
	const api = new ChatGPTAPI({ sessionToken: config.chatGPTSession })

	// ensure the API is properly authenticated
	await api.ensureAuth()

	// send a message and wait for the response
	const response = await api.sendMessage(
		'Write a python version of bubble sort. Do not include example usage.'
	)

	// response is a markdown-formatted string
	console.log(response)
}
example();