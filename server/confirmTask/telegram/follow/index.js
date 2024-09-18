
const { Client, GatewayIntentBits } = require('discord.js');

// Initialize the Discord client with the necessary intents
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const token = 'YOUR_BOT_TOKEN_HERE';
const guildId = 'YOUR_GUILD_ID_HERE';

// The user ID you want to check
const userIdToCheck = 'USER_ID_HERE';

client.once('ready', async () => {
  console.log(`Logged in as ${client.user.tag}`);

  try {
    // Fetch the guild
    const guild = await client.guilds.fetch(guildId);

    // Fetch the member list
    const member = await guild.members.fetch(userIdToCheck);

    if (member) {
      console.log(`User with ID ${userIdToCheck} is in the server.`);
    }
  } catch (error) {
    if (error.message.includes('Unknown Member')) {
      console.log(`User with ID ${userIdToCheck} is not in the server.`);
    } else {
      console.error('An error occurred:', error);
    }
  }
});

client.login(token);









const verify = async (telegramId) => {
    
}


module.exports = verify;