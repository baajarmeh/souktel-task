<template>
  <b-navbar toggleable="md">
    <b-nav-toggle target="nav_collapse"></b-nav-toggle>

    <b-navbar-brand>
      <img src="static/logo.png">
    </b-navbar-brand>

    <b-collapse is-nav id="nav_collapse">
      <b-nav is-nav-bar class="ml-auto">

        <b-nav-item href="#" active>{{ $t("titles.employeer") }}</b-nav-item>
        <b-nav-item href="#">{{ $t("titles.jobs") }}</b-nav-item>
        <b-nav-item href="#">{{ $t("titles.profile") }}</b-nav-item>
        <b-nav-item href="#">{{ $t("titles.logout") }}</b-nav-item>
      </b-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
  export default {
    name: 'app-navbar'
  }
</script>

<style lang="sass">
.navbar-brand
  margin-left: 1.5rem
.navbar
  padding: 0 1rem
  height: 52px
  a.nav-link
    color: #686868
    display: inline-block
    padding: 14px 15px
    &.active
      color: #ffffff !important
      background-color: #4a4a4a

.navbar
  background-color: #dededc !important

a.navbar-brand
  img
    height: 40px
    vertical-align: baseline

.navbar-task
  background-color: #D6D6D4
</style>
