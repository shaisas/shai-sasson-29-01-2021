import axios from "axios";
import jwt from "jsonwebtoken";

const state = () => ({
  user: null,
  isLoggedIn: false
});

const getters = {
  isLoggedIn: state => {
    return !!state.user;
  }
};

const mutations = {
  user(state, user) {
    state.user = user;
  }
};

const actions = {
  async signUp({ commit }, { name, id }) {
    try {
      const { data } = await axios.post("http://127.0.0.1:3000/auth/signup", {
        name,
        id
      });
      const user = jwt.decode(data.token);
      commit("user", user);
    } catch (e) {
      throw new Error(e?.response?.data?.error || "please try again later");
    }
  },
  async login({ commit }, { id }) {
    try {
      const { data } = await axios.post("http://127.0.0.1:3000/auth/login", {
        id
      });
      const user = jwt.decode(data.token);
      commit("user", user);
    } catch (e) {
      throw new Error(e?.response?.data?.error || "please try again later");
    }
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
