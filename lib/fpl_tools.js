// FPL tools
var request = require('request');

function getPlayerName(playerData, playerId) {
  var playerJson = JSON.parse(playerData)[playerId];
  var playerName = playerJson['first_name'] + ' ' + playerJson['second_name'];
  console.log(playerName);
}

function getPlayerData(playerId) {
  request('https://fantasy.premierleague.com/drf/elements/', function (error, response, body) {
    if (error) {
      return console.error('An error occurred', error);
    }
    getPlayerName(body, playerId);
  });
}

module.exports = {
  getPlayerName: getPlayerName,
  getPlayerData: getPlayerData
};