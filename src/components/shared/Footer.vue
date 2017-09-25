<template>
    <footer class="footer-task">
      <b-row class="justify-content-md-center padding-space">
        <b-col cols="12" md="auto">{{ $t("footer.powered_by") }} <span>{{ $t("footer.world_learning") }}</span></b-col>
      </b-row>
    </footer>
</template>

<script>
  export default {
    name: 'app-footer'
  }
</script>

<style lang="sass">
  .footer-task
    color: #656565
    background-color: #dededc
    height: 52px
    .padding-space
      padding-top: 15px
    span
      text-transform: uppercase
</style>
