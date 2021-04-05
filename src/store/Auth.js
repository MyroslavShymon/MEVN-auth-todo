import axios from "axios";
import Vue from "vue";
import Vuex from "vuex";
import router from "../router/index";

Vue.use(Vuex);

const state = {
  token: localStorage.getItem("token") || "",
  user: {},
  status: "",
  storiesLoad: [],
};
const actions = {
  async login({ commit }, user) {
    console.log("commit_login", commit, user);
    commit("auth_request");
    try {
      let res = await axios.post("http://localhost:5000/api/auth/login", user);
      console.log(res);
      if (res.data.success) {
        const token = res.data.token;
        const user = res.data.user;
        // Store the token into the localstorage
        localStorage.setItem("token", token);
        // Set the axios defaults
        axios.defaults.headers.common["Authorization"] = token;
        commit("auth_success", { token, user });
      }
      return res;
    } catch (err) {
      console.log(err);
    }
  },
  async register({ commit }, user) {
    commit("register_request");
    try {
      let res = await axios.post(
        "http://localhost:5000/api/auth/register",
        user
      );
      console.log(res);
      if (res.data.success) {
        commit("register_success");
      }
      return res;
    } catch (err) {
      console.log(err);
    }
  },
  async logout({ commit }) {
    try {
      await localStorage.removeItem("token");
      commit("logout");
      delete axios.defaults.headers.common["Authorization"];
      router.push("/login");
      return;
    } catch (error) {
      console.log(error);
    }
  },
  async getProfile({ commit }) {
    commit("get_profile_request");
    try {
      let res = await axios.get("http://localhost:5000/api/auth/profile");
      console.log(res.data);
      commit("get_profile", res.data);
      return res;
    } catch (error) {
      console.log(error);
    }
  },
};
const mutations = {
  get_profile_request(state) {
    state.status = "loading";
  },
  auth_request(state) {
    state.status = "loading";
  },
  register_request(state) {
    state.status = "loading";
  },
  get_profile(state, data) {
    state.status = "success";
    state.user = data.user;
    state.storiesLoad = data.stories;
  },
  auth_success(state, data) {
    state.token = data.token;
    state.user = data.user;
    state.status = "succes";
    console.log("USER_auth_success", state.user, data.user);
  },
  register_success(state) {
    state.status = "succes";
  },
  logout(state) {
    state.token = "";
    state.user = "";
    state.status = "";
  },
};
const modules = {};
const getters = {
  isLoggedIn: (state) => !!state.token,
  authState: (state) => state.status,
  user: (state) => state.user,
  storiesLoad: (state) => state.storiesLoad,
};

export default {
  state,
  mutations,
  getters,
  actions,
  modules,
};
