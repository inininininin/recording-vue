import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const state = {
	login: null,
	chooseFuZeRenUserId: null,
	chooseFuZeRenNickname: null,
	chooseFaQiRenUserId: null,
	chooseFaQiRenNickname: null,
	cloneTask: null,
	now: new Date(),
	nowTimer: null,
	requestingCount: 0,
	chosenTask: null,
	chosenTaskDel:null,
	createdTask: null,
};
const getters = {
};
const actions = {};
const mutations = {};
export default new Vuex.Store({
	state,
	mutations,
	actions,
	getters
});
