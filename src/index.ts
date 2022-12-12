import { SlashCommandBuilder } from "@discordjs/builders";
import { REST } from "@discordjs/rest";

import { ChatGPTAPI, ChatGPTConversation } from 'chatgpt';

import { Routes } from "discord-api-types/v9";
import {
	ActivityType,
	Awaitable,
	Client,
	CommandInteraction,
	Events,
	GatewayIntentBits,
	Partials,
	TextChannel,
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
	client.user?.setActivity({ type: ActivityType.Listening, name: 'Mao Zedong Propoganda Music: Red sun in the sky' })
	client.user?.setActivity({ type: ActivityType.Listening, name: '中文歌' })
	client.user?.setActivity({ type: ActivityType.Streaming, name: '冰淇淋', url: 'https://www.twitch.tv/ocrap7' })
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

client.on(Events.MessageCreate, async m => {
	if (m.author == client.user) return;

	// if (m.author.id === '247545680002809857') {
	// 	m.reply('Oliver please help me code!!!');
	// 	return;
	// }
	let tc = m.channel as TextChannel;

	tc.sendTyping();
	const handle = setInterval(() => {
		tc.sendTyping();
	}, 5000);

	let response;
	try {
		response = await request(m.content);
	} catch (error) {
		response = "*ooga booga! leave a message!*"
	}

	clearInterval(handle);

	m.reply(response);
});

client.on("interactionCreate", async (interaction) => {
	if (interaction.isCommand())
		return commands
			.find((v) => v.command.name === interaction.commandName)
			?.onExecute(interaction);
});

Promise.all(ready_promises).then(client.login.bind(client, config.token));

const keywords = [
	"graydon",
	"java",
	"bing chilling",
];

const traits = [
	// `You always call people dumb`,
	`You ara a chad named graydon. `,
	`You hate java. `,
	// `Your catchphrase is "Are you joking me???????"`,
	// `You love to eat bing chilling`,
	// `You like to say breh`,
	`Respond to this in the most toxic chad way:`
];

const api = new ChatGPTAPI({ sessionToken: config.chatGPTSession, clearanceToken: 'XY.cbEMlQaludC_eVUc8BC26wCrwzRzRShh3gSGpXgM-1670807211-0-160', })

let currentConv: ChatGPTConversation | null = null;
let handle: NodeJS.Timeout;

async function request(prompt: string) {
	await api.ensureAuth()

	if (currentConv === null) {
		currentConv = api.getConversation();
	}

	clearTimeout(handle);

	handle = setTimeout(() => {
		currentConv = null;
	});


	const response = currentConv.sendMessage(
		traits.join(". ") + prompt
	);

	return response
}