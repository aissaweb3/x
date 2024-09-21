const express = require("express");
const app = express.Router();

const crypto = require("crypto");
const linkTelegram = require("./linkTelegram");
const ENV = require("../getENV");
const { verify } = require("jsonwebtoken");

const TELEGRAM_BOT_TOKEN = ENV.TELEGRAM_BOT_TOKEN;
const TELEGRAM_BOT_USERNAME = ENV.TELEGRAM_BOT_USERNAME;

function checkTelegramAuthorization(authData) {
  const checkHash = authData.hash;
  delete authData.hash;
  const dataCheckArr = Object.keys(authData).map(
    (key) => `${key}=${authData[key]}`
  );
  dataCheckArr.sort();
  const dataCheckString = dataCheckArr.join("\n");
  const secretKey = crypto
    .createHash("sha256")
    .update(TELEGRAM_BOT_TOKEN)
    .digest();
  const hash = crypto
    .createHmac("sha256", secretKey)
    .update(dataCheckString)
    .digest("hex");

  if (hash !== checkHash) {
    throw new Error("Data is NOT from Telegram");
  }
  if (Date.now() / 1000 - authData.auth_date > 86400) {
    throw new Error("Data is outdated");
  }
  return authData;
}

app.get("/check_authorization", async (req, res) => {
  try {
    const { token, ...telegramQueries } = req.query;
    const authData = checkTelegramAuthorization(telegramQueries);

    const { id, username } = authData;
    try {
      await linkTelegram(id, username, token);
      console.log("telegram linked");
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    return res.status(400).send(error.message);
  }
  res.redirect("/user/profile?refresh=true");
});

app.get("/linkTelegram", (req, res) => {
  const token = req.query.token;
  const html = `
    <style>
      body {padding: 0; margin: 0;background-color: #0c1222;color: white;height: 100vh}
    </style>
    <div style="" >
      <h1>Hello, anonymous!</h1>
      <script async src="https://telegram.org/js/telegram-widget.js?2" 
              data-telegram-login="${TELEGRAM_BOT_USERNAME}" 
              data-size="large" 
              data-auth-url="/check_authorization?token=${token}"></script>
    </div>
  `;

  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Login Widget Example</title>
      </head>
      <body><center>${html}</center></body>
    </html>
  `);
});

function htmlEscape(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

module.exports = app;
