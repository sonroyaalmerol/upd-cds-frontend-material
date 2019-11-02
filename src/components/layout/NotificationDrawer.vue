<template>
  <v-navigation-drawer v-if="$route.path !== '/login' && $route.path !== '/register'" v-model="localDrawer" app
    clipped right>
    <v-card v-if="notifications.length === 0" flat hover outlined tile :loading="loading">
      <v-card-text>
        No notifications
      </v-card-text>
    </v-card>
    <template v-else>
      <template v-for="notification in notifications">
        <v-card :key="notification._id" flat hover outlined tile>
          <v-card-text>
            <div>
              <b>{{ notification.title }}</b>
            </div>
            {{ notification.description }}
          </v-card-text>
        </v-card>
      </template>
    </template>
  </v-navigation-drawer>
</template>

<script>
  import { notifications, readNotification } from '@/utils/ekalayapi'

  export default {
    name: 'App',
    props: {
      value: {
        required: true
      }
    },
    data() {
      return {
        notifications: [],
        loading: false
      }
    },
    created() {
      this.fetchData()
    },
    computed: {
      localDrawer: {
        get() {
          return this.value
        },
        set(localDrawer) {
          this.$emit('input', localDrawer)
        }
      }
    },
    watch: {
      async localDrawer(next) {
        if (next === true) {
          await this.fetchData()
        }
      }
    },
    methods: {
      async fetchData() {
        this.loading = true
        this.notifications = await notifications()
        this.loading = false
      },
      async readNotif(notification) {
        return await readNotification(notification._id)
      }
    }
  }
</script>