import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const state={
	login:null,
	chooseFuZeRenUserId:null,
	chooseFuZeRenUserNickname:null,
	chooseFaBuRenUserId:null,
	chooseFaBuRenUserNickname:null,
	cloneTask:null,
}
const getters={
  
}
const actions={}
const mutations={}
export default new Vuex.Store({
	state,
	mutations,
	actions,
	getters
})
