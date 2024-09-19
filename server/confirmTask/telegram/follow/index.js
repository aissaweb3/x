const axios = require("axios");
const ENV = require("../../../../getENV");

async function verify(CHANNEL_USERNAME, USER_ID) {
  const url = `https://api.telegram.org/bot${ENV.BOT_TOKEN}/getChatMember`;

  try {
    const response = await axios.post(url, {
      chat_id: CHANNEL_USERNAME,
      user_id: USER_ID,
    });

    const memberStatus = response.data.result.status;

    return (
      memberStatus === "member" ||
      memberStatus === "administrator" ||
      memberStatus === "creator"
    );
  } catch (error) {
    console.error(`Error: ${error}`);
    return false;
  }
}


module.exports = verify;
