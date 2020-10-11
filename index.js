const Discord = require('discord.js');
const client = new Discord.Client();
const token = process.env.DISCORD_BOT_SECRET;
const fs = require('fs');
const keep_alive = require('./keep_alive.js');

client.on('ready', () => {
  console.log("I'm in");
  console.log(client.user.username);
});

client.on('message', msg => {
  //args
  prefix = ">";

  const args = msg.content.slice(prefix.length).split(' ');
  const command = args.shift().toLowerCase();
  if(msg.content.startsWith(prefix + "help")) {
    msg.channel.send("AAHAHHAAH");
  }

  //Verification
  if(msg.content.startsWith(">verify")) {
    //msg.author.id
    //Adding I want cereal, and removing Unverified:
    msg.member.roles.add(['762996023169646603']);
    msg.member.roles.remove('763007931532312586');

    const VerifyEmbed = new Discord.MessageEmbed()
      .setColor('#0099ff')
      .setTitle('<!-- Verifiction -->')
      .setDescription("You now have the `I Want Cereal` role!")
      .setTimestamp()
      .setFooter('Cereal Bot Alpha v0.2 - /r/secretcerealsociety');
  
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
    const ChangesEmbed = new Discord.MessageEmbed()
      .setColor('#0099ff')
      .setTitle('<!-- Cereal Bot Alpha v0.2 --!>')
      .setDescription("- Added embeds for #info, #rules, and #verification, with new commands:\n- `>VerifyRules` will send the Rules, specifically made for the verification channel (only works for mods+)\n- `>rules` will send the Rules for #rules (only works for mods+)\n- `>info` will send the Information stuff for #info (only works for mods+)")
      .setTimestamp()
      .setFooter('Cereal Bot Alpha v0.2 - /r/secretcerealsociety');
    
    msg.channel.send(ChangesEmbed);
  }

  //Rules for Verification Channel -----------------------------------------------------------------------------------------------------
  if(msg.content.startsWith(prefix + "VerifyRules")) {
    if(msg.member.roles.cache.has('762993755920924672') == true || msg.member.roles.cache.has('762994345829335051') == true) {
      const VerifyRulesEmbed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Rules of The Secret Cereal Society')
        .setDescription("1) **CEREAL FIRST** then milk.\n2) No discrimination/racism/sexism/etc.\n3) You are allowed to joke about **anything** you want, unless it is stated to be prohibited in these rules, or by a staff member.  If the victim(s) do not like the joke, you must STOP immediately.\n4) NO DOXXING anyone without consent.\n5)  Minor NSFW conversation is allowed on this server.  HOWEVER NO PICTURES OR VIDEOS ETC (eg: porn) .  No excessive NFSW conversations (use your brain with this one).\n6) Linking any harmful material will be perm ban (I.e viruses, IP grabbers etc).\n7) Swearing is allowed, check #announcements for banned words (pinned msg).\n8) Each channel has its own purpose.  Please respect these purposes and post/send msgs in the relevant channels.  Also ALL promotion goes in #media, no where else (unless authorization is granted by a staff member).\n9) NO spamming/spam pinging etc.\n**__Discord ToS__  and their __Community Guidelines__ are enforced on this server: **\nhttps://discord.com/terms\nhttps://discord.com/guidelines\n.\n.\n**Please type __'>verify'__ to __accept the rules__ and __gain access__ to the rest of the server!**")
        .setTimestamp()
        .setFooter('Cereal Bot Alpha v0.2 - /r/secretcerealsociety');
      msg.channel.send(VerifyRulesEmbed);
    }
  }

  //Rules Channel ------------------------------------------------------------------------------------------------------------------
  if(msg.content.startsWith(prefix + "rules")) {
    if(msg.member.roles.cache.has('762993755920924672') == true || msg.member.roles.cache.has('762994345829335051') == true) {
      const RulesEmbed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Rules of The Secret Cereal Society')
        .setDescription("1) **CEREAL FIRST** then milk.\n2) No discrimination/racism/sexism/etc.\n3) You are allowed to joke about **anything** you want, unless it is stated to be prohibited in these rules, or by a staff member.  If the victim(s) do not like the joke, you must STOP immediately.\n4) NO DOXXING anyone without consent.\n5)  Minor NSFW conversation is allowed on this server.  HOWEVER NO PICTURES OR VIDEOS ETC (eg: porn) .  No excessive NFSW conversations (use your brain with this one).\n6) Linking any harmful material will be perm ban (I.e viruses, IP grabbers etc).\n7) Swearing is allowed, check #announcements for banned words (pinned msg).\n8) Each channel has its own purpose.  Please respect these purposes and post/send msgs in the relevant channels.  Also ALL promotion goes in #media, no where else (unless authorization is granted by a staff member).\n9) NO spamming/spam pinging etc.\n**__Discord ToS__  and their __Community Guidelines__ are enforced on this server: **\nhttps://discord.com/terms\nhttps://discord.com/guidelines")
        .setTimestamp()
        .setFooter('Cereal Bot 1.0 - /r/secretcerealsociety');
      msg.channel.send(RulesEmbed);
    }
  }
//Info Channel -----------------------------------------------------------------------------------------------------------------------
  if(msg.content.startsWith(prefix + "info")) {
    if(msg.member.roles.cache.has('762993755920924672') == true || msg.member.roles.cache.has('762994345829335051') == true) {
      const InfoEmbed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Information about tSCS:')
        .setDescription('**About the Server:**\nSUBREDDIT: https://www.reddit.com/r/secretcerealsociety/\nThis is the Official Discord Server of /r/secretcerealsociety!\nCEREAL BEFORE MILK.  Discuss everything Cereal here, with other fellow bowl cronching, damp food lovers!\n**Staff**\nCurrent staff members are:\n <@397773303965548544>\n<@543895791706570830>\n<@763066619126743060> (our very own bot)\n\n**Roles**\nMost of the roles here are leveled roles, other than the staff ones and bot ones (and special roles).  See below for more info.')
      
      const RolesEmbed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle('ROLES ROLES ROLES ROOOLLLLESSSSS')
        .setDescription('**Godly Cereal Bowls** - The executives of this server and the subreddit.\n\n**== Staff ==**\nAdmins | Cereal - Admins of the server, they have admin perm.\nMods | Milk Cartons - Mods of the server.  They can Kick, ban, mute, warn, lockdown, lock channels, purge, do announcements and some other stuff.\nHelpers | Spoons - They just help members of the server with shit.\n\n**== Special Roles ==**\nMr. Active Branflake - The most active user on the server (person with most Arcane (bot) XP)\n\n**== Level Roles ==** - All Levels are Arcane (bot).\nI Want Cereal - For new, verified users.\nBowl - Level 5\nCereal Box - Level 10\nAdd the Cereal - Level 15\nMilk Cartons - Level 20\nPour the Milk - Level 25\nSPOOOOOOOOOOOOON - Level 30\nCRONCH CRONCH - Level 35')
        .setTimestamp()
        .setFooter('Cereal Bot 1.0 - /r/secretcerealsociety');
        msg.channel.send(InfoEmbed);
        msg.channel.send(RolesEmbed);
    }
  }  

});
client.login(token);
