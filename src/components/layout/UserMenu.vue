<template>
  <v-menu v-if="$route.path !== '/login' && $route.path !== '/register'" offset-y>
    <template v-slot:activator="{ on }">
      <v-btn color="secondary" fab text dark v-on="on">
        <v-avatar color="teal" size="48">
          <img
            alt="User"
            :src="avatar ? avatar.replace('image/upload/', 'image/upload/w_400,h_400,c_fill,g_face/') : require('@/assets/profpic.png')" />
        </v-avatar>
      </v-btn>
    </template>
    <HowPWA v-model="howpwa" />
    <PrivacyPolicy v-model="privacy" />
    <SupportDevelopment v-model="support" />
    <ProfileForm v-model="profile" />
    <ThemePicker v-model="themePicker" />
    <GlobalSettings v-model="globalSettings" />
    <v-list rounded class="overflow-y-auto">
      <v-list-item>
        <v-list-item-title>{{ first_name }} {{ last_name }} ({{ role }})</v-list-item-title>
      </v-list-item>
      <v-list-item v-if="roles === 0" @click.stop="profile = true">
        <v-list-item-title>Edit Student Profile</v-list-item-title>
      </v-list-item>
      <v-divider class="mb-2" />
      <v-list-item @click.stop="howpwa = true">
        <v-list-item-title>Mobile App</v-list-item-title>
      </v-list-item>
      <v-divider class="mb-2" />
      <v-list-item @click.stop="privacy = true">
        <v-list-item-title>Privacy Policy</v-list-item-title>
      </v-list-item>
      <v-list-item @click.stop="support = true">
        <v-list-item-title>Support Development</v-list-item-title>
      </v-list-item>
      <v-divider class="mb-2" />
      <v-list-item @click.stop="themePicker = true">
        <v-list-item-title><v-avatar class="mr-2" :color="$vuetify.theme.themes[this.theme].primary" size="25" /> Change Primary Color</v-list-item-title>
      </v-list-item>
      <v-list-item @click.stop="toggleDarkMode">
        <v-list-item-title v-if="$vuetify.theme.dark"><v-icon class="mr-2">mdi-weather-sunny</v-icon> Disable Dark Mode</v-list-item-title>
        <v-list-item-title v-else><v-icon class="mr-2">mdi-weather-night</v-icon> Enable Dark Mode</v-list-item-title>
      </v-list-item>
      <v-divider v-if="roles === 2" class="mb-2" />
      <v-list-item v-if="roles === 2" @click.stop="globalSettings = true">
        <v-list-item-title><v-icon class="mr-2">mdi-settings</v-icon> Global Settings (DM Only)</v-list-item-title>
      </v-list-item>
      <v-divider class="mb-2" />
      <v-list-item @click.stop="logout">
        <v-list-item-title>Log Out</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { getTheme, setTheme } from '@/utils/ekalayapi'

  const PrivacyPolicy = () => import('@/components/layout/PrivacyPolicy')
  const SupportDevelopment = () => import('@/components/layout/SupportDevelopment')
  const ProfileForm = () => import('@/components/layout/ProfileForm')
  const ThemePicker = () => import('@/components/layout/ThemePicker')
  const GlobalSettings = () => import('@/components/layout/GlobalSettings')
  const HowPWA = () => import('@/components/layout/HowPWA')

  export default {
    components: {
      PrivacyPolicy,
      SupportDevelopment,
      ProfileForm,
      ThemePicker,
      GlobalSettings,
      HowPWA
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
      },
      theme() {
        return (this.$vuetify.theme.dark) ? 'dark' : 'light'
      }
    },
    created() {
      if (this.uid) {
        this.getTheme()
      }
    },
    watch: {
      uid(next) {
        if(next !== '') {
          this.getTheme()
        }
      },
      themePicker(next) {
        if(next === false) {
          setTheme({ darkMode: this.$vuetify.theme.dark, primaryColor: this.$vuetify.theme.themes[this.theme].primary })
        }
      }
    },
    data: () => ({
      privacy: false,
      support: false,
      profile: false,
      themePicker: false,
      howpwa: false,
      globalSettings: false,
    }),
    methods: {
      logout() {
        this.$store.dispatch('logout')
        location.reload()
      },
      toggleDarkMode() {
        setTheme({ darkMode: !this.$vuetify.theme.dark, primaryColor: this.$vuetify.theme.themes[this.theme].primary }).then(() => {
          this.$vuetify.theme.dark = !this.$vuetify.theme.dark
        })
      },
      getTheme() {
        getTheme().then((res) => {
          this.$vuetify.theme.dark = res.darkMode
          this.$vuetify.theme.themes[this.theme].primary = res.primaryColor
        })
      },
    }
  }
</script>