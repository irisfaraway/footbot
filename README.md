# footbot

A Slackbot for getting your fantasy football league results.

This is my first Node project, so of course I wanted to build something extremely useful. However, the code is likely to be absolutely disgusting.

## To run the bot

1. Go to https://your-slack-team-name.slack.com/services/new/bot and create a new bot.
2. Copy the API key and save it to your environment variables as `$FOOTBOT_SLACK_API_KEY`
3. Save your FPL league ID to your environment variables as `$FOOTBOT_LEAGUE_ID`
4. Install dependencies with `npm install`
5. Run the bot with `npm start`

To request league table data, include `post table` in your message.