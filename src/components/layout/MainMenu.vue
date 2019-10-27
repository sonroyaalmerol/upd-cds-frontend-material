<template>
  <v-navigation-drawer v-if="$route.path !== '/login' && $route.path !== '/register'" v-model="value" app>
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
</template>

<script>
  export default {
    name: 'App',
    components: {},
    props: {
      value: {
        required: true
      }
    },
    data: () => ({
      role: 2
    }),
    computed: {
      routes() {
        return this.$router.options.routes
      },
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