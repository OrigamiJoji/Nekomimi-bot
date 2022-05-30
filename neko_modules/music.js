const Discord = require("discord.js");
const ytdl = require("ytdl-core-discord");
const yts = require("yt-search");
const config = require("../config.json");

var currentSong = null;
var queue = [];

function runCommand(message) {
  if (message.content.startsWith("!play") || message.content.startsWith("!p")) {
    enqueueSong(message);
    return;
  }

  if (
    message.content.startsWith("!queue") ||
    message.content.startsWith("!q")
  ) {
    displayQueue(message);
    return;
  }

  if (
    message.content.startsWith("!nowplaying") ||
    message.content.startsWith("!np")
  ) {
    showCurrentSong(message);
  }
}

async function enqueueSong(message) {
  let query = message.content.trim().split(" ");
  query.shift();
  const search = (await yts(query.join())).videos.slice(0, 1);
  console.log(search);
  addSongToQueue(search[0], message);
  // Send embed.
  const { title, description, views, duration, url, thumbnail } = search[0];
  const newEmbed = new Discord.MessageEmbed()
    .setTitle("Added a song!")
    .addField("Title", "[" + title + "]" + "(" + url + ")")
    //.addField("Description", description)
    .addField("Duration", duration.timestamp, true)
    .addField("Views", views.toLocaleString(), true)
    .addField("Requested by", message.author.toString(), true)
    .setThumbnail(thumbnail)
    .setColor([230, 213, 202]);
  message.channel.send({ embeds: [newEmbed] });

  if (currentSong == null) {
    playNextSong(message);
  }

  message.delete();
}

function playNextSong(message) {
  currentSong = queue.shift();
  console.log("NOW PLAYING");
  console.log(currentSong);
  const { title, url, thumbnail } = currentSong;
  if (message != undefined) {
    let newEmbed = new Discord.MessageEmbed()
      .setTitle("Now Playing")
      .setThumbnail(thumbnail)
      .setColor([230, 213, 202])
      .setDescription("[" + title + "]" + "(" + url + ")");
    message.channel.send({ embeds: [newEmbed] });
  }
}

function showCurrentSong(message) {
  const newEmbed = new Discord.MessageEmbed().setColor([230, 213, 202]);
  if (currentSong == null) {
    newEmbed.setTitle("No song is currently playing");
  } else {
    const { title, description, views, duration, url, thumbnail, requester } = currentSong;
    newEmbed
      .setTitle("Currently Playing")
      .addField("Title", "[" + title + "]" + "(" + url + ")")
      .addField("Description", description)
      .addField("Duration", duration, true)
      .addField("Views", views.toLocaleString(), true)
      .addField("Requested by", requester, true)
      .setThumbnail(thumbnail);
  }

  message.channel.send({ embeds: [newEmbed] });
}

function addSongToQueue(search, message) {
  const newSong = {
    title: search.title,
    description: search.description,
    views: search.views,
    duration: search.duration.timestamp,
    url: search.url,
    thumbnail: search.thumbnail,
    requester: message.author.tag,
  };
  console.log("PUSHING");
  console.log(newSong);
  queue.push(newSong);
}

function displayQueue(message) {
  let newEmbed = new Discord.MessageEmbed()
    .setTitle("Current Tracklist")
    .setColor([230, 213, 202]);
  let pos = 1;
  queue.forEach((e) => {
    newEmbed.addField(
      "#" + pos + " (Requested by " + e.requester + ")",
      "[" + e.title + "]" + "(" + e.url + ")"
    );
    if (pos == 25) return;
    pos += 1;
  });
  message.channel.send({ embeds: [newEmbed] });
}

module.exports = { runCommand };
