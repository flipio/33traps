<template>
  <div id="app">
    <v-app>
      <v-toolbar app><h3>33 Traps</h3></v-toolbar>
      <v-content>
        <v-container fluid>
          <!--<router-view/>-->
          <Home></Home>
        </v-container>
      </v-content>
      <v-footer app></v-footer>
    </v-app>

  </div>
</template>

<script>
  import Home from '@/pages/Home'

  export default {
    name: 'app',
    components: {Home}
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

  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }

  .game-width {
    min-width: 250px;
    max-width: 500px;
    margin: 0 auto;
  }

</style>
