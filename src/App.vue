<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

import ws from './utils/ws';

export default {
  data() {
    return {
    };
  },
  created() {
    if ('WebSocket' in window) {
      ws.onopen = () => {
        console.log('Successfully connected to the echo websocket server...');
      };

      ws.addEventListener('message', (messageEvent) => {
        const paramaters = JSON.parse(messageEvent.data);
        this.$store.dispatch(paramaters.method, paramaters.data);
      });

      ws.addEventListener('error', (error) => {
        console.log(error.data);
      });
    }
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
