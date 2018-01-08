<template>
  <div id="app">
    <v-app>
      <v-toolbar app><h3>33 Traps</h3></v-toolbar>
      <v-content>
        <v-container fluid>
          <h1>33 Traps</h1>
          <router-view/>
        </v-container>
      </v-content>
      <v-footer app></v-footer>
    </v-app>

  </div>
</template>

<script>
  export default {
    name: 'app'
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
</style>
