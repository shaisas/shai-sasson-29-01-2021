import axios from "axios";
const apiUrl =
  process.env.SERVER_API ||
  "https://shai-sasson-mail-app-server.herokuapp.com/";

const state = () => ({
  mails: []
});

const getters = {
  activeMails: state => {
    return state.mails.filter(mail => !mail.isDeleted);
  },
  deletedMails: state => {
    return state.mails.filter(mail => mail.isDeleted);
  },
  favoritesMails: state => {
    return state.mails.filter(mail => mail.isFavorites);
  },
  mail: state => id => {
    return state.mails.find(mail => mail._id === id);
  }
};

const mutations = {
  mails(state, mails) {
    state.mails = mails;
  }
};

const actions = {
  async setMails({ commit, rootState }) {
    const token = rootState.user.token;
    try {
      const {
        data: { mails }
      } = await axios.get(apiUrl + "mail/all", { params: { token } });
      commit("mails", mails || []);
    } catch (e) {
      throw new Error(e?.response?.data?.error || "please try again later");
    }
  },
  async sendMail({ rootState }, { receiverId, subject, paragraph }) {
    const token = rootState.user.token;
    try {
      await axios.post(apiUrl + "mail/create", {
        receiverId,
        subject,
        paragraph,
        token
      });
    } catch (e) {
      throw new Error(e?.response?.data?.error || "please try again later");
    }
  },
  async changeProp(
    { state, commit, rootState },
    { mailId, propName, propValue }
  ) {
    const mails = [...state.mails];
    try {
      const toUpdate = { key: propName, value: propValue };
      const token = rootState.user.token;
      await axios.put(`${apiUrl}mail/${mailId}`, { toUpdate, token });
      const mail = mails.find(mail => mail._id === mailId);
      mail[propName] = propValue;
      commit("mails", mails);
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
