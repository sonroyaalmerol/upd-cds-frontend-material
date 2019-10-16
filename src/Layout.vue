<template>
  <v-app :dark="true">
    <v-navigation-drawer
      v-model="drawerRight"
      app
      clipped
      right
    >
      <v-card hover outlined tile>
        <v-card-text>
          No notifications
        </v-card-text>
      </v-card>
    </v-navigation-drawer>
    <v-app-bar app clipped-right color="#fcb69f"
      src="https://scontent.fmnl2-1.fna.fbcdn.net/v/t31.0-8/21551820_1683303988378392_2044572461631207389_o.jpg?_nc_cat=103&_nc_oc=AQndIfAN9Q3zadGqeK5Lr_jh0f1JdlhCvM4ORQNkzFyntQjj0Kn6BmZ1XIKrDSPmLuI&_nc_ht=scontent.fmnl2-1.fna&oh=003aba39deffd85bb3ec4e759a42a654&oe=5E327E9B"
    >
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          :gradient="appBarGradient"
        ></v-img>
      </template>
      <v-app-bar-nav-icon v-if="$route.path !== '/login' && $route.path !== '/register'" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <img :src="require('./assets/logo.png')" width="50px" />
      <v-toolbar-title class="headline">
        <span class="font-weight-light">&nbsp;&nbsp;e</span>
        <span>Kalay</span>
        <span class="font-weight-light"> - Centralized Database System</span>
      </v-toolbar-title>
      <div class="flex-grow-1"></div>
      <v-btn icon @click.stop="drawerRight = !drawerRight">
        <v-icon>mdi-bell</v-icon>
      </v-btn>&nbsp;&nbsp;
      <v-menu v-if="$route.path !== '/login' && $route.path !== '/register'" offset-y>
        <template v-slot:activator="{ on }">
          <v-btn
            color="secondary"
            fab
            text
            v-on="on"
          >
            <v-avatar color="teal" size="48">
              <img src="https://res.cloudinary.com/upd-cds/image/upload/v1555265020/ockzpuwpf5xzgd0030ae.jpg?imageView2/1/w/80/h/80" /> 
            </v-avatar>
          </v-btn>
        </template>
        <v-list>
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
          <v-list-item @click.stop="">
            <v-list-item-title>Log Out</v-list-item-title>
          </v-list-item>
          <v-divider />
          <v-list-item @click.stop="$vuetify.theme.dark = !$vuetify.theme.dark">
            <v-list-item-title v-if="$vuetify.theme.dark">Disable Dark Mode</v-list-item-title>
            <v-list-item-title v-else>Enable Dark Mode</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <template v-slot:extension>
        <v-toolbar-title>
          <v-icon>{{ $route.meta.icon }}</v-icon>
          <span class="font-weight-light">{{ $route.name }}</span>
        </v-toolbar-title>
      </template>
    </v-app-bar>

    <!-- NAVIGATION DRAWER -->

    <v-navigation-drawer
      v-if="$route.path !== '/login' && $route.path !== '/register'"
      v-model="drawer"
      app
    >
      <v-list dense>
        <template v-for="(item, index) in routes">
          <v-list-item
            v-if="item.children.filter((i) => 'meta' in i && !i.hidden && i.meta.roles.includes(role)).length === 1"
            :key="index"
            :to="`${(item.path === '/') ? '' : item.path}/${item.children[0].path}`"
          >
            <v-list-item-action>
              <v-icon>{{ item.meta.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{ item.children[0].meta.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-group v-else-if="item.children.filter((i) => 'meta' in i && !i.hidden && i.meta.roles.includes(role)).length > 1" :key="index" :prepend-icon="item.meta.icon">
            <template v-slot:activator>
              <v-list-item-title>{{ item.meta.title }}</v-list-item-title>
            </template>
            <template v-for="(sub, i) in item.children">
              <template v-if="!sub.hidden">
                <v-list-item
                  v-if="sub.meta.roles.includes(role)"
                  :key="i"
                  :to="`${(item.path === '/') ? '' : item.path}/${sub.path}`"
                >
                  <v-list-item-title v-text="sub.meta.title"></v-list-item-title>
                </v-list-item>
              </template>
            </template>
          </v-list-group>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-content>
      <transition name="fade" mode="out-in">
        <router-view />
      </transition>
    </v-content>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  components: {
  },
  data: () => ({
    drawer: null,
    drawerRight: null,
    right: false,
    left: false,
    role: 1
  }),
  computed: {
    routes() {
      return this.$router.options.routes
    },
    appBarGradient() {
      if (this.$vuetify.theme.dark) {
        return 'to top right, rgba(0,0,0,.8), rgba(0,0,0,.8)'
      }
      else {
        return 'to top right, rgba(255,255,255,.8), rgba(255,255,255,.8)'
      }
    }
  }
}
</script>

<style scoped>
  .fade-enter-active,
  .fade-leave-active {
    transition-duration: 0.3s;
    transition-property: opacity;
    transition-timing-function: ease;
  }

  .fade-enter,
  .fade-leave-active {
    opacity: 0
  }
</style>
