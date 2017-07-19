var Bot = require('slackbots');

// Internal modules
var botTools = require('./lib/bot_tools.js');
var fplTools = require('./lib/fpl_tools.js');

// Settings
var settings = { token: process.env.FOOTBOT_SLACK_API_TOKEN };
var leagueId = process.env.FOOTBOT_LEAGUE_ID;

// Bot setup
var bot = new Bot(settings);
var params = { as_user: true };

// Bot action
bot.on('start', function() {
  bot.postMessageToChannel('test',
                           'BACK OF THE NET! :soccer: Footbot is up and running for league ' + leagueId,
                           params);
  bot.postMessageToChannel('test',
                           'Did you see that ludicrous display last night?',
                           params);
});

bot.on('message', function(message) {
  if (botTools.notMyMessage(bot.self.id, message)) {

    // Check if it's a request for league table data
    if (botTools.isLeagueRequest(message)) {
      // Confirm league ID is valid before checking
      if (botTools.validLeague(leagueId)) {
        fplTools.getLeagueData(leagueId, postMultipleLines);
      } else {
        bot.postMessageToChannel('test',
                                ("'" + leagueId + "' is not a valid league ID"),
                                params);
      }
    // Check if it's an IT Crowd reference
    } else if (botTools.isItCrowdJoke(message)) {
      bot.postMessageToChannel('test',
                               'The thing about Arsenal is they always try to walk it in',
                               params);
    }
  }
});

function postMultipleLines(data) {
  var message = data.join("\n");
  bot.postMessageToChannel('test',
                           message,
                           params);
}