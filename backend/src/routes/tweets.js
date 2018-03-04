const express = require('express');
const controller = require('./controllers/tweetsController');
const sse = require('../utils/sse');

const router = express.Router();

/**
 * @api {get} /tweets/stream Subscribe to server sent events
 * @apiName ServerSentEvents
 * @apiDescription Server Sent Events are one way communication from server to the client.
 * When a client submits a new post, replies to a post or likes a post,
 * the SSE will stream the relevant data
 * to all connected clients that are subscribed to it.
 *
 * @apiGroup SSR
 */
router.get('/stream', sse.init);

/**
 * @api {get} /tweets Get all tweets
 * @apiName GetTweets
 * @apiGroup Tweets
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *      {
 *        "id" : "5281a130-1f97-11e8-b7af-391fc61adb5c"
 *        "nickname": "Sohail",
 *        "comment": "This is a fake twitter app",
 *        "likes": 0
 *      },
 *      {
 *        "id": "6781a130-1f97-11e8-b7af-391fc61xdb5c"
 *        "nickname": "Sohail",
 *        "comment": "Its built using NodeJS, VueJS, REST APIs and Server Sent Events",
 *        "likes": 100,
 *        "replies": [
 *          {
 *            "id": "4581a130-1f97-11e8-b7af-391ac61adb5c"
 *            "nickname": "Batman",
 *            "comment": "What!! You can do that??"
 *          }
 *        ]
 *      }
 *     ]
 */
router.get('/', controller.getAllTweets);

/**
 * @api {get} /tweets/:id Get Tweet information
 * @apiName GetTweet
 * @apiGroup Tweets
 *
 * @apiParam {Number} id Tweet's unique ID.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *        "id": "5281a130-1f97-11e8-b7af-391fc61adb5c"
 *        "nickname": "Sohail",
 *        "comment": "This is a fake twitter app",
 *        "likes": 0
 *     }
 */
router.get('/:id', controller.getTweetById);

/**
 * @api {post} /tweets Post a new tweet
 * @apiName PostTweet
 * @apiGroup Tweets
 *
 * @apiParamExample {json} Request-Example:
 *     {
 *          "nickname": "Sohail",
 *          "comment": "This is a fake twitter app"
 *      }
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *        "id": "5281a130-1f97-11e8-b7af-391fc61adb5c"
 *        "nickname": "Sohail",
 *        "comment": "This is a fake twitter app",
 *        "likes": 0
 *     }
 */
router.post('/', controller.postTweet);

/**
 * @api {post} /tweets/:id/replies Post a new reply to a given tweet
 * @apiName PostTweetReply
 * @apiGroup Tweets
 *
 * @apiParam {Number} id Tweet's unique ID.
 *
 * @apiParamExample {json} Request-Example:
 *     {
 *       "nickname": "Batman",
 *       "comment": "What!! You can do that??"
 *     }
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *      {
 *        "id": "6781a130-1f97-11e8-b7af-391fc61xdb5c",
 *         "nickname": "Sohail",
 *         "comment": "Its built using NodeJS, VueJS, REST APIs and Server Sent Events",
 *         "likes": 100,
 *         "replies": [
 *           {
 *            "id": "4581a130-1f97-11e8-b7af-391ac61adb5c",
 *             "nickname": "Batman",
 *             "comment": "What!! You can do that??"
 *           }
 *         ]
 *       }
 */
router.post('/:id/replies', controller.postReply);

/**
 * @api {put} /tweets/:id/likes Like a tweet
 * @apiName PutTweetLike
 * @apiGroup Tweets
 *
 * @apiParam {Number} id Tweet's unique ID.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *      {
 *          "nickname": "Sohail",
 *          "comment": "This is a fake twitter app",
 *          "likes": 1
 *      }
 */
router.put('/:id/likes', controller.updateLikes);

module.exports = router;
