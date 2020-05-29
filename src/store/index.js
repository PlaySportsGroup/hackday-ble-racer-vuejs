import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state:
  {
    riderCount: 0,
    riders: [],
    winner: false,
  },
  getters: {
    cyclist: (state) => state.riders,
    winner: (state) => state.winner,
    power: (state) => (id) => {
      console.log(id);
      const riderForPower = state.riders.find((rider) => rider.id === id);
      console.log(riderForPower);
      return state.riders.find((rider) => rider.id === id).power;
    },
  },
  mutations: {
    addCyclist(state, name) {
      const id = state.riderCount + 1;
      const power = {
        current_power: 0,
        total_power: 0,
        powerData: [],
      };
      const rider = { id, name, power };
      console.log(id);
      state.riders.push(rider);
      // state.riders = { ...state.riders, rider };
      state.riderCount = id;
    },
    winner(state, name) {
      state.winner = name;
    },
    addPower(state, payload) {
      console.log('called add power');
      console.log(state.riders);
      const selectedRider = state.riders.find((rider) => rider.id === payload.id);
      console.log(selectedRider);
      selectedRider.power.current_power = payload.power;
      selectedRider.power.total_power = selectedRider.power.total_power
        ? selectedRider.power.total_power
        : 0;
      selectedRider.power.total_power += payload.power;
      selectedRider.power.powerData.push({ value: payload.power });
      console.log(selectedRider);
      const filteredRiders = state.riders.filter((rider) => rider.id !== payload.id);
      state.riders = [...filteredRiders, selectedRider];
    },
  },
  actions: {
    addCyclist(context, name) {
      context.commit('addCyclist', name);
    },
    finished(context, name) {
      if (!this.state.winner) {
        context.commit('winner', name);
      }
    },
    addPower(context, payload) {
      context.commit('addPower', payload);
    },
  },
  modules: {
  },
});
