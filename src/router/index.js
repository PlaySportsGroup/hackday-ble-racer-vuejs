import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Home.vue';
import LeaderBoard from '@/views/LeaderBoard.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/leader-board',
    name: 'Leader Board',
    component: LeaderBoard,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
