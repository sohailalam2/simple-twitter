/* eslint-disable no-param-reassign,no-shadow */
import axios from 'axios';
import Vue from 'vue';
import Vuex from 'vuex';
import {loadProgressBar} from 'axios-progress-bar';

const debug = process.env.NODE_ENV !== 'production';

const BASE_URL = debug
  ? 'http://localhost:9090'
  : `${window.location.protocol}//${window.location.hostname}:9090`;

Vue.use(Vuex);
axios.defaults.baseURL = BASE_URL;
loadProgressBar();

// initial state
const state = {
  BASE_URL,
  error: null,
  nickname: null,
  tweets: [],
};

// getters
const getters = {
  getNickname: state => state.nickname,
  getAllTweetIds: state => state.tweets.map(t => t.id),
  getTweetById: state => id => state.tweets.find(tweet => tweet.id === id),
  hasError: state => state.error,
};

// actions
const actions = {
  // Get all tweets from the server and then commit them into the store
  getAllTweets({commit}) {
    axios.get('/tweets')
      .then(res => commit('addTweets', res.data))
      .catch(err => commit('addError', err));
  },
  // Create a new post by sending a POST request to the server.
  // We are ignoring the result of this API because the server also
  // sends a Server Sent Event with the same data and using which we will process the data
  // and update the newly created post into the store
  postTweet({state, commit}, comment) {
    axios.post('/tweets', {comment, nickname: state.nickname})
    // .then(res => commit('addTweets', res.data))
      .catch(err => commit('addError', err));
  },
  // Create a new reply to a given post by sending a POST request to the server.
  // We are ignoring the result of this API because the server also
  // sends a Server Sent Event with the same data and using which we will process the data
  // and update the newly created post reply into the store
  postTweetReply({commit}, {id, comment}) {
    axios.post(`/tweets/${id}/replies`, {comment, nickname: state.nickname})
    // .then(res => commit('addTweetReply', res.data))
      .catch(err => commit('addError', err));
  },
  // Increment the likes of a given post by sending a PUT request to the server.
  // We are ignoring the result of this API because the server also
  // sends a Server Sent Event with the same data and using which we will process the data
  // and update the likes into the store
  incrementTweetLike({commit}, id) {
    axios.put(`/tweets/${id}/likes`)
    // .then(() => commit('incrementTweetLike', id))
      .catch(err => commit('addError', err));
  },
};

// mutations
const mutations = {
  addNickname(state, nickname) {
    state.nickname = nickname;
  },
  addError(state, error) {
    state.error = error;
  },
  // This will mutate the state and the tweets
  addTweets(state, tweets) {
    if (Array.isArray(tweets)) {
      state.tweets = [...state.tweets, ...tweets];
    } else {
      state.tweets = [...state.tweets, tweets];
    }
  },
  // This will mutate the state and add replies to a given tweet,
  // provided that the tweet exists in the store
  addTweetReply(state, tweet) {
    const foundTweet = state.tweets.find(t => t.id === tweet.id);

    if (foundTweet) {
      Vue.set(foundTweet, 'replies', tweet.replies);
    }
  },
  // This will mutate the state and increment the like of a given tweet by one,
  // provided that the tweet exists in the store
  incrementTweetLike(state, tweetId) {
    const foundTweet = state.tweets.find(t => t.id === tweetId);

    if (foundTweet) {
      foundTweet.likes += 1;
    }
  },
};

export default new Vuex.Store({
  strict: debug,
  state,
  getters,
  actions,
  mutations,
});
