<template>

  <div class="home">
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

  div.grid {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: auto;
  }

  div.grid-row {
    display: flex;
    height: 20px;
    margin: 5px auto;
  }

  div.grid-el {

    display: flex;
    flex-direction: row;

    width: 27px;
    height: 20px;
  }

  div.grid-el span {
    width: 100%;
    height: 100%;
    margin: 1px 3px;
    border-radius: 50%;

    cursor: pointer;
  }

  span.filled {
    border: 1px solid #000000;
    background: #000000;
  }

  span.invalid {
    border: 1px solid #bababa;
    background: transparent;
  }

  span.active {
    border: 1px solid #ababab;
    background: #ab851a;
  }


</style>
