import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    riders: [],
  },
  mutations: {
    addCyclist(state) {
      const id = state.riders.length + 1;
      const rider = { id };
      console.log(id);
      state.riders = [...state.riders, rider];
    },
  },
  actions: {
    addCyclist(context) {
      context.commit('addCyclist');
    },
  },
  modules: {
  },
});
