const Discord = require("discord.js");
const config = require("./config.json");

const bashf = require("./neko_modules/bash.js");
const chatf = require("./neko_modules/chat.js");
const adminf = require("./neko_modules/admin.js");
const musicf = require("./neko_modules/music.js");

const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });

client.once("ready", () => {
  console.log("Nekomimi is online-nya!");
  client.user.setActivity(config.activity, { type: config.activityType });
  if (client.user.username != config.botName) {
    client.user.setUsername(config.botName);
  }
});

client.on("messageCreate", (message) => {
  if (message.author.bot) {
    return;
  }
  const args = message.content.toLowerCase();

  if (config.bashModule && args.startsWith(">")) {
    bashf.runCommand(message);
    return;
  }

  if (config.musicModule && args.startsWith("!")) {
    musicf.runCommand(message);
    return;
  }

  if (config.adminModule && args.startsWith("^")) {
    adminf.runCommand(message);
    return;
  }

  if (args.includes("hello kitten")) {
    message.channel.send(chatf.randomGreeting());
  }
});

client.login(config.token);
