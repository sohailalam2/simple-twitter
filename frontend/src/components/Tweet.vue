<template lang="pug">
  .Tweet
    article.media
      .media-content
        .content: p
          strong {{tweet.nickname}}
          br
          p  {{tweet.comment}}
          br
          small
            a(v-if="!reply", @click="onLike"): i.fa.fa-thumbs-up &nbsp; ({{tweet.likes}})
            a(v-if="!reply", @click="onReply") &nbsp; &nbsp; Reply
        span(v-if="!!tweet.replies" v-for="reply in tweet.replies")
          tweet.Tweet__replies(:id="id", :reply="reply")
    reply-modal(:isActive="showReplyModal", @close="onReplyClose", :tweetId="id")
</template>

<script>
  import {mapGetters, mapActions} from 'vuex';
  import ReplyModal from './ReplyModal';

  export default {
    name: 'tweet',
    components: {
      ReplyModal,
    },
    props: {
      id: '',
      reply: {},
    },
    data() {
      return {
        showReplyModal: false,
        tweet: {
          nickname: '',
          comment: '',
          likes: 0,
          replies: null,
        },
      };
    },
    mounted() {
      if (this.reply) {
        this.tweet = {...this.reply};
      } else {
        this.tweet = this.getTweetById()(this.id);
      }
    },
    methods: {
      onLike() {
        this.incrementTweetLike(this.id);
      },
      onReply() {
        this.showReplyModal = true;
      },
      onReplyClose() {
        this.showReplyModal = false;
      },
      ...mapGetters(['getTweetById']),
      ...mapActions(['incrementTweetLike', 'incrementTweetReplyLike']),
    },
  };
</script>

<style lang="scss">
  .Tweet {
    &__replies {
      padding-left: 4rem;
    }
  }
</style>
