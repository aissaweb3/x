const express = require("express")
const app = express.Router()










const crypto = require('crypto');
const linkTelegram = require("./linkTelegram");
const ENV = require("../getENV");
const { verify } = require("jsonwebtoken");

app.use(express.urlencoded({ extended: true }));

const BOT_TOKEN = ENV.TELEGRAM_BOT_TOKEN; 


function checkTelegramAuthorization(authData) {
  const checkHash = authData.hash;
  delete authData.hash;

  const dataCheckArr = [];
  for (const key in authData) {
    dataCheckArr.push(`${key}=${authData[key]}`);
  }
  dataCheckArr.sort();
  const dataCheckString = dataCheckArr.join('\n');

  const secretKey = crypto.createHash('sha256').update(BOT_TOKEN).digest();
  const hash = crypto.createHmac('sha256', secretKey).update(dataCheckString).digest('hex');

  if (hash !== checkHash) {
    throw new Error('Data is NOT from Telegram');
  }

  if ((Date.now() / 1000) - parseInt(authData.auth_date) > 86400) {
    throw new Error('Data is outdated');
  }

  return authData;
}


app.get('/check_authorization', async (req, res) => {
  try {
    const { token, ...telegramQueries } = req.query;
    const authData = checkTelegramAuthorization(telegramQueries);

    //console.log('Authorized Telegram Data:', authData);
    //console.log('token:', token);

    const { id, username } = authData;
    try {      
      await linkTelegram(id, username, token)
    } catch (error) {
      console.log(error);
    }

    res.redirect('/user/profile');
    
  } catch (error) {
    console.error('Authorization failed:', error.message);
    res.status(400).send(error.message);
  }
});


app.get('/linkTelegram', (req, res) => {
  const token = req.query.token;
  //if (!token) return res.send("You are not authenticated !")
  //const { id } = verify(token, ENV.JWT_SECRET);
  //if (!id) return res.send("You are not authenticated !")
  const botUsername = ENV.TELEGRAM_BOT_USERNAME; 
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Link Telegram</title>
      </head>
      <body>
        <center>
          <h1>Hello, anonymous!</h1>
          <script async src="https://telegram.org/js/telegram-widget.js?2" 
            data-telegram-login="${botUsername}" 
            data-size="large" 
            data-auth-url="/check_authorization?token=${token}">
          </script>
        </center>
      </body>
    </html>
  `);
});







module.exports = app;
