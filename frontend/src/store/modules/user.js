import axios from "axios";
import jwt from "jsonwebtoken";
const apiUrl =
  process.env.SERVER_API ||
  "https://shai-sasson-mail-app-server.herokuapp.com/";

const state = () => ({
  token: null
});

const getters = {
  isLoggedIn: state => {
    return !!state.token;
  },
  user: state => {
    return jwt.decode(state.token);
  }
};

const mutations = {
  token(state, token) {
    state.token = token;
  }
};

const actions = {
  async signUp({ commit }, { name, id }) {
    try {
      const { data } = await axios.post(apiUrl + "auth/signup", {
        name,
        id
      });
      commit("token", data.token);
    } catch (e) {
      throw new Error(e?.response?.data?.error || "please try again later");
    }
  },
  async login({ commit }, { id }) {
    try {
      const { data } = await axios.post(apiUrl + "auth/login", {
        id
      });
      commit("token", data.token);
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
