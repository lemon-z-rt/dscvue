import Vue from 'vue'
import Vuex from 'vuex'
import { getUserList } from "@/api/Userlist.js"
import { getSearchList } from "@/api/Userlist.js"



Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userListDatas: []
  },
  mutations: {
    getUserList(state, data) {
      state.userListDatas = data
    },

  },
  actions: {
    async getUserList(context, data) {
      let result = await getUserList(data)
      context.commit("getUserList", result)
    },
    async getSearchList(context, data) {
      let result = await getSearchList(data);
      context.commit("getUserList", result)
    },
    // 增加商品
   
  },
  modules: {
  }
})
