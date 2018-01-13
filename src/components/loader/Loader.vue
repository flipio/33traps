<template>
  <div class="loader" v-bind:class="{ darker: typeof dark !== 'undefined' }">
    <v-progress-circular indeterminate color="amber"></v-progress-circular>
  </div>
</template>
<script>
  export default {
    name: 'loader',
    props: ['dark']
  }
</script>
<style>

  .loader {
    position: absolute;
    width: 100%;
    height: 100%;
    margin: 0 auto;
    text-align: center;
    background: rgba(145, 145, 145, 0.9);
  }

  .loader.darker {
    background: rgba(0, 0, 0, 0.8);
  }

  .loader > div {
    margin-top: -16px;
    top: 50%;
  }
</style>
