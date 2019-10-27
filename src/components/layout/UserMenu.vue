<template>
  <v-menu v-if="$route.path !== '/login' && $route.path !== '/register'" offset-y>
    <template v-slot:activator="{ on }">
      <v-btn color="secondary" fab text dark v-on="on">
        <v-avatar color="teal" size="48">
          <img
            alt="User"
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
      <v-list-item @click.stop="logout">
        <v-list-item-title>Log Out</v-list-item-title>
      </v-list-item>
      <v-divider />
      <v-list-item @click.stop="$vuetify.theme.dark = !$vuetify.theme.dark">
        <v-list-item-title v-if="$vuetify.theme.dark">Disable Dark Mode</v-list-item-title>
        <v-list-item-title v-else>Enable Dark Mode</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
  export default {
    name: 'App',
    data: () => ({

    }),
    methods: {
      logout() {
        this.$store.dispatch('logout').then(() => {
          this.$router.push({ path: '/login' })
        })
      },
    }
  }
</script>