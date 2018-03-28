const Bot = require('./src/Bot');

const local = require('./local');

exports.tiikioBot = (req, res) => {
  const bot = new Bot(local);
  const message = req.body.message;

  const callToken = req.path;

  if ( callToken !== localconf.tokens.webhook ) {
    bot.reply(message);
  } else {
    res.sendStatus(403);
  }
};
