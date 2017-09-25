<template>
    <b-modal ref="modalUser" id="modalUser" size="lg" v-if="user" :title="userModalTitle" no-close-on-backdrop>
      <div class="container-fluid">
        <b-list-group>
          <b-list-group-item class="text-center">
            <b-img thumbnail rounded="circle" :src="user.picture" />
            <h3>{{ user.username }}</h3>
          </b-list-group-item>

          <b-list-group-item>
            {{ $t('modal.full_name') }}: {{ user.gender }} - {{ user.name }}
          </b-list-group-item>

          <b-list-group-item>
            {{ $t('modal.location') }}: {{ user.location }}
          </b-list-group-item>

          <b-list-group-item>
            {{ $t('modal.email') }}: {{ user.email }}
          </b-list-group-item>

          <b-list-group-item>
            {{ $t('modal.registered') }}: {{ user.registered }}
          </b-list-group-item>

          <b-list-group-item>
            {{ $t('modal.dob') }}: {{ user.dob }}
          </b-list-group-item>
        </b-list-group>
      </div>

      <div slot="modal-footer">
        <div class="btn-group" role="group" aria-label="user actions">
          <b-btn @click="hideUserModal">
            <i class="fa fa-close" aria-hidden="true"></i> {{ $t('button.close') }}
          </b-btn>
        </div>
      </div>

    </b-modal>
</template>

<script>
import * as _ from 'lodash'

export default {
  computed: {
    user() {
      return this.$store.getters.userDetail
    },
    userModalTitle() {
      return `${this.$t('modal.title')} - #${this.user.username}`
    }
  },
  methods: {
    hideUserModal() {
      this.$refs.modalUser.hide()
    }
  }
}
</script>
