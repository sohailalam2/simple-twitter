<template>
  <div id="app">
    <app-header></app-header>
    <app-intro></app-intro>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
  import {mapActions, mapMutations, mapGetters} from 'vuex';
  import AppHeader from './components/AppHeader';
  import AppIntro from './components/AppIntro';

  export default {
    name: 'app',
    components: {
      AppHeader,
      AppIntro,
    },
    methods: {
      ...mapMutations(['addTweets', 'addTweetReply', 'incrementTweetLike']),
      ...mapActions(['getAllTweets']),
    },
    computed: {
      ...mapGetters(['getNickname']),
    },
    mounted() {
      // Check for nickname, if not present then redirect to the login page
      const nickname = this.getNickname;

      if (!nickname || nickname.length === 0) {
        this.$router.push('/');
      }

      // Get all tweets from the server and load them into store
      this.getAllTweets();

      // Subscribe to server sent events, listen to different types of events and take actions
      if ('EventSource' in window) {
        const es = new EventSource(`${this.$store.state.BASE_URL}/tweets/stream`);

        es.addEventListener('tweets', event => this.addTweets(JSON.parse(event.data)));
        es.addEventListener('replies', event => this.addTweetReply(JSON.parse(event.data)));
        es.addEventListener('likes', event => this.incrementTweetLike((JSON.parse(event.data)).id));
      }
    },
  };
</script>

<style lang="scss">
  @import "main";
</style>
