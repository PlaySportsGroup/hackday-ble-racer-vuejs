import Vue from 'vue';
import Vuex from 'vuex';

import * as Firebase from 'firebase';
import 'firebase/firestore';

import config from '../config';

Firebase.initializeApp(config);

Vue.use(Vuex);

export default new Vuex.Store({
  state:
  {
    riderCount: 0,
    riders: {},
    winner: false,
    winners: [],
    db: Firebase.firestore(),
  },
  getters: {
    cyclist: (state) => state.riders,
    winner: (state) => state.winner,

  },
  mutations: {
    addCyclist(state, name) {
      const id = state.riderCount + 1;
      const rider = { id, name };
      Vue.set(state.riders, id, rider);
      state.riderCount = id;
    },
    winner(state, name) {
      state.winner = name;
    },
    addWinnerToDB(state, data) {
      const winnerCollection = state.db.collection('winners');
      const { name, time } = data;
      winnerCollection.add({
        name,
        time,
      });
    },
    addToLeaderBoard(state, winner) {
      const data = winner.data();
      state.winners.push(data);
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
    addWinnerToDb(context, data) {
      context.commit('addWinnerToDB', data);
    },
    async getLeaderBoard(context) {
      let winners = this.state.db.collection('winners');
      winners = await winners.get();
      winners.forEach((rider) => {
        context.commit('addToLeaderBoard', rider);
      });
    },
  },
  modules: {
  },
});
