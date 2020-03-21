<template>
    <div class="wrapper">
      <button @click="addCyclist" class="button add-cyclist">Add Cyclist</button>
      <div class="track">
        <Cyclist v-for="bike in cyclist"
          :key="bike.id"
          :record="record"
        />
      </div>
    </div>
</template>

<script>
import Cyclist from '@/components/Cyclist.vue';

export default {
  components: {
    Cyclist,
  },
  props: {
    record: Boolean,
  },
  data() {
    return {
      cyclist: [],
      count: 0,
    };
  },
  methods: {
    addCyclist() {
      this.$store.dispatch('addCyclist');
      // this.count += 1;
      // this.cyclist.push({ id: this.count });
    },
  },
};

</script>
