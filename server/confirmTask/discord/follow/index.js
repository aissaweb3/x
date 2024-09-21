const { Client, GatewayIntentBits } = require("discord.js");

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers],
});

let isReady = false;

/**
 * Checks if a user exists in the guild.
 * @param {string} channelId - The ID of the channel to fetch the guild from.
 * @param {string} userId - The ID of the user to check for.
 * @returns {Promise<boolean>} - Returns true if the user exists, false otherwise.
 */
async function verify(channelId, userId) {
  if (!isReady) {
    throw new Error(
      "Bot is not ready. Please wait until the bot has logged in."
    );
  }

  try {
    const channel = await client.channels.fetch(channelId);
    const guild = channel.guild;

    const member = await guild.members.fetch(userId).catch(() => null);
    console.log({ member });
    return member !== null;
  } catch (error) {
    console.error("Error:", error);
    return false;
  }
}

client.once("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
  isReady = true;
});

module.exports = { verify, client };

const ENV = require("../../../../getENV")
client.login(ENV.DISCORD_BOT_TOKEN);
