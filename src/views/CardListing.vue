<template>
<div>
  <app-filters></app-filters>
  <b-container fluid class="card-listing">

    <div class="users-random" v-if="users.length">
      <b-row>
        <b-col sm="12" md="6" lg="4" xl="4"
               v-for="user in paginate()"
               :key="user.email"
               class="task-col">
          <b-card variant="outline-success"
                  :footer="$t('card.contact') +' '+ user.name.first +' '+ user.name.last"
                  footer-tag="footer"
                  footer-bg-variant="success"
                  footer-border-variant="dark"
                  footer-class="text-white text-center">

            <b-media>
              <b-img slot="aside" rounded="circle" :src="user.picture.large" width="77" />
              <a @click.prevent="openUserModal(user)" v-b-modal.modalUser>
                <h5 class="mt-0 text-success">{{ user.name.first +' '+ user.name.last }}</h5>
              </a>
              <p><i class="fa fa-address-card"></i> {{ user.location.street }}</p>
              <p><i class="fa fa-map-marker"></i> {{ user.location.postcode +' '+ user.location.city +' '+ user.location.state }}</p>
            </b-media>
          </b-card>
        </b-col>
      </b-row>

      <b-row align-h="end">
        <b-col cols="6" align-self="end">
          <b-pagination size="md"
                        :total-rows="resultCount"
                        v-model="currentPage"
                        :per-page="itemsPerPage"
                        :limit="limit"
                        :prev-text="$t('paginate.prev')"
                        :next-text="$t('paginate.next')"
                        :hide-goto-end-buttons="hide"
                        align="right"
                        @input="setPage">
          </b-pagination>
          <!-- <paginate v-if="pageCount"
                    :page-count="pageCount"
                    :clickHandler="paginateUsers"
                    :container-class="'pagination'"
                    :page-class="'page-item'"
                    :page-link-class="'page-link'"
                    :prev-class="'page-item'"
                    :prev-link-class="'page-link'"
                    :next-class="'page-item'"
                    :next-link-class="'page-link'">
          </paginate>
          <div v-else>
            {{ $t('loading.loading') }}
          </div> -->
        </b-col>
      </b-row>
    </div>

    <user-modal></user-modal>
  </b-container>
</div>
</template>

<script>
import Vue from 'vue'
import * as _ from 'lodash'
import AppFilters from '@/components/employeer/Filters'
import config from '@/config'

export default {
  name: 'card-listing-view',
  // props: ['currentPage', 'itemsPerPage', 'resultCount'],
  components: {
    AppFilters
  },
  data() {
    return {
      limit: 10,
      hide: true,
      itemsPerPage: config.itemsPerPage,
      currentPage: 1
    }
  },
  computed: {
    users() {
      return this.$store.getters.users
    },
    resultCount() {
      return _.size(this.$store.getters.users)
    },
    filtered() {
      return this.$store.getters.isFiltered
    },
    filters() {
      return this.$store.getters.filters
    },
    totalPages: function() {
      return Math.ceil(this.resultCount / this.itemsPerPage)
    }
  },
  methods: {
    // slice random users for render as user-card
    paginate: function() {
      if (this.currentPage >= this.totalPages) {
        this.currentPage = this.totalPages
      }
      return _.slice(this.users, (this.itemsPerPage * (this.currentPage - 1)), (this.currentPage * this.itemsPerPage))
    },
    // paginator page count depend on name filter one page otherwise 10 pages
    setPage: function(pageNumber) {
      this.currentPage = pageNumber
      this.filters.page = pageNumber
    },
    // once click on user name setUserDetial to store
    openUserModal(u) {
      this.$store.dispatch('setUserDetail', {
        username: u.login.username,
        picture: u.picture.large,
        gender: u.gender,
        name: _.toUpper(u.name.title) +'. '+ _.upperFirst(u.name.first) +' '+ _.upperFirst(u.name.last),
        location: _.capitalize(u.location.street),
        email: u.email,
        registered: u.registered,
        dob: u.dob
      })
    }
  },
  // clear users from store before destory
  beforeDestroy() {
    this.$store.dispatch('clearUsers')
  },
  // retrives random users from api before create view
  created() {
    this.$store.dispatch('getRandomUsers', this.filters)
  }
}
</script>

<style lang="sass">
  h1, h2
    font-weight: normal

  ul
    list-style-type: none
    padding: 0

  li
    display: inline-block
    margin: 0 10px

  .task-col
    padding-top: 15px
    padding-bottom: 15px

  .card-body
    background-color: #f6f6f6
    padding: .7rem
    p
      margin-bottom: 0
      font-size: 13px
    a
      cursor: pointer

  .pagination
    float: right
    li
      margin: 0
    .page-link
      color: #509A0D

  .page-item.active .page-link
    background-color: #509A0D
    border-color: #509A0D
</style>
