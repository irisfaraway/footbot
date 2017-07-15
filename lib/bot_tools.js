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

// Player request bits
function isPlayerRequest(message) {
  return (/player id [0-9]+/).test(message['text']);
}

function getPlayerId(message) {
  return Number(message['text'].split('player id ')[1]);
}

module.exports = {
  notMyMessage: notMyMessage,
  isPlayerRequest: isPlayerRequest,
  getPlayerId: getPlayerId
};