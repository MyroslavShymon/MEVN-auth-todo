import axios from "axios";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const state = {
  stories: [],
  status: "",
};
const actions = {
  async addTask({ commit }, profile) {
    commit("add_task_request");
    try {
      let res = await axios.post(
        "http://localhost:5000/api/auth/profile",
        profile
      );
      if (res.data.success) {
        commit("add_task_success", res.data.stories);
      }
      return res;
    } catch (err) {
      console.log(err);
    }
  },
  //   async getProfile({ commit }) {
  //     commit("get_profile_request");
  //     try {
  //       let res = await axios.get("http://localhost:5000/api/auth/profile");
  //       commit("get_profile", res.data.user);
  //       return res;
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   },
};
const mutations = {
  add_task_request(state) {
    state.status = "loading";
  },
  add_task_success(state, stories) {
    state.status = "success";
    state.stories = stories;
  },
};
const modules = {};
const getters = {
  taskState: (state) => state.status,
  stories: (state) => state.stories,
};

export default {
  state,
  mutations,
  getters,
  actions,
  modules,
};
