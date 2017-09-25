<template>
  <div class="filter-section">
    <b-row>
      <b-col cols="12">
        <h2>{{ $t("filters.find_a_candidate") }}</h2>
      </b-col>
    </b-row>

    <b-row>
      <b-col sm="12" md="6" lg="4">
        <b-form-input v-model="name" :placeholder="$t('filters.name')"></b-form-input>
      </b-col>

      <b-col sm="12" md="6" lg="3">
        <b-form-select v-model="location" :options="locations" class="mb-3" :select="0"></b-form-select>
      </b-col>

      <b-col sm="12" md="6" lg="3">
        <b-form-select v-model="gender" :options="genders" class="mb-3" :select="0"></b-form-select>
      </b-col>

      <b-col sm="12" md="6" lg="2">
        <b-button variant="outline-secondary" @click="filter">{{ $t("filters.find_candidate") }}</b-button>
      </b-col>
    </b-row>
  </div>
</template>

<script>
  import * as _ from 'lodash'
  import config from '@/config'

  export default {
    name: 'app-filters',
    data () {
      return {
        name: '',
        location: '',
        gender: '',
        filters: {
          nat: null,
          gender: null,
          results: config.results,
          page: 1
        },
        locations: [
          { value: null, text: this.$i18n.t('locations.please_select_location'), selected: 'selected' },
          { value: 'au', text: this.$i18n.t('locations.au') },
          { value: 'br', text: this.$i18n.t('locations.br') },
          { value: 'ca', text: this.$i18n.t('locations.ca') },
          { value: 'ch', text: this.$i18n.t('locations.ch') },
          { value: 'dk', text: this.$i18n.t('locations.dk') },
          { value: 'es', text: this.$i18n.t('locations.es') },
          { value: 'fr', text: this.$i18n.t('locations.fr') },
          { value: 'gb', text: this.$i18n.t('locations.gb') },
          { value: 'nl', text: this.$i18n.t('locations.nl') },
          { value: 'us', text: this.$i18n.t('locations.us') }
        ],
        genders: [
          { value: 'any', text: this.$i18n.t('filters.any'), selected: 'selected' },
          { value: 'male', text: this.$i18n.t('filters.male') },
          { value: 'female', text: this.$i18n.t('filters.female') }
        ]
      }
    },
    watch: {
      // once typing name filters users contains your typing otherwise retrives random users
      name(val) {
        if (!_.isEmpty(val)) {
          this.$store.dispatch("filterUsersByName", val)
          this.$store.dispatch('isFiltered', true)
        }
        else {
          this.$store.dispatch('resetUsers')
          this.$store.dispatch('isFiltered', false)
        }
      }
    },
    methods: {
      // filter random users depend on gender or location
      filter() {
        if (!_.isEmpty(this.location)) {
          this.filters.nat = this.location
        }
        if (!_.isEmpty(this.gender) && this.gender !== "any") {
          this.filters.gender = this.gender
        }
        this.$store.dispatch('getRandomUsers', this.filters)
        this.$store.dispatch('setFilters', this.filters)
      }
    }
  }
</script>

<style lang="sass">
.filter-section
  color: #ffffff !important
  background-color: #4a4a4a
  padding: 25px 30px 25px 55px

.col-sm-12
  margin-bottom: 15px
.mb-3.form-control
  margin-bottom: 0 !important
</style>
