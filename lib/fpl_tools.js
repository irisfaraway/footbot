// FPL tools
var request = require('request');

function getLeagueData(leagueId, callback) {
  request('https://fantasy.premierleague.com/drf/leagues-classic-standings/' + leagueId, function (error, response, body) {
    if (error) {
      return console.error('An error occurred', error);
    }
    formatLeagueTable(body, callback);
  });
}

function formatLeagueTable(data, callback) {
  var league = JSON.parse(data);
  var header = ('League table for ' + league['league']['name']);
  var teams = league['standings']['results'];
  var new_teams = league['new_entries']['results'];

  var output = [];

  output.push("```");
  output.push(header);
  output.push((Array(57).join('=')));

  // List ranked teams
  for (var i = 0; i < teams.length; i++) {
    var rank = teams[i]['rank'];
    var team = teams[i]['entry_name'];
    var owner = teams[i]['player_name'];
    var points = teams[i]['total'];

    // Work out spacing
    var rankLength = rank.toString().length;
    var pointsLength = points.toString().length;
    var spaceA = Array(4 - rankLength).join(" ");
    var spaceB = Array(50 - (team.length + owner.length + pointsLength)).join(' ');

    // Compose line for output
    var line = (rank + "." + spaceA + team + " (" + owner + ")" + spaceB + points);
    output.push(line);
  }

  // List new and unranked teams
  if (new_teams.length > 0) { output.push("No score yet:"); }
  for (var i = 0; i < new_teams.length; i++) {
    var team = new_teams[i]['entry_name'];
    var owner = new_teams[i]['player_first_name'];
    output.push("- " + team + " (" + owner + ")");
  }

  output.push("```");

  callback(output);
}

module.exports = {
  getLeagueData: getLeagueData
};