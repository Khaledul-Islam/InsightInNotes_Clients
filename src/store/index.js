import Vue from 'vue'
import Vuex from 'vuex'

import { auth } from './modules/auth.module';
import CategoryInfoData from './modules/category/category';
import NotesInfoData from './modules/notes/notes';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    auth,
    CategoryInfoData,
    NotesInfoData,
  },
})
