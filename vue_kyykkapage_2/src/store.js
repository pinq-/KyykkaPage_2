import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


export default new Vuex.Store({
  state : {
    game_id: 0,
    game_modal: 1,
    games_modal: 1,
    teams_modal: 1,
    players_modal: 1,
    team_id: 0,
    team_name_short : '-',
    year: 0,
    liig: 0,
    screen_size: 0,
  }
})
