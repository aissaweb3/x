const express = require("express")
const app = express.Router()










const crypto = require('crypto');

app.use(express.urlencoded({ extended: true }));

const BOT_TOKEN = '7325926168:AAGKV38wHOVbFKogqtoXXTXw_u1VInlOU94'; // Place your bot token here

// Helper function to verify Telegram authorization
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

// Route to handle Telegram authorization
app.get('/check_authorization', (req, res) => {
  try {
    const { token, ...telegramQueries } = req.query;
    const authData = checkTelegramAuthorization(telegramQueries);

    console.log('Authorized Telegram Data:', authData);
    console.log('token:', token);
    res.redirect('/login_example');
    
  } catch (error) {
    console.error('Authorization failed:', error.message);
    res.status(400).send(error.message);
  }
});

// Example login page route
app.get('/login_example', (req, res) => {
  const botUsername = 'issatest_thisisatest_bot'; // Replace with your bot's username
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Login Widget Example</title>
      </head>
      <body>
        <center>
          <h1>Hello, anonymous!</h1>
          <script async src="https://telegram.org/js/telegram-widget.js?2" 
            data-telegram-login="${botUsername}" 
            data-size="large" 
            data-auth-url="/check_authorization?token=ikhan">
          </script>
        </center>
      </body>
    </html>
  `);
});







module.exports = app;
