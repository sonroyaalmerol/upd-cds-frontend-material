<template>
  <v-app :dark="true">
    <v-app-bar app clipped-right>
      <v-app-bar-nav-icon v-if="$route.path !== '/login' && $route.path !== '/register'" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <img :src="require('./assets/logo.png')" width="50px" />
      <v-toolbar-title class="headline">
        <span class="font-weight-light">&nbsp;&nbsp;e</span>
        <span>Kalay</span>
        <span class="font-weight-light"> - Centralized Database System</span>
      </v-toolbar-title>
      <div class="flex-grow-1"></div>
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
        </v-list>
      </v-menu>
      <!--<template v-slot:extension>
      </template>-->
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
          <v-list-group v-else :key="index" :prepend-icon="item.meta.icon">
            <template v-slot:activator>
              <v-list-item-title>{{ item.meta.title }}</v-list-item-title>
            </template>
            <template v-for="(sub, i) in item.children">
              <v-list-item
                v-if="!sub.hidden && sub.meta.roles.includes(role)"
                :key="i"
                :to="`${(item.path === '/') ? '' : item.path}/${sub.path}`"
              >
                <v-list-item-title v-text="sub.meta.title"></v-list-item-title>
              </v-list-item>
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
  created() {
    console.log(this.$router.path)
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
