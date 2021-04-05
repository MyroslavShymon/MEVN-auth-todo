import Vue from "vue";
import Vuex from "vuex";

import Auth from "./Auth";
import Task from "./Task";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: { Auth, Task },
  state: {},
  mutations: {},
  actions: {},
  getters: {},
});
