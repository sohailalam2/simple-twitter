const sse = require('../../utils/sse');
const db = require('../../utils/db');
const {validate} = require('../../utils/db/tweetSchema');

exports.getAllTweets = (req, res) => res.json(db.getAllTweets());

exports.getTweetById = (req, res) => res.json(db.getTweetById(req.params.id));

exports.postTweet = async (req, res) => {
  const tweets = req.body;

  try {
    const data = await validate(tweets);
    const savedTweet = db.addTweets(data);

    sse.send(savedTweet, 'tweets');
    res.json(savedTweet);
  } catch (e) {
    res.status(400).json({error: e.message});
  }
};

exports.postReply = async (req, res) => {
  const id = req.params.id;
  const replies = req.body;

  try {
    const data = await validate(replies);
    const savedReply = db.addTweetReply(id, data);

    sse.send(savedReply, 'replies');
    res.json(savedReply);
  } catch (e) {
    res.status(400).json({error: e.message});
  }
};

exports.updateLikes = (req, res) => {
  const id = req.params.id;

  if (id) {
    const savedLikes = db.incrementTweetLike(id);

    sse.send(savedLikes, 'likes');
    res.json(savedLikes);
  } else {
    res.status(400).json({error: 'Expecting tweet id'});
  }
};
