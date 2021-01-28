<template lang="html">
  <div>
    <b-modal id="modal-1" size="xl" body-bg-variant="dark" header-class="darker" footer-class="darker">
      <template #modal-header="{ close }">
        <b-container fluid >
          <b-row class=" font-weight-bold text-center" style="font-size: 1.6rem;">
            <b-col class="rounded" :class="{'bg-success': result.Home_result > result.Away_result, 'bg-danger': result.Home_result < result.Away_result, 'bg-secondary': result.Home_result == result.Away_result}">
              {{result.Home_result}}
            </b-col>
            <b-col class="bg-info rounded" style="font-size: 2.25rem;" lg="8">
              <span style=" color:#E0D338;">
                {{result.Home_team_name}}
              </span>
              vs.
              <span style=" color:#E0D338;">
                {{result.Away_team_name}}
              </span>
            </b-col>
            <b-col class="rounded" :class="{'bg-success': result.Home_result < result.Away_result, 'bg-danger': result.Home_result > result.Away_result, 'bg-secondary': result.Home_result == result.Away_result}">
              {{result.Away_result}}
            </b-col>
          </b-row>
        </b-container>
        <b-button size="sm" @click="close()">
          X
        </b-button>
      </template>
      <b-container fluid class="text-center">
        <b-row>
          <b-col>
            <h2 class="text-light">Ensimmäinen erä</h2>
          </b-col>
        </b-row>
        <b-row>
          <b-col lg="6">
            <b-card style="overflow:auto" class="font-weight-bold" :header=result.Home_team_name :footer-bg-variant = "result.Home_round1 > result.Away_round1 ? 'success': 'danger'">
              <b-table v-b-tooltip striped hover :items="game_throws[0]" :fields="fields" class="font-weight-bold">
              </b-table>
              <!-- <b-card-footer><em >{{result.Home_round1}} ({{last_throws[0]}})</em></b-card-footer> -->
              <template #footer>
                <em >{{result.Home_round1}} ({{last_throws.home[0]}})</em>
              </template>
            </b-card>
          </b-col>
          <b-col lg="6">
            <b-card style="overflow:auto" class="font-weight-bold" :header=result.Away_team_name :footer-bg-variant = "result.Home_round1 < result.Away_round1 ? 'success': 'danger'">
              <b-table v-b-tooltip striped hover :items="game_throws[1]" :fields="fields" class="font-weight-bold">
              </b-table>
              <template #footer>
                <em>{{result.Away_round1}} ({{last_throws.away[0]}})</em>
              </template>
            </b-card>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <h2 class="text-light">Toinen erä</h2>
          </b-col>
        </b-row>
        <b-row>
          <b-col lg="6">
            <b-card style="overflow:auto" class="font-weight-bold" :header=result.Home_team_name :footer-bg-variant = "result.Home_round2 > result.Away_round2 ? 'success': 'danger'">
              <b-table v-b-tooltip striped hover :items="game_throws[2]" :fields="fields" class="font-weight-bold">
              </b-table>
              <template #footer>
                <em>{{result.Home_round2}} ({{last_throws.home[1]}})</em>
              </template>
            </b-card>
          </b-col>
          <b-col lg="6">
            <b-card style="overflow:auto" class="font-weight-bold" :header=result.Away_team_name :footer-bg-variant = "result.Home_round2 < result.Away_round2 ? 'success': 'danger'">
              <b-table v-b-tooltip striped hover :items="game_throws[3]" :fields="fields" class="font-weight-bold">
              </b-table>
              <template #footer>
                <em>{{result.Away_round2}} ({{last_throws.away[1]}})</em>
              </template>
            </b-card>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
          </b-col>
        </b-row>
      </b-container>
    </b-modal>

  </div>
</template>

<script>
import axios from 'axios'
// import moment from 'moment';

export default {
  props:["selected_game"],
  data(){
    return {
      game_throws: [],
      result: [],
      last_throws:{home: [0,0], away: [0,0]},
      fields: [
        { key: "Player__Name", label: "Nimi"},
        { key: "first", label: "1."},
        { key: "second", label: "2." },
        { key: "third", label: "3."},
        { key: "fourth", label: "4."},
        { key: "yht", label: "yht."},
        { key: "Hka", label: "Hka."},
      ]
    }
  },
  methods: {
    parse_values(data) {
      this.result = data.Results[0];
      this.parse_throw(data.Throws)
    },
    parse_throw(throws){
      // var table = ["Home_first", "Game_away_first", "Game_home_second", "Game_away_second"];
      var throws_order = ["first", "second", "third", "fourth"], data_throws = [[], [], [], []], last_throws = {home: [], away: []};
      var team = "-", last_point = "-", order = "home";
      var team_round = 0, throw_i = 0;
      var player = {Player__Name: "-", first: "-", second: "-", third: "-", fourth: "-", yht: 0, Hka: 0};
      var self = this;
      throws.forEach(function(val){
        // console.log(val);
        if(player.Player__Name != val.Player__Name){
          throw_i = 0
          if(player.Player__Name != "-"){
            data_throws[team_round].push(player);
            // console.log(table[team_round]);
          }
          if(val.Player_team != team && team != "-"){
            team_round++;
            last_point = self.get_last_points(player)
            last_throws[order].push(last_point)
            // console.log(last_thorws,last_point, last_throw, left, order)
            if(order == "home"){
              order = "away"
            }
            else{
              order = "home"
            }
          }
          team = val.Player_team;
          player = {Player__Name: val.Player__Name, first: "-", second: "-", third: "-", fourth: "-", yht: 0, Hka: 0}
        }
        player[throws_order[throw_i]] = val.Throw_points+' ('+-1*val.Kyykkas_left+')';
        if (!isNaN(val.Throw_points)){
          player.yht += Number(val.Throw_points);
        }
        throw_i++;
        player.Hka = Number((player.yht/throw_i).toFixed(2));
      });
      last_point = this.get_last_points(player)
      last_throws["away"].push(last_point)
      // console.log(last_throws)
      // console.log(last_thorws,last_point, last_throw, left, order)
      data_throws[team_round].push(player);
      this.game_throws = data_throws;
      this.last_throws = last_throws;
    },
    get_data(){
      axios
      .get('http://pinq.kapsi.fi/DK/api/data/game/' + this.selected_game)
      .then(response => (this.parse_values(response.data)));
    },
    get_last_points(player){
      var last_point = "-", last_throw = "-", left = "-";
      if(player.fourth != "-"){
        last_point = player.fourth.split(" ");
        last_throw = Number(last_point[0]);
        if(isNaN(last_throw)){
          return last_point[1].slice(1,-1)
        }
        else{
          left = Number(last_point[1].slice(1,-1));
          return left + last_throw
        }

      }
      else if (player.third != "-"){
        last_point = player.third.split(" ");
        last_throw = Number(last_point[0]);
        if(isNaN(last_throw)){
          return last_point[1].slice(1,-1)
        }
        else{
          left = Number(last_point[1].slice(1,-1));
          return left + last_throw
        }

      }
      else{
        return "-"
      }
    }
  },
  watch: {
    selected_game: function () {
      this.get_data();
    },
  }
}
</script>

<style lang="css" scoped>
/deep/ .darker{
  background:#202020;
  border-color: #202020;
}
.card-header, .card-footer {
  min-width: 480px !important;
}
</style>
