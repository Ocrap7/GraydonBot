import { ChatGPTAPI, ChatGPTConversation } from "chatgpt";
import {
    ActivityOptions,
    Client,
    Events,
    GatewayIntentBits,
    Message,
    MessageType,
    Partials,
    TextChannel,
} from "discord.js";

export interface ClientConfig {
    name: string;
    activities: ActivityOptions[],
    tokens: {
        discordToken: string;
        chatGPTSession: string;
        clearanceToken: string;
        userAgent: string;
    };
    responseChance: number;
    timeout: number;
    traitNumber: number;
    keywords: KeywordConfig[];
    overrides: { [key: string]: { complete: boolean; chance: number, traits: TraitConfig[] } | undefined };
    defaultTraits: string[];
    weightedtraits: TraitConfig[];
    downtimeMessages: string[]
}

export interface KeywordConfig {
    word: string;
    user?: string;
    traitId?: number,
}

export interface TraitConfig {
    id: number,
    text: string,
    weight: number
}

export class GPTClient {
    discordBot: Client;

    config: ClientConfig;

    currentConversation: ChatGPTConversation | null = null;

    currentIndex: number = 0;

    chatAPI: ChatGPTAPI;

    constructor(config: ClientConfig) {
        console.log('jdfskfklsd')
        this.config = config;

        // const ps = this.pickWeightedMax([this.config.overrides["247545680002809857"]!.traits, this.config.weightedtraits]);
        // console.log(`${ps.reduce((prev, curr) => `${prev}${curr.text} `, "")}${this.config.defaultTraits.join(' ')}`);




        this.discordBot = new Client({
            partials: [Partials.Channel],
            intents: [
                GatewayIntentBits.DirectMessages,
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.GuildVoiceStates,
                GatewayIntentBits.MessageContent,
            ],
        });

        this.discordBot.on(Events.ClientReady, this.ready.bind(this));
        this.discordBot.on(Events.MessageCreate, this.message.bind(this));

        this.discordBot.login(this.config.tokens.discordToken);

        this.chatAPI = new ChatGPTAPI({
            sessionToken: this.config.tokens.chatGPTSession,
            clearanceToken: this.config.tokens.clearanceToken,
            userAgent: this.config.tokens.userAgent,
        });
    }

    async ready() {
        const pickActivity = () => {
            let ind = Math.floor(Math.random() * this.config.activities.length);
            this.discordBot.user?.setActivity(this.config.activities[ind]);

            const time = Math.random() * 4 * 1000 * 60 + 500 * 60
            setTimeout(pickActivity, time)
        }

        pickActivity();
    }

    async message(msg: Message<boolean>) {
        if (msg.author.id == this.discordBot.user?.id) return;

        let tc = msg.channel as TextChannel;

        let rand = Math.random();

        let keywords = [];
        for (const keyword of this.config.keywords) {
            if (msg.content.toLowerCase().includes(keyword.word)) {
                keywords.push(keyword);
            }
        }
        console.log(keywords);

        let trt;

        let gened = this.generateTraits(msg);
        if (gened) {
            trt = `You are a chad named ${this.config.name}. ${gened}`;
        } else {
            if (!(keywords.length > 0 || rand < this.config.responseChance))
                return;

            let ks = keywords.slice(0, this.config.traitNumber);

            console.log(ks);
            let n = ks.reduce((prev, curr) =>
                ('traitId' in curr) ? 1 : 0,
                0);

            let traits = this.pickWeightedMax([this.config.weightedtraits], this.config.traitNumber - n);

            console.log(traits);
            let traitStr = traits.reduce((prev, curr) => `${prev}${curr.text} `, "")
            let kwStr = ks.reduce((prev, curr) => {
                if ('traitId' in curr) {
                    let trait: TraitConfig = this.config.weightedtraits.find(e => e.id === curr.traitId)!;
                    console.log(curr, trait)
                    return `${prev}${trait.text} `
                } else {
                    return prev
                }
            }, "");

            trt = `You are a chad named ${this.config.name}. ${traitStr}${kwStr}${this.config.defaultTraits.join(' ')}`;
        }

        console.log(trt);

        tc.sendTyping();
        const handle = setInterval(() => {
            tc.sendTyping();
        }, 5000);

        let response;
        try {
            response = await this.sendPrompt(msg, `${trt}. ${msg.content}`);
        } catch (error) {
            let rand = Math.floor(Math.random() * this.config.downtimeMessages.length)
            console.log(error)
            response = this.config.downtimeMessages[rand];
        }

        clearInterval(handle);

        try {
            if (msg.type === MessageType.Default) {
                msg.reply(response);
            }
        } catch (error) {
            console.error(error)
        }
    }

    async sendPrompt(msg: Message<boolean>, prompt: string) {
        if (this.currentConversation === null) {
            this.currentConversation = this.chatAPI.getConversation();
        } else if (this.currentIndex + 1 >= this.config.timeout) {
            this.currentConversation = this.chatAPI.getConversation();
        } else {
            this.currentIndex++;
        }

        return await this.currentConversation.sendMessage(prompt);
    }

    generateTraits(msg: Message<boolean>) {
        let overrides = this.config.overrides[msg.author.id];
        console.log(overrides);

        if (overrides?.complete) {
            return overrides.traits.join(". ")
        } else if (overrides?.complete === false) {
            console.log('here')
            const ps = this.pickWeightedMax([this.config.weightedtraits], this.config.traitNumber - overrides?.traits.length);
            console.log('dsfjklsd')

            return `${overrides.traits.reduce((prev, curr) => `${prev}${curr.text} `, "")}${ps.reduce((prev, curr) => `${prev}${curr.text} `, "")}${this.config.defaultTraits.join(' ')}`
        }

        return undefined
    }

    pickWeightedMax(arrays: TraitConfig[][], max: number) {
        let res: { [key: string]: TraitConfig } = {}
        while (Object.values(res).length < max) {
            let picked = this.pickWeighted(arrays);
            if (picked && !(picked.id in res)) {
                res[picked.id] = picked
            }
        }

        return Object.values(res)
    }

    pickWeighted(arrays: TraitConfig[][]) {
        // letlen = arrays.reduce((prev, curr) => prev + curr.length, 0);
        let array = arrays.flat();
        let len = array.length;

        let rand = Math.floor(Math.random() * len)
        for (let i = 0; i < len; i++) {
            if (i >= rand) {
                return array[i];
            }
        }

        return undefined
    }
}
