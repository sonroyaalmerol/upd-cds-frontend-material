<template>
  <v-menu v-if="$route.path !== '/login' && $route.path !== '/register'" offset-y>
    <template v-slot:activator="{ on }">
      <v-btn color="secondary" fab text dark v-on="on">
        <v-avatar color="teal" size="48">
          <img
            alt="User"
            :src="avatar.replace('image/upload/', 'image/upload/w_400,h_400,c_fill,g_face/')" />
        </v-avatar>
      </v-btn>
    </template>
    <PrivacyPolicy v-model="privacy" />
    <SupportDevelopment v-model="support" />
    <ProfileForm v-model="profile" />
    <v-list rounded class="overflow-y-auto">
      <v-list-item>
        <v-list-item-title>{{ first_name }} {{ last_name }} ({{ role }})</v-list-item-title>
      </v-list-item>
      <v-list-item v-if="roles === 0" @click.stop="profile = true">
        <v-list-item-title>Edit Student Profile</v-list-item-title>
      </v-list-item>
      <v-divider class="mb-2" />
      <v-list-item @click.stop="privacy = true">
        <v-list-item-title>Privacy Policy</v-list-item-title>
      </v-list-item>
      <v-list-item @click.stop="support = true">
        <v-list-item-title>Support Development</v-list-item-title>
      </v-list-item>
      <v-divider class="mb-2" />
      <v-list-item @click.stop="logout">
        <v-list-item-title>Log Out</v-list-item-title>
      </v-list-item>
      <v-divider class="mb-2" />
      <v-list-item @click.stop="toggleDarkMode">
        <v-list-item-title v-if="$vuetify.theme.dark">Disable Dark Mode</v-list-item-title>
        <v-list-item-title v-else>Enable Dark Mode</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { getDarkMode, setDarkMode } from '@/utils/ekalayapi'

  const PrivacyPolicy = () => import('@/components/layout/PrivacyPolicy')
  const SupportDevelopment = () => import('@/components/layout/SupportDevelopment')
  const ProfileForm = () => import('@/components/layout/ProfileForm')

  export default {
    components: {
      PrivacyPolicy,
      SupportDevelopment,
      ProfileForm
    },
    name: 'App',
    computed: {
      ...mapGetters([
        'avatar',
        'first_name',
        'last_name',
        'roles',
        'upid',
        'uid'
      ]),
      role() {
        switch (this.roles) {
          case 0:
            return this.upid
          case 1:
            return 'Resident Assistant'
          case 2:
            return 'Dorm Manager'
        }
        return this.upid
      }
    },
    created() {
      if (this.uid) {
        this.getDarkMode()
      }
    },
    activated() {
      if (this.uid) {
        this.getDarkMode()
      }
    },
    watch: {
      uid(next) {
        if(next !== '') {
          this.getDarkMode()
        }
      }
    },
    data: () => ({
      privacy: false,
      support: false,
      profile: false
    }),
    methods: {
      logout() {
        this.$store.dispatch('logout').then(() => {
          this.$router.push({ path: '/login' })
        })
      },
      toggleDarkMode() {
        setDarkMode({ darkMode: !this.$vuetify.theme.dark }).then(() => {
          this.$vuetify.theme.dark = !this.$vuetify.theme.dark
        })
      },
      getDarkMode() {
        getDarkMode().then((res) => {
          this.$vuetify.theme.dark = res
        })
      },
    }
  }
</script>