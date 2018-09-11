import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'

Vue.use(Vuex)

const state = {
  bookInfo:{},
  recom_song_menu:[],
  newest_music:[],
  hot_music_list:[],
  playlist_detail:[]
}
export function createStore() {
  return new Vuex.Store({
    state,
    actions,
    mutations,
    getters
  })
}
