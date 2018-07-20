import Vue from "vue";
import Vuex from "vuex";

import {ADD_WORD, DISLIKE_A_WORD, LIKE_A_WORD} from "./data/mutation-types";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userInfo: {
      username: null,
    },
    quotes: [
      {
        id: 1,
        phrase: "载入中",
        author: "载入中",
        imageUrl: "",
        likes: 0,
        liked: false
      }
    ]
  },
  mutations: {
    //更新用户信息
    updateUserInfo(state, newUserInfo) {
      state.userInfo = newUserInfo;
    },
    login(state, username) {
      state.userInfo.username = username;
    },
    /**
     * @param state
     * @param {HitokotoWord} newWord 要添加的新句子
     */
    [ADD_WORD](state, newWord) {
      state.quotes.push(newWord);
    },
    [LIKE_A_WORD](state, likedWordId) {
      let quote = state.quotes.find(quote => quote.id === likedWordId);
      quote.liked = true;
      quote.likes += 1;
    },
    [DISLIKE_A_WORD](state, likedWordId) {
      let quote = state.quotes.find(quote => quote.id === likedWordId);
      quote.liked = false;
      quote.likes -= 1;
    },
    removeFirst(state){
      state.quotes.shift()
    }
  },
  getters: {
    /**@return {HitokotoWord}*/
    randomQuote: state => {
      return state.quotes[Math.floor(Math.random() * state.quotes.length)];
    },
    likedWords: state => {
      return state.quotes.filter(quote => quote.liked);
    },
    username: state => {
      return state.userInfo.username
    }
  }
});
