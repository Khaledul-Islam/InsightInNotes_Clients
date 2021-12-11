<template>
  <v-app>
    <v-main>
      <router-view></router-view>
    </v-main>
    <snackbar ref="snackbar" />
  </v-app>
</template>

<script>
import snackbar from './components/Snackbar.vue'
export default {
  components: {
    snackbar,
  },
  mounted() {
    this.$root.snackbar = this.$refs.snackbar
  },
}
</script>

<style>
</style>
