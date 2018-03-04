<template lang="pug">
  .Login.columns.is-centered: .column.is-half
    .card
      .card-content
        .title Your nickname please
        .field: .control.has-icons-left
          input.input.is-large(type="text" placeholder="Nickname" pattern="[A-Za-z0-9]{4,}", v-model="nickname", :required="true", @keyup.enter="onLogin")
          span.icon.is-medium.is-left: i.fa.fa-user
        .message.has-text-danger {{error}}
      footer.card-footer
        a.card-footer-item(@click="onLogin") Login
</template>

<script>
  import {mapMutations} from 'vuex';

  export default {
    name: 'login',
    data() {
      return {
        error: '',
        nickname: '',
      };
    },
    methods: {
      onLogin() {
        setTimeout(() => {
          // check for valid nickname, if correct then login and show all tweets
          this.error = '';
          if (this.nickname.length >= 4) {
            this.addNickname(this.nickname);
            this.$router.push('tweets');
          } else {
            this.error = 'Please enter a valid nickname with 4 or more characters';
          }
        }, 0);
      },
      ...mapMutations(['addNickname']),
    },
  };
</script>

<style lang="scss">
  .Login {
    padding-top: 10rem;
  }
</style>
