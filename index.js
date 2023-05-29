const Twitter = require('twitter');
const server = require('http').createServer();
const dotenv = require('dotenv-safe');

dotenv.config();

const consumer_key = process.env.CONSUMER_KEY;
const consumer_secret = process.env.CONSUMER_SECRET;
const bearer_token = process.env.BEARER_TOKEN;

var client = new Twitter({
  consumer_key: consumer_key,
  consumer_secret: consumer_secret,
  bearer_token: bearer_token
});


server.on('request', (req, res) => {
  client.get('search/tweets', {q: '#IPL'}, function(error, tweets, response) { 
    let tweet =  '';
    tweets.statuses.forEach(function(status) {
      tweet =  tweet + "tweet: " + status.text + "\n";
    });
    res.write(tweet);
    res.end();
 });
});

server.listen(8000);
