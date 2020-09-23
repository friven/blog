import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    token: localStorage.getItem("token"),
    userName: localStorage.getItem("userName"),
    lang:localStorage.getItem("lang")
  },
  mutations: {
    set_token(state, token) {
      state.token =  token;
      localStorage.setItem("token", token);
    },
    del_token(state) {
      state.token = "";
      localStorage.removeItem("token");
    },
    setUserInfo(state, userName) {
      state.userName = userName;
    },
    setLang(state, lang) {
      state.lang =  lang;
      localStorage.setItem("lang", lang);
    },
  },
});
