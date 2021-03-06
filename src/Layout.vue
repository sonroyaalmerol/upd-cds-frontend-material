<template>
  <v-app :dark="true" :style="{background: $vuetify.theme.themes[theme].background}">
    <NotificationDrawer v-model="drawerRight" />

    <v-app-bar dark app clipped-right flat color="#fcb69f" :src="require('./assets/header.jpg')">
      <template v-slot:img="{ props }">
        <v-img v-bind="props" :gradient="appBarGradient"></v-img>
      </template>
      <v-app-bar-nav-icon dark v-if="$route.path !== '/login' && $route.path !== '/register'"
        @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <Logo />
      <v-toolbar-title dark class="headline" v-if="!isMobileDevice">
        <span class="font-weight-light ms-3">e</span>
        <span>Kalay</span>
        <span class="font-weight-light"> - Centralized Database System</span>
      </v-toolbar-title>
      <div class="flex-grow-1"></div>

      <v-btn class="me-3" dark v-if="$route.path !== '/login' && $route.path !== '/register' && !isMobileDevice" icon
        @click.stop="forceRerender">
        <v-icon>mdi-reload</v-icon>
      </v-btn>

      <v-btn class="me-3" dark v-if="$route.path !== '/login' && $route.path !== '/register'" icon
        @click.stop="drawerRight = !drawerRight">
        <v-icon>mdi-bell</v-icon>
      </v-btn>

      <v-tooltip v-if="$route.path !== '/login' && $route.path !== '/register'" bottom>
        <template v-slot:activator="{ on }">
          <v-avatar class="mx-3" v-on="on" :color="inOutColor" size="16" />
        </template>
        <span>You are {{ inOut ? 'IN' : 'OUT' }}!</span>
      </v-tooltip>
      
      <UserMenu />

      <template v-if="$route.path !== '/login' && $route.path !== '/register'" v-slot:extension>
        <v-toolbar-title dark>
          <v-icon>{{ $route.meta.icon }}</v-icon>
          <span v-if="name" class="font-weight-light">{{ $route.name }}
            ({{ name }})</span>
          <span v-else class="font-weight-light">{{ $route.name }}</span>
        </v-toolbar-title>
      </template>
    </v-app-bar>

    <MainMenu v-model="drawer" />

    <v-content :style="{background: $vuetify.theme.themes[theme].background}">
      <GlobalAlert />
      <keep-alive>
        <router-view :key="`${$route.fullPath}-${token}-${componentKey}`" />
      </keep-alive>
    </v-content>

    <UpdateNotifier />
  </v-app>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { getActivity, getResidentById, getAssistantById } from '@/utils/ekalayapi'

  const MainMenu = () => import('@/components/layout/MainMenu')
  const UpdateNotifier = () => import('@/components/layout/UpdateNotifier')
  const NotificationDrawer = () => import('@/components/layout/NotificationDrawer')
  const UserMenu = () => import('@/components/layout/UserMenu')
  const GlobalAlert = () => import('@/components/general/GlobalAlert')
  const Logo = () => import('@/components/layout/Logo')

  export default {
    name: 'App',
    components: {
      MainMenu,
      UpdateNotifier,
      NotificationDrawer,
      UserMenu,
      GlobalAlert,
      Logo
    },
    data: () => ({
      drawer: null,
      drawerRight: null,
      name: '',
      componentKey: 0
    }),
    computed: {
      ...mapGetters([
        'token',
        'inOut'
      ]),
      appBarGradient() {
        return 'to top right, rgba(66,66,66,1), rgba(0,0,0,.8)'
      },
      theme() {
        return (this.$vuetify.theme.dark) ? 'dark' : 'light'
      },
      isMobileDevice() {
        return (typeof this.$windowOrientation !== "undefined") || (this.$userAgent.indexOf('IEMobile') !== -1);
      },
      path() {
        return this.$route.path
      },
      inOutColor() {
        return this.inOut ? 'green' : 'red'
      }
    },
    watch: {
      async path() {
        await this.setName()
      }
    },
    async created() {
      await this.setName()
    },
    methods: {
      forceRerender() {
        this.componentKey += 1 
      },
      activityName: async function() {
        var act = await getActivity(this.$route.params.activityId)
        return act.name
      },
      residentName: async function(id) {
        var res = await getResidentById(id)
        return `${res.firstName} ${res.lastName}`
      },
      assistantName: async function(id) {
        var res = await getAssistantById(id)
        return `${res.firstName} ${res.lastName}`
      },
      setName: async function() {
        if (this.$route.params.profileId) {
          this.name = await this.residentName(this.$route.params.profileId)
        } else if (this.$route.params.residentId) {
          this.name = await this.residentName(this.$route.params.residentId)
        } else if (this.$route.params.activityId) {
          this.name = await this.activityName()
        } else if (this.$route.params.assistantId) {
          this.name = await this.assistantName(this.$route.params.assistantId)
        } else {
          this.name = ''
        }
      }
    }
  }
</script>

<style>
.v-expansion-panel::before {
  box-shadow: none;
}
</style>