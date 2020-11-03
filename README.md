# CerealBot
Cereal Bot for my discord server.
This bot uses the Discord API to make requests to Discord's Servers and interact with it.
An API - Application Programming Interface - is a type of software that lets external programs interact with your server and services.  
My discord bot can check if a user sends a specific command (using an event listener) and can output a message and do some processes.

<-- Change Logs -->

Version 1.1
- The bot can now send suggestions for you in #suggestions, just do >suggest [suggestion].
- Increased efficiency of the bot (removed useless code).
- Added 'success' message for >suggest.

Version 1.2
- Added GitHub Repo link to the "ChangesEmbed".

Version 2.0 - Release 02/11/2020
- Added Approved/Denial functions for suggestions.
- Fixed bug with "success message" for the >suggest command (no success message, due to typo bug in code). 
  *On line 149, original code was `client.channel.cache.get()`, new code is `client.channels.cache.get()`
