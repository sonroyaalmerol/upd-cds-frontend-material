<template>
  <v-app :dark="true">
    <v-navigation-drawer v-if="$route.path !== '/login' && $route.path !== '/register'" v-model="drawerRight" app
      clipped right>
      <v-card hover outlined tile>
        <v-card-text>
          No notifications
        </v-card-text>
      </v-card>
    </v-navigation-drawer>
    <v-app-bar dark app clipped-right color="#fcb69f" :src="require('./assets/header.jpg')">
      <template v-slot:img="{ props }">
        <v-img v-bind="props" :gradient="appBarGradient"></v-img>
      </template>
      <v-app-bar-nav-icon dark v-if="$route.path !== '/login' && $route.path !== '/register'"
        @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <img :src="require('./assets/logo.png')" width="50px" />
      <v-toolbar-title dark class="headline">
        <span class="font-weight-light">&nbsp;&nbsp;e</span>
        <span>Kalay</span>
        <span class="font-weight-light"> - Centralized Database System</span>
      </v-toolbar-title>
      <div class="flex-grow-1"></div>
      <v-btn dark v-if="$route.path !== '/login' && $route.path !== '/register'" icon
        @click.stop="drawerRight = !drawerRight">
        <v-icon>mdi-bell</v-icon>
      </v-btn>&nbsp;&nbsp;
      <v-menu v-if="$route.path !== '/login' && $route.path !== '/register'" offset-y>
        <template v-slot:activator="{ on }">
          <v-btn color="secondary" fab text dark v-on="on">
            <v-avatar color="teal" size="48">
              <img
                src="https://res.cloudinary.com/upd-cds/image/upload/v1555265020/ockzpuwpf5xzgd0030ae.jpg?imageView2/1/w/80/h/80" />
            </v-avatar>
          </v-btn>
        </template>
        <v-list class="overflow-y-auto">
          <v-list-item @click.stop="">
            <v-list-item-title>Edit Student Profile</v-list-item-title>
          </v-list-item>
          <v-divider />
          <v-list-item @click.stop="">
            <v-list-item-title>Privacy Policy</v-list-item-title>
          </v-list-item>
          <v-list-item @click.stop="">
            <v-list-item-title>Support Development</v-list-item-title>
          </v-list-item>
          <v-divider />
          <v-list-item :to="'/login'">
            <v-list-item-title>Log Out</v-list-item-title>
          </v-list-item>
          <v-divider />
          <v-list-item @click.stop="$vuetify.theme.dark = !$vuetify.theme.dark">
            <v-list-item-title v-if="$vuetify.theme.dark">Disable Dark Mode</v-list-item-title>
            <v-list-item-title v-else>Enable Dark Mode</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
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

    <!-- NAVIGATION DRAWER -->

    <v-navigation-drawer v-if="$route.path !== '/login' && $route.path !== '/register'" v-model="drawer" app>
      <v-list class="overflow-y-auto" dense>
        <template v-for="(item, index) in routes">
          <v-list-item
            v-if="item.children.filter((i) => 'meta' in i && !i.hidden && i.meta.roles.includes(role)).length === 1"
            :key="index" :to="`${(item.path === '/') ? '' : item.path}/${firstNonHidden(item.children).path}`">
            <v-list-item-action>
              <v-icon>{{ item.meta.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{ firstNonHidden(item.children).meta.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-group
            v-else-if="item.children.filter((i) => 'meta' in i && !i.hidden && i.meta.roles.includes(role)).length > 1"
            :key="index" :prepend-icon="item.meta.icon">
            <template v-slot:activator>
              <v-list-item-title>{{ item.meta.title }}</v-list-item-title>
            </template>
            <template v-for="(sub, i) in item.children">
              <template v-if="!sub.hidden">
                <v-list-item v-if="sub.meta.roles.includes(role)" :key="i"
                  :to="`${(item.path === '/') ? '' : item.path}/${sub.path}`">
                  <v-list-item-title v-text="sub.meta.title"></v-list-item-title>
                </v-list-item>
              </template>
            </template>
          </v-list-group>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-content>
      <keep-alive>
        <router-view :key="$route.fullPath" />
      </keep-alive>
    </v-content>

    <v-bottom-sheet v-model="offline">
      <v-sheet class="text-center" height="150px">
        <v-btn class="mt-6" text dark color="primary" @click="offline = !offline">close</v-btn>
        <div>You are currently
          <v-chip class="ma-2" color="red" text-color="white">
            OFFLINE
          </v-chip>
        </div>
      </v-sheet>
    </v-bottom-sheet>

    <v-bottom-sheet v-model="online">
      <v-sheet class="text-center" height="150px">
        <v-btn class="mt-6" text dark color="primary" @click="online = !online">close</v-btn>
        <div>You are now back
          <v-chip class="ma-2" color="green" text-color="white">
            ONLINE
          </v-chip>
        </div>
      </v-sheet>
    </v-bottom-sheet>
  </v-app>
</template>

<script>
  export default {
    name: 'App',
    components: {},
    data: () => ({
      drawer: null,
      offline: false,
      online: false,
      wentOffline: false,
      drawerRight: null,
      right: false,
      left: false,
      role: 2
    }),
    watch: {
      networkStatus(next) {
        if (!next) {
          this.offline = true
          this.online = false
          this.wentOffline = true
        } else {
          this.offline = false
          if (this.wentOffline) {
            this.online = true
          }
        }
      }
    },
    computed: {
      routes() {
        return this.$router.options.routes
      },
      appBarGradient() {
        return 'to top right, rgba(0,0,0,.8), rgba(0,0,0,.8)'
      },
      networkStatus() {
        return this.isOnline
      }
    },
    methods: {
      firstNonHidden(array) {
        for (var x = 0; x < array.length; x++) {
          if ('hidden' in array[x] && array[x].hidden) {
            continue
          }
          return array[x]
        }
      }
    }
  }
</script>