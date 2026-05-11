import { Client, GatewayIntentBits } from 'discord.js';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();
const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
});

let tags = {};
const tagsFile = './tagStorage.json';

// Load tags if they exist
if (fs.existsSync(tagsFile)) {
  tags = JSON.parse(fs.readFileSync(tagsFile, 'utf8'));
}

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setUsername('yaroslav');
});

// Message handler
client.on('messageCreate', async message => {
  if (message.author.bot) return;

  // TAGS
  if (message.content.startsWith('!t ')) {
    const [cmd, sub, tagname, ...rest] = message.content.split(' ');
    if (sub === 'add' && tagname && rest.length) {
      tags[tagname] = rest.join(' ');
      fs.writeFileSync(tagsFile, JSON.stringify(tags, null, 2));
      message.reply(`Tag "${tagname}" added!`);
    } else if (sub === 'delete' && tagname) {
      delete tags[tagname];
      fs.writeFileSync(tagsFile, JSON.stringify(tags, null, 2));
      message.reply(`Tag "${tagname}" deleted!`);
    } else if (sub === 'raw' && tagname && tags[tagname]) {
      message.reply(tags[tagname]);
    } else {
      message.reply('Tag usage: !t add/delete/raw tagname');
    }
    return;
  }

  // Placeholder for image generation (!image ...)
  if (message.content.startsWith('!image ')) {
    message.reply('Image generation not implemented yet.');
  }

  // Placeholder for video generation (!video ...)
  if (message.content.startsWith('!video ')) {
    message.reply('Video generation not implemented yet.');
  }

  // Scripting (yscript/JavaScript/shell) - add your handlers!
});

client.login(process.env.DISCORD_TOKEN);
