import Vue from 'vue';
import Vuex from 'vuex';
import ws from '../utils/ws';

Vue.use(Vuex);

export default new Vuex.Store({
  state:
  {
    raceId: '',
    riderCount: 0,
    riders: [],
    winner: false,
  },
  getters: {
    cyclist: (state) => state.riders,
    winner: (state) => state.winner,
    power: (state) => (id) => state.riders.find((rider) => rider.id === id).power,
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
      state.riders.push(rider);
      state.riderCount = id;
    },
    winner(state, name) {
      state.winner = name;
    },
    addPower(state, payload) {
      const selectedRider = state.riders.find((rider) => rider.id === payload.id);
      selectedRider.power.current_power = payload.power;
      selectedRider.power.total_power = selectedRider.power.total_power
        ? selectedRider.power.total_power
        : 0;
      selectedRider.power.total_power += payload.power;
      selectedRider.power.powerData.push({ value: payload.power });
      const filteredRiders = state.riders.filter((rider) => rider.id !== payload.id);
      state.riders = [...filteredRiders, selectedRider];
    },
    newRider(state, payload) {
      console.log('creating new rider', payload);
      const id = payload.racerId;
      const power = {
        current_power: 0,
        total_power: 0,
        powerData: [],
      };
      const rider = { id, power };
      state.raceId = payload.race.id;
      state.riders.push(rider);
      state.riderCount = payload.race.racers.length;
      console.log('sending state', state);
      ws.send(JSON.stringify(state));
    },
    newRace(state, payload) {
      state.raceId = payload.race.id;
      console.log(payload);
      state.riders = payload.race.racers;
      state.riderCount = payload.race.racers.length;
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
    newRider(context, payload) {
      context.commit('newRider', payload);
    },
    newRace(context, payload) {
      context.commit('newRace', payload);
    },
  },
  modules: {
  },
});
