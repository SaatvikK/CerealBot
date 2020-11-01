const Discord = require('discord.js'); //Calls the discord.js (the JavaScript wrapper for the Discord API) dependency.
const client = new Discord.Client(); //Creates a new discord.js client (the bot essentially).
const token = process.env.DISCORD_BOT_SECRET; //Importing the bot's unique token assigned by Discord (not on GitHub).
const fs = require('fs');
const keep_alive = require('./keep_alive.js'); //Webserver to keep the bot running 24/7
const EmbedColor = '#0099ff';
const EmbedFooter = 'Cereal Bot 1.1 - /r/secretcerealsociety';


//Event Listener for when the bot's code is executed, successful start up is confirmed in the Console.
client.on('ready', () => {
  console.log("I'm in");
  console.log(client.user.username);
});


//Event Listener that looks for when a message is sent.  if(msg.content.startsWith) checks if the most recent message in the chat contains the prefix and the command.
client.on('message', msg => {
  //args
  const prefix = ">";

  //Function when there is an error with processing the command.
  function unexpectError(msg) {
    try {
      //Discord Embeds are just a nice way to send/layout a message.
      const ErrorEmbed = new Discord.MessageEmbed()
        .setColor('#ff0033')
        .setTitle('Unexpected Error')
        .setDescription("Sorry, I've encountered an unexpected error!  Please try again.  If the error persists, please contact an Admin.")
        .setTimestamp()
        .setFooter(EmbedFooter);
      msg.channel.send(ErrorEmbed);
    }

    catch(e) {
      msg.channel.send("1. There was an error processing your command, 2. I've encountered ANOTHER ERROR, so I couldn't send the normal Error msg.  Just try your command again, if it doesnt work contact and Admin. ");
    }
  }

  //Splitting the message sent by the user.  We first remove the prefix (">"), then split up each word into a different argument/index.
  const args = msg.content.slice(prefix.length).split(' ');
  const command = args.shift().toLowerCase();
  if(msg.content.startsWith(prefix + "help")) {
    msg.channel.send("AAHAHHAAH");
  }

  //Verification
  if(msg.content.startsWith(">verify")) {

    //Adding "I want cereal" role, and removing "Unverified" role:
    msg.member.roles.add(['762996023169646603']);
    msg.member.roles.remove('763007931532312586');

    const VerifyEmbed = new Discord.MessageEmbed()
      .setColor(EmbedColor)
      .setTitle('<!-- Verifiction -->')
      .setDescription("You now have the `I Want Cereal` role!")
      .setTimestamp()
      .setFooter(EmbedFooter);
  
    //Delete user's message:
    msg.delete({timeout: 500})
      .catch(console.error);
    
    //Delete bots own message:
    msg.channel.send(VerifyEmbed)
      .then(SentMsg => SentMsg.delete({ timeout: 500}))
      .catch(console.error);
  }
  //Changes ---------------------------------------------------------------------------------------------------------------------
  if(msg.content.startsWith(prefix + "changes")) {
    const ChangesEmbed = new Discord.MessageEmbed() //Update Log (all logs from v1.1 onwards can be found on GitHub).
      .setColor(EmbedColor)
      .setTitle('<!-- Cereal Bot v1.1. --!>')
      .setDescription("- The bot can now send suggestions for you in #suggestions, just do `>suggest [suggestion]`!\n- Increased efficiency of the bot (removed useless code).\n- Added 'success' message for `>suggest`.")
      .setTimestamp()
      .setFooter(EmbedFooter + " | | Full Change Log: https://github.com/SaatvikK/CerealBot/blob/main/README.md");
    
    msg.channel.send(ChangesEmbed);
  }

  //Rules for Verification Channel -----------------------------------------------------------------------------------------------------
  if(msg.content.startsWith(prefix + "VerifyRules")) {
    if(msg.member.roles.cache.has('762993755920924672') == true || msg.member.roles.cache.has('762994345829335051') == true) {
      const VerifyRulesEmbed = new Discord.MessageEmbed()
        .setColor(EmbedColor)
        .setTitle('Rules of The Secret Cereal Society')
        .setDescription("1) **CEREAL FIRST** then milk.\n2) No discrimination/racism/sexism/etc.\n3) You are allowed to joke about **anything** you want, unless it is stated to be prohibited in these rules, or by a staff member.  If the victim(s) do not like the joke, you must STOP immediately.\n4) NO DOXXING anyone without consent.\n5)  Minor NSFW conversation is allowed on this server.  HOWEVER NO PICTURES OR VIDEOS ETC (eg: porn) .  No excessive NFSW conversations (use your brain with this one).\n6) Linking any harmful material will be perm ban (I.e viruses, IP grabbers etc).\n7) Swearing is allowed, check #announcements for banned words (pinned msg).\n8) Each channel has its own purpose.  Please respect these purposes and post/send msgs in the relevant channels.  Also ALL promotion goes in #media, no where else (unless authorization is granted by a staff member).\n9) NO spamming/spam pinging etc.\n**__Discord ToS__  and their __Community Guidelines__ are enforced on this server: **\nhttps://discord.com/terms\nhttps://discord.com/guidelines\n.\n.\n**Please type __'>verify'__ to __accept the rules__ and __gain access__ to the rest of the server!**")
        .setTimestamp()
        .setFooter(EmbedFooter);
      msg.channel.send(VerifyRulesEmbed);
    }
  }

  //Rules Channel ------------------------------------------------------------------------------------------------------------------
  if(msg.content.startsWith(prefix + "rules")) {
    if(msg.member.roles.cache.has('762993755920924672') == true || msg.member.roles.cache.has('762994345829335051') == true) {
      const RulesEmbed = new Discord.MessageEmbed()
        .setColor(EmbedColor)
        .setTitle('Rules of The Secret Cereal Society')
        .setDescription("1) **CEREAL FIRST** then milk.\n2) No discrimination/racism/sexism/etc.\n3) You are allowed to joke about **anything** you want, unless it is stated to be prohibited in these rules, or by a staff member.  If the victim(s) do not like the joke, you must STOP immediately.\n4) NO DOXXING anyone without consent.\n5)  Minor NSFW conversation is allowed on this server.  HOWEVER NO PICTURES OR VIDEOS ETC (eg: porn) .  No excessive NFSW conversations (use your brain with this one).\n6) Linking any harmful material will be perm ban (I.e viruses, IP grabbers etc).\n7) Swearing is allowed, check #announcements for banned words (pinned msg).\n8) Each channel has its own purpose.  Please respect these purposes and post/send msgs in the relevant channels.  Also ALL promotion goes in #media, no where else (unless authorization is granted by a staff member).\n9) NO spamming/spam pinging etc.\n**__Discord ToS__  and their __Community Guidelines__ are enforced on this server: **\nhttps://discord.com/terms\nhttps://discord.com/guidelines")
        .setTimestamp()
        .setFooter(EmbedFooter);
      msg.channel.send(RulesEmbed);
    }
  }
//Info Channel -----------------------------------------------------------------------------------------------------------------------
  if(msg.content.startsWith(prefix + "info")) {
    if(msg.member.roles.cache.has('762993755920924672') == true || msg.member.roles.cache.has('762994345829335051') == true) {
      const InfoEmbed = new Discord.MessageEmbed()
        .setColor(EmbedColor)
        .setTitle('Information about tSCS:')
        .setDescription('**About the Server:**\nSUBREDDIT: https://www.reddit.com/r/secretcerealsociety/\nThis is the Official Discord Server of /r/secretcerealsociety!\nCEREAL BEFORE MILK.  Discuss everything Cereal here, with other fellow bowl cronching, damp food lovers!\n**Staff**\nCurrent staff members are:\n <@397773303965548544>\n<@543895791706570830>\n<@763066619126743060> (our very own bot)\n\n**Roles**\nMost of the roles here are leveled roles, other than the staff ones and bot ones (and special roles).  See below for more info.')
      
      const RolesEmbed = new Discord.MessageEmbed()
        .setColor(EmbedColor)
        .setTitle('ROLES ROLES ROLES ROOOLLLLESSSSS')
        .setDescription('**Godly Cereal Bowls** - The executives of this server and the subreddit.\n\n**== Staff ==**\nAdmins | Cereal - Admins of the server, they have admin perm.\nMods | Milk Cartons - Mods of the server.  They can Kick, ban, mute, warn, lockdown, lock channels, purge, do announcements and some other stuff.\nHelpers | Spoons - They just help members of the server with shit.\n\n**== Special Roles ==**\nMr. Active Branflake - The most active user on the server (person with most Arcane (bot) XP)\n\n**== Level Roles ==** - All Levels are Arcane (bot).\nI Want Cereal - For new, verified users.\nBowl - Level 5\nCereal Box - Level 10\nAdd the Cereal - Level 15\nMilk Cartons - Level 20\nPour the Milk - Level 25\nSPOOOOOOOOOOOOON - Level 30\nCRONCH CRONCH - Level 35')
        .setTimestamp()
        .setFooter(EmbedFooter);
        msg.channel.send(InfoEmbed);
        msg.channel.send(RolesEmbed);
    }
  }  

  //Suggestion --------------------------------------------------------------------------------------------------------
  if(msg.content.startsWith(prefix + "suggest")) {
    let MsgToSend = ""; //MsgToSend = the message that should be sent in #suggestions.
    try {
      //If we send the plain msg to #suggestions, the command prompt (">suggest") will also be sent, which isnt nice.
      //Earlier, on lines 41 & 42, we removed the command prompt and inputted it into the array "args".
      for(i = 0; i < args.length; i++) { //We have a for loop to iterate "i" and search the array "args" with Linear Search.
        MsgToSend = MsgToSend + " " + args[i]; //We input every element of "args" to "MsgToSend"
      }

      const User = "<@" + msg.author + ">"; //msg.author = the user who sent the message.
      const SuggestionEmbed = new Discord.MessageEmbed()
        .setColor(EmbedColor)
        .setTitle('Suggestion by ' + msg.member.user.tag)
        .setDescription(MsgToSend)
        .setTimestamp()
        .setFooter(EmbedFooter);
        client.channels.cache.get('769321633797242932').send(SuggestionEmbed);
    }
    catch(e) {
      unexpectError(msg);
    }
    try {
      msg.channel.send("Your suggestion was successfully sent! <#" + client.channel.cache.get('769321633797242932') + ">"); 
    }
    catch(e) {
      unexpectError(msg);
      msg.channel.send("\n\n" + e);
    }
  }




  //Version 2.0 Stuff

  //Setting the bot's status:
  client.user.setActivity("DM 'NewReport' to me to contact the staff!"); 

  //ModMail -------------------------------------------------------------------------------------------
  const ModMailEmbed = new Discord.MessageEmbed()
  .setColor(EmbedColor)
  .setTitle('Mod Mail Help')
  .setDescription('**What is Mod Mail?**\nMod Mail is a way of reporting issues with people or the server to the staff.\nTo use ModMail to send a report to the staff, DM me with line: ">New Report: [Your Report Here]".\nEg: >New Report: Someone broke rule 1 in general!"')
  .setTimestamp()
  .setFooter(EmbedFooter);
  if(msg.content.startsWith(prefix + "modmail")) {
    msg.channel.send(ModMailEmbed);
  }

  if(msg.channel.type === "dm" && msg.author.id != client.user.id) { //Checking if a user Directly Messaged the bot.
    if(msg.content.startsWith(prefix + "report")) {
      let MsgToSend = "";
      for(i = 0; i < args.length; i++) {
        MsgToSend = MsgToSend + " " + args[i];
      }
      msg.channel.send(MsgToSend);
      msg.channel.send(client.channels.cache.get("764424553992290324"));
    }
    else {
      msg.channel.send("If you're trying to send a Mod Mail Report:\n");
      msg.channel.send(ModMailEmbed);
    }
  }
});
client.login(token);
