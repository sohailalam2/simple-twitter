/* eslint-disable no-use-before-define */
const fs = require('fs');
const path = require('path');
const Loki = require('lokijs');

const {validate} = require('./tweetSchema');

const db = new Loki(path.join(__dirname, './data/db.json'), {
  autoload: true,
  autosave: true,
  autosaveInterval: 5000,
});

let tweets = db.getCollection('tweets');

if (tweets === null) {
  tweets = db.addCollection('tweets');

  const tweetsPath = path.join(__dirname, './data/initialTweets.json');
  const defaultTweets = JSON.parse(fs.readFileSync(tweetsPath, 'utf-8'));

  defaultTweets.forEach(async (tweet) => {
    const t = await validate(tweet);

    tweets.insert(t);
  });
}

exports.getAllTweets = () => tweets.find({});

exports.getTweetById = id => tweets.findOne({id});

exports.addTweets = data => tweets.insert(data);

exports.addTweetReply = (id, reply) => {
  const found = tweets.findOne({id});

  if (found) {
    if (!found.replies) found.replies = [];
    found.replies.push(reply);
    return tweets.update(found);
  }

  return null;
};

exports.incrementTweetLike = (id) => {
  const found = tweets.findOne({id});

  if (found) {
    if (!found.likes) found.likes = 0;
    found.likes += 1;
    return tweets.update(found);
  }

  return null;
};
