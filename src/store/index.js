import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const state={
	login:null,
	chooseFuZeRenUserId:null,
	chooseFuZeRenUserNickname:null,
	chooseFuZeRenUserAlias:null,
	chooseFaBuRenUserId:null,
	chooseFaBuRenUserNickname:null,
	chooseFaBuRenUserAlias:null,
	cloneTask:null,
	now:new Date(),
	nowTimer:null,
	requestingCount:0,
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
