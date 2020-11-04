import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const state = {
	login: null,
	now: new Date(),
	nowTimer: null,
	requestingCount: 0,
	chosenTask: null,
	chosenTaskDel:null,
	createdTask: null,
	noSleep: 1,
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
