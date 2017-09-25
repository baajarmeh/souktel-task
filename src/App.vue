<template>
  <div class="wrapper" id="app">
    <app-navbar></app-navbar>

    <b-alert :variant="alertVariant" :dismissible="alertDismissible" :show="showAlert" @dismissed="alertDismissed" @dismiss-count-down="alertDismissCountDown">
      <div v-html="alertMessage"></div>
    </b-alert>

    <router-view></router-view>

    <div v-show="working">
      <loading-overlay :message="working"></loading-overlay>
    </div>

    <app-footer></app-footer>
  </div>
</template>

<script>
import * as _ from 'lodash'
import AppNavbar from '@/components/shared/Navbar'
import AppFooter from '@/components/shared/Footer'

export default {
  name: 'app',
  components: {
    AppNavbar,
    AppFooter
  },
  methods: {
    alertDismissCountDown(val) {
      if (val === 1) {
        this.$store.dispatch('clearAlert')
      }
    },
    alertDismissed() {
      this.$store.dispatch('clearAlert')
    }
  },
  computed: {
    alertDismissible() {
      return this.$store.getters.alertDismissible
    },
    alertMessage() {
      return this.$store.getters.alertMessage
    },
    alertVariant() {
      return this.$store.getters.alertVariant
    },
    showAlert() {
      return this.$store.getters.showAlert
    },
    working() {
      return this.$store.getters.working
    }
  }
}
</script>

<style lang="sass">
.row
  margin-right: 0
  margin-left: 0
.container-fluid
  margin-right: 0
  margin-left: 0

.bg-success
  background-color: #509A0D !important
.text-success
  color: #509A0D !important

.navbar-collapse
  z-index: 100
.ml-auto
  background-color: #dededc
  a.nav-link
    width: 100%
.card-listing
  z-index: 10
</style>
