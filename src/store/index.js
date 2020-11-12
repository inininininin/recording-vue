import Vue from 'vue/dist/vue.runtime.esm.js';
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
	chosenMemoryBook:null,
	chosenMemoryBookDel:null,
	routes: [],
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
