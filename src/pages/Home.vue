<template>

  <div class="home">
    <h1>33 Traps</h1>
    <game></game>
  </div>

</template>

<script>
  import Game from '@/components/game'

  export default {
    methods: {
    },
    components: {
      Game
    },
    data () {
      return {}
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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

</style>
