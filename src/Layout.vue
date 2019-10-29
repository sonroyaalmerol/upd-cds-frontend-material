<template>
  <v-app :dark="true" :style="{background: $vuetify.theme.themes[theme].background}">
    <NotificationDrawer v-model="drawerRight" />

    <v-app-bar dark app clipped-right flat color="#fcb69f" :src="require('./assets/header.jpg')">
      <template v-slot:img="{ props }">
        <v-img v-bind="props" :gradient="appBarGradient"></v-img>
      </template>
      <v-app-bar-nav-icon dark v-if="$route.path !== '/login' && $route.path !== '/register'"
        @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <img alt="Logo" :src="require('./assets/logo.png')" width="50px" />
      <v-toolbar-title dark class="headline">
        <span class="font-weight-light ms-3">e</span>
        <span>Kalay</span>
        <span class="font-weight-light"> - Centralized Database System</span>
      </v-toolbar-title>
      <div class="flex-grow-1"></div>
      <v-btn class="me-3" dark v-if="$route.path !== '/login' && $route.path !== '/register'" icon
        @click.stop="drawerRight = !drawerRight">
        <v-icon>mdi-bell</v-icon>
      </v-btn>
      
      <UserMenu />

      <template v-if="$route.path !== '/login' && $route.path !== '/register'" v-slot:extension>
        <v-toolbar-title dark>
          <v-icon>{{ $route.meta.icon }}</v-icon>
          <span v-if="$route.params.profileId" class="font-weight-light">{{ $route.name }}
            ({{ $route.params.profileId }})</span>
          <span v-else-if="$route.params.residentId" class="font-weight-light">{{ $route.name }}
            ({{ $route.params.residentId }})</span>
          <span v-else-if="$route.params.activityId" class="font-weight-light">{{ $route.name }}
            ({{ $route.params.activityId }})</span>
          <span v-else class="font-weight-light">{{ $route.name }}</span>
        </v-toolbar-title>
      </template>
    </v-app-bar>

    <MainMenu v-model="drawer" />

    <v-content :style="{background: $vuetify.theme.themes[theme].background}">
      <keep-alive>
        <router-view :key="$route.fullPath" />
      </keep-alive>
    </v-content>

    <ConnectionStatus />
    <GlobalAlert />
  </v-app>
</template>

<script>
  const MainMenu = () => import('@/components/layout/MainMenu')
  const ConnectionStatus = () => import('@/components/layout/ConnectionStatus')
  const NotificationDrawer = () => import('@/components/layout/NotificationDrawer')
  const UserMenu = () => import('@/components/layout/UserMenu')
  const GlobalAlert = () => import('@/components/general/GlobalAlert')

  export default {
    name: 'App',
    components: {
      MainMenu,
      ConnectionStatus,
      NotificationDrawer,
      UserMenu,
      GlobalAlert
    },
    data: () => ({
      drawer: null,
      drawerRight: null
    }),
    computed: {
      appBarGradient() {
        return 'to top right, rgba(0,0,0,.8), rgba(0,0,0,.8)'
      },
      theme() {
        return (this.$vuetify.theme.dark) ? 'dark' : 'light'
      }
    },
    methods: {
    }
  }
</script>