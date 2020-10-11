import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    token: localStorage.getItem("token"),
    userName: localStorage.getItem("userName"),
    lang:localStorage.getItem("lang"),
    userId: localStorage.getItem("userId"),
    musicUrl:localStorage.getItem("musicUrl")?localStorage.getItem("musicUrl"):'{}',
    isPlay:false
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
    setUserId(state,userId){
      state.userId = userId;
    },
    setMusic(state, musicUrl) {
      state.musicUrl =  musicUrl;
      localStorage.setItem("musicUrl", musicUrl);
    },
    setAudio(state,isPlay){
      state.isPlay =  isPlay;
    }
  },
});
