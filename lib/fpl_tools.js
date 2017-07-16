// FPL tools
var request = require('request');

function getLeagueData(leagueId) {
  request('https://fantasy.premierleague.com/drf/leagues-classic-standings/' + leagueId, function (error, response, body) {
    if (error) {
      return console.error('An error occurred', error);
    }
    formatLeagueTable(body);
  });
}

function formatLeagueTable(data) {
  var league = JSON.parse(data);
  var header = ('League table for ' + league['league']['name']);
  var teams = league['new_entries']['results'];

  console.log(header);
  // Create header underline with equivalent number of characters
  console.log(Array(header.length + 1).join('='));

  for (var i = 0; i < teams.length; i++) {
    var team = teams[i]['entry_name'];
    var owner = teams[i]['player_first_name'];
    console.log((i + 1) + ". " + team + " (" + owner + ")");
  }
}

module.exports = {
  getLeagueData: getLeagueData
};