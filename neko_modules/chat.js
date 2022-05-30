const Discord = require("discord.js");

function buildGreeting(userID, ) {

}

function randomGreeting() {
    let rand = Math.floor(Math.random() * 6 + 1);
    switch (rand) {
      case 1:
        return "Goodmorning" + randomPunctuation();
      case 2:
        return "Ohayou gozaimasu" + randomPunctuation();
      case 3:
        return "\\*blushes\\*";
      default:
        return "Hello" + randomPunctuation();
    }
  }
  
  function randomPunctuation() {
    let rand = Math.floor(Math.random() * 10 + 1);
    switch (rand) {
      case 1:
        return "-nya!";
      case 2:
        return " >.<";
      case 3:
        return " uwu";
      case 4:
        return "!!!";
      case 5:
        return " 💖😍";
      case 6:
        return " 🌸🌸🌸";
      case 7:
        return " mmhm!";
      case 8:
        return "! pero-pero";
      case 9:
        return " יִמַּח שְׁמוֹ וְזִכְרוֹ 🕍";
      default:
        return "";
    }
  }

  module.exports = {randomGreeting}