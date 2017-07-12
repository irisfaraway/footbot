var Bot = require('slackbots');

var settings = {
  token: process.env.FOOTBOT_SLACK_API_TOKEN,
  name: 'footbot'
};

var bot = new Bot(settings);

bot.on('start', function() {
  bot.postMessageToChannel('test', 'Footbot ACTIVATE!');
});
