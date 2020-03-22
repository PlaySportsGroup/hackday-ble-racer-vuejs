import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state:
  {
    riderCount: 0,
    riders: {},
    winner: false,
  },
  getters: {
    cyclist: (state) => state.riders,
    winner: (state) => state.winner,
  },
  mutations: {
    addCyclist(state, name) {
      const id = state.riderCount + 1;
      const rider = { id, name };
      console.log(id);
      Vue.set(state.riders, id, rider);
      // state.riders = { ...state.riders, rider };
      state.riderCount = id;
    },
    winner(state, name) {
      state.winner = name;
    },
  },
  actions: {
    addCyclist(context, name) {
      context.commit('addCyclist', name);
    },
    SOCKET_ADD_CYCLIST(context, name) {
      context.commit('addCyclist', name);
    },
    finished(context, name) {
      if (!this.state.winner) {
        context.commit('winner', name);
      }
    },
  },
  modules: {
  },
});
