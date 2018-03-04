<template lang="pug">
  .Tweets
    .columns.is-centered
      .column.is-three-quarters.is-mobile
        div.Tweets__vertical-scroll
          span(v-for="id in getAllTweetIds")
            tweet(:id="id", :key="id")
            hr
        article.Tweets__comment.media
          .media-content
            .field: p.control: textarea.textarea(placeholder="Add a comment", :maxlength="maxCommentLength", v-model="comment")
            .field: p.control
              span.is-secondary ({{ch}}/{{maxCommentLength}})
              button.button.is-info.is-pulled-right(@click="postTweet(comment)") Post Comment
</template>

<script>
  import {mapGetters, mapActions} from 'vuex';
  import Tweet from './Tweet';

  export default {
    name: 'tweets',
    components: {
      Tweet,
    },
    data() {
      return {
        maxCommentLength: 200,
        comment: '',
      };
    },
    computed: {
      ch() {
        return this.comment.length;
      },
      ...mapGetters(['getAllTweetIds', 'hasError']),
    },
    methods: {
      ...mapActions(['postTweet']),
    },
  };
</script>

<style lang="scss">
  .Tweets{
    padding-top: 2rem;

    &__vertical-scroll {
      max-height: 25rem;
      overflow-y: scroll;
    }
    &__comment {
      padding-top: 4rem;
    }
  }
</style>
