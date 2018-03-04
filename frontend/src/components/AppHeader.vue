<template lang="pug">
  nav.navbar.is-transparent
    .navbar-brand
      a.navbar-item(href="/")
        i.fa.fa-twitter-square.fa-2x &nbsp; Simple Twitter
      .navbar-burger.burger(data-target="navbarMenuBurger", :class="{'is-active': isBurgerActive}", @click="toggleBurger")
        span
        span
        span
    #navbarMenuBurger.navbar-menu(:class="{'is-active': isBurgerActive}")
      .navbar-start
        .navbar-item
          .field.is-grouped
            p.control
              a.bdtw-button.button.is-success(href="https://sohailalam.in/")
                span: i.fa.fa-user-circle
                span.has-text-weight-bold &nbsp; My Website
            p.control
              a.bdtw-button.button.is-link(href="https://github.com/sohailalam2/simple-twitter")
                span: i.fa.fa-github
                span.has-text-weight-bold &nbsp; Source Code
</template>

<script>
  export default {
    name: 'navigation',
    data() {
      return {
        isBurgerActive: false,
      };
    },
    methods: {
      toggleBurger() {
        this.isBurgerActive = !this.isBurgerActive;
      },
    },
  };
</script>
