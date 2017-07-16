// Bot tools

// Make sure the message is a message (really)
function isMessage(message) {
  return (message.type === 'message');
}

// Make sure the message isn't from the bot itself
function notMyMessage(botId, message) {
  if (isMessage(message)) {
    return (message.user !== botId);
  }
}

// Different types of messages
function isLeagueRequest(message) {
  return (/post league/).test(message['text']);
}

function isItCrowdJoke(message) {
  return (/what was wenger thinking/i).test(message['text']);
}

module.exports = {
  notMyMessage: notMyMessage,
  isLeagueRequest: isLeagueRequest,
  isItCrowdJoke: isItCrowdJoke
};