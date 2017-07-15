var Bot = require('slackbots');

var botTools = require('./lib/bot_tools.js');
var fplTools = require('./lib/fpl_tools.js');

var settings = {
  token: process.env.FOOTBOT_SLACK_API_TOKEN
};

var bot = new Bot(settings);

var params = {
  as_user: true
};

// Bot doing stuff

bot.on('start', function() {
  bot.postMessageToChannel('test', 'Did you see that ludicrous display last night?', params);
});

bot.on('message', function(message) {
  if (botTools.notMyMessage(bot.self.id, message)) {
    if (botTools.isPlayerRequest(message)) {
      var playerId = botTools.getPlayerId(message);
      fplTools.getPlayerData(playerId);
      bot.postMessageToChannel('TODO: post output');
    } else {
      bot.postMessageToChannel('test', "The thing about Arsenal is they always try to walk it in", params);
    }
  }
});