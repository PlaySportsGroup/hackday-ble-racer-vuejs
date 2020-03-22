<template>
  <div class="home">
    <div class="header">
      <span class="white">GC<i>N</i></span>
      <span class="red">Bro<i>w</i>ser Cr<i>i</i>t</span>
    </div>
    <Table/>
  </div>
</template>

<style lang="scss">
  @import '../assets/css/base.scss';
</style>
<script>

import Table from '@/components/Table.vue';

export default {
  name: 'LeaderBoard',
  components: {
    Table,
  },
  created() {
    this.$store.dispatch('getLeaderBoard');
  },
};
</script>
