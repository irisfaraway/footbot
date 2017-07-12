var Bot = require('slackbots');

var settings = {
  token: process.env.FOOTBOT_SLACK_API_TOKEN
};

var bot = new Bot(settings);

var params = {
  as_user: true
}

// Checks on messages

// Make sure the message is a message (really)
function isMessage(message) {
  return (message.type === 'message');
}

// Make sure the message isn't from the bot itself
function notMyMessage(botId, message) {
  if (isMessage(message)) {
    return (message.user !== botId);
  };
};

// Bot doing stuff

bot.on('start', function() {
  bot.postMessageToChannel('test', 'Did you see that ludicrous display last night?', params);
});

bot.on('message', function(message) {
  if (notMyMessage(bot.self.id, message)) {
    bot.postMessageToChannel('test', "The thing about Arsenal is they always try to walk it in", params);
  }
});
