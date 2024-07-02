const Twitter = require('twitter');
const http = require('http');
const dotenv = require('dotenv-safe');

dotenv.config();

const { CONSUMER_KEY, CONSUMER_SECRET, BEARER_TOKEN } = process.env;

const client = new Twitter({
  consumer_key: CONSUMER_KEY,
  consumer_secret: CONSUMER_SECRET,
  bearer_token: BEARER_TOKEN
});

const server = http.createServer((req, res) => {
  client.get('search/tweets', { q: '#IPL' }, (error, tweets, response) => {
    if (error) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Error fetching tweets');
      return;
    }

    const tweetTexts = tweets.statuses.map(status => `tweet: ${status.text}`).join('\n');
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(tweetTexts);
  });
});

server.listen(8000, () => {
  console.log('Server is listening on port 8000');
});
