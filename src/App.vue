<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

export default {
  data() {
    return {};
  },
  sockets: {
    connect() {
      console.log('socket connected');
    },
  },
};
</script>
<style>
  @import url('https://fonts.googleapis.com/css?family=Lobster|Monoton|Montserrat|Roboto&display=swap');
</style>
<style>

body { background-color: #111111; }

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
}

</style>
