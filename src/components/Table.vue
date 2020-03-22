<template>
    <div class="wrapper">
      <h2 class="white"> All Time Leaders </h2>
      <table class="white">
        <tr>
          <th>Position</th>
          <th>Name</th>
          <th>Time</th>
        </tr>
        <tr v-for="rider in sortedLeaders" :key="rider.position">
          <td>{{ rider.position }}</td>
          <td>{{ rider.name }}</td>
          <td>{{ rider.time }}</td>
        </tr>
      </table>
    </div>
</template>

<script>

export default {
  computed: {
    leaders() {
      const leaders = this.$store.state.winners;
      return leaders;
    },
    sortedLeaders() {
      let sortedLeaders = this.leaders;
      let count = 1;
      sortedLeaders.sort((a, b) => a.time - b.time);
      sortedLeaders = sortedLeaders.map((rider) => {
        const updatedRider = { ...rider, position: count };
        count += 1;
        return updatedRider;
      });
      return sortedLeaders;
    },
  },
};

</script>
