import axios from "axios";

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
  async setMails({ commit }) {
    try {
      const {
        data: { mails }
      } = await axios.get("http://127.0.0.1:3000/mail/all");
      commit("mails", mails || []);
    } catch (e) {
      throw new Error(e?.response?.data?.error || "please try again later");
    }
  },
  async sendMail(store, { receiverId, subject, paragraph }) {
    try {
      await axios.post("http://127.0.0.1:3000/mail/create", {
        receiverId,
        subject,
        paragraph
      });
    } catch (e) {
      throw new Error(e?.response?.data?.error || "please try again later");
    }
  },
  async changeProp({ state, commit }, { mailId, propName, propValue }) {
    const mails = [...state.mails];
    try {
      const toUpdate = { key: propName, value: propValue };
      await axios.put(`http://127.0.0.1:3000/mail/${mailId}`, { toUpdate });
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
