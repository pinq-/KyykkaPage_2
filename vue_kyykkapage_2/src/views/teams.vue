<template>
  <div class="home">
    <b-container fluid>
      <b-row>
        <b-col>
          <game_modals/>
          <teams_modal/>
          <b-card class="font-weight-bold theme2 m-2" style="overflow:auto" no-body>
            <template #header>
              <b-row class="justify-content-md-center">
                                <b-col>
                                    <h1 class="m-2" > {{team_name_full}} </h1> ( {{team_name}} )
                                </b-col>                             
                                <b-col>
                                    <b-row class="justify-content-md-center">
                                        <img v-if="team_liig == 'NKL'" src="@/assets/NKL_small.png" width="40"/>
        <img v-else-if="team_liig.startsWith('K')" src="@/assets/kyykkaliiga_small.png" width="40"/>
        <img v-else-if="team_liig.startsWith('O')" src="@/assets/oamk_small.png" width="40"/><h4 class="m-2" > {{team_liig.split("/")[1]}} </h4>
                                    </b-row>
                                </b-col>
                            </b-row>
              </template>
            <teams_stats :team_data = "team_data"/>
          </b-card>
        </b-col>
      </b-row>
      <b-row>
        <b-col lg="4">
          <b-card class="font-weight-bold theme2 m-2" header = 'Joukkueen Oka' style="overflow:auto" no-body>
            <teams_hka_plot :team_Oka_stats = "team_Oka_stats"/>
          </b-card>
        </b-col>        
        <b-col>
          <b-card class="font-weight-bold theme2 m-2" header = 'Pelaajat' style="overflow:auto" no-body>
            <team_players/>
          </b-card>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-card class="font-weight-bold theme2 m-2" style="overflow:auto" header = 'Pelit' no-body>
            <team_game_plot :team_data = "team_data"/>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
// @ is an alias to /src
import game_modals from '@/components/game_modals.vue'
import teams_stats from '@/components/teams/team_stats.vue'
import teams_hka_plot from '@/components/teams/team_hka_plot.vue'
import team_players from '@/components/teams/team_players.vue'
import team_game_plot from '@/components/teams/team_game_plot.vue'
 import teams_modal from '@/components/teams_modal.vue'
import axios from 'axios'

export default {
  name: 'Home',
  components: {
    game_modals,
    teams_stats,
    teams_hka_plot,
    team_players,
    team_game_plot,
    teams_modal
  },
  props:["year", "liig"],
  data(){
    return {
        team_name : "Tiimin nimi",
        team_name_full : "Tiimin nimi",
        team_liig : "Tiimin liiga",
        team_data : 0,
        team_Oka_stats : [[],[]]

      }
  },
  methods: {
    get_team_stats(){
      if (this.$route.params.id != '-'){
        this.$store.state.team_id = this.$route.params.id
        axios
        .get('https://pinq.kapsi.fi/DK/api/data/team/' + this.$route.params.id)
        .then(response => (this.parse_team_stats(response.data)));
      }
    },
    parse_team_stats(data){
      this.team_name = data[0].Team_short_name
      this.$store.state.team_name_short = data[0].Team_short_name
      this.team_name_full = data[0].Team_full_name
      this.team_liig = data[0].Event_name
      data[0]['Kokemus'] = data.length
      this.team_data = [data[0]]
      this.parse_team_Oke(data)
      // console.log(data)
    },
    parse_team_Oke(data) {
      // console.log(data)
      var years = [],
      Oka = [];
      //Parse data for plot
      data.forEach(function(val){
        years.unshift(val.Event__Year)
        Oka.unshift(Number((val.Game_mean / val.Games_n).toFixed(2)))
      });
      this.team_Oka_stats = [years, Oka]

    },
  },
  watch: {        
    '$route' (){
      this.get_team_stats();
    },
  },
  mounted() {
    this.get_team_stats();
    // this.get_player_throws();
  },
}
</script>