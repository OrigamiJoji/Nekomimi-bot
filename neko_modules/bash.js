const Discord = require("discord.js");
const config = require("../config.json");
const { exec } = require("child_process");

function runCommand(message) {
  if (message.content.includes(">.<")) {
    return;
  }
  if (message.author.id !== config.master) {
    message.channel.send("You aren't Master!!");
    message.guild.channels
      .fetch(config.interface)
      .then((channel) => {
        channel.send(
          "**" +
            message.author.username +
            "(" +
            message.author +
            ")" +
            " tried to replace Master! **" +
            "```" +
            message.content +
            "```"
        );
      })
      .catch(console.error);
    return;
  }
  if (message.channelId !== config.interface) {
    message.channel.send("C... C-Can we go someplace quieter, Master?");
    return;
  }
  let args = message.content.slice(1);

  exec(args, (error, stdout, stderr) => {
    if (error) {
      message.channel.send("```" + error.message + "```");
      return;
    }
    if (stderr) {
      message.channel.send("```" + stderr + "```");
      return;
    }
    message.channel.send("```" + stdout + "```");
    return;
  });
}

module.exports = { runCommand };
