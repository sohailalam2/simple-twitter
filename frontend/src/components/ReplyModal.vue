<template lang="pug">
  .ReplyModal.modal(:class="{'is-active' : shouldBeActive}")
    .modal-background
    .modal-card
      header.modal-card-head
        p.modal-card-title Reply to Tweet
        button.delete(aria-label="close", @click="onClose")
      section.modal-card-body
        article.media
          .media-content
            .content: p
              strong {{nickname}}
              br
              p  {{comment}}
              br
        article.media
          .media-content
            .field: p.control: textarea.textarea(placeholder="Add a reply", :maxlength="maxLength", v-model="reply")
            .field: p.control
              span.is-secondary ({{ch}}/{{maxLength}})
      footer.modal-card-foot
        button.button.is-success(@click="postTweetReply({id: tweetId, comment: reply}) && onClose()") Reply
        button.button(@click="onClose") Cancel
</template>

<script>
  import {mapActions} from 'vuex';

  export default {
    name: 'reply-modal',
    props: {
      isActive: false,
      tweetId: '',
    },
    data() {
      return {
        shouldBeActive: false,
        reply: '',
        nickname: '',
        comment: '',
      };
    },
    watch: {
      // show the reply modal based on shouldBeActive variable
      isActive() {
        this.shouldBeActive = this.isActive;

        if (this.isActive) {
          const tweet = this.$store.getters.getTweetById(this.tweetId);

          this.nickname = tweet.nickname;
          this.comment = tweet.comment;
        }
      },
    },
    computed: {
      maxLength() {
        return 200;
      },
      ch() {
        return this.reply.length;
      },
    },
    methods: {
      onClose() {
        this.shouldBeActive = false;
        this.$emit('close');
      },
      ...mapActions(['postTweetReply']),
    },
  };
</script>
