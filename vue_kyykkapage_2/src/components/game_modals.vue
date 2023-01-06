<template lang="html">
  <div>
    <b-modal id="modal-1" size="huge" body-bg-variant="dark" header-class="darker" footer-class="darker">
      <template #modal-header="{ close }">
        <b-container fluid >
          <b-row class="justify-content-md-center font-weight-bold text-center" style="font-size: 1.6rem;">
            <b-col lg='1' md="auto" class="rounded" :class="{'bg-success': result.Home_result > result.Away_result, 'bg-danger': result.Home_result < result.Away_result, 'bg-secondary': result.Home_result == result.Away_result}">
              {{result.Home_result}}
            </b-col>
            <b-col style="font-size: 2.25rem;" md="auto">
              <span class = 'Glowing_name' style=" color:#E0D338;" @click="Team_selected(true)">
                {{result.Home_team_name}}
              </span>
              <span class="text-light">
                vs.
              </span>
              <span class = 'Glowing_name' style=" color:#E0D338;" @click="Team_selected(false)">
                {{result.Away_team_name}}
              </span>
            </b-col>
            <b-col md="auto" class="rounded" :class="{'bg-success': result.Home_result < result.Away_result, 'bg-danger': result.Home_result > result.Away_result, 'bg-secondary': result.Home_result == result.Away_result}">
              {{result.Away_result}}
            </b-col>
          </b-row>
          <b-row>
            <b-col style="font-size: 1.25rem;"  class="text-light text-center">
                {{result.Game_time}}
            </b-col>
          </b-row>
        </b-container>
        <b-button size="sm" @click="close()">
          X
        </b-button>
      </template>
      <b-container fluid class="text-center">
        <b-row class="justify-content-md-center">
          <b-col lg="8" md="auto" >
             <b-card class="font-weight-bold m-2 theme2"  no-body>
            <b-table responsive small v-b-tooltip striped :items="[result]" :fields="fields_info" class="font-weight-bold text-light">
            </b-table>
          </b-card>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <h2 class="text-light">Ensimmäinen erä</h2>
          </b-col>
        </b-row>
        <b-row>
          <b-col class = "mt-4">
            <b-card no-body class="font-weight-bold theme2" :footer-bg-variant = "result.Home_round1 > result.Away_round1 ? 'success': 'danger'">
              <template #header>
                <h3 class="m-0 Glowing_name" @click="Team_selected(true)"> {{ result.Home_team_name }} </h3>
              </template>
              <b-table responsive v-b-tooltip striped hover :items="game_throws[0]" :fields="fields" class="font-weight-bold" @row-clicked="Player_selected">
                <template #cell(first)="data">
                  {{data.item.first}}
                  <span style="font-size: 0.7rem; color:grey">/{{data.item.first_left}}</span>
                </template>
                <template #cell(second)="data">
                  {{data.item.second}}
                  <span style="font-size: 0.7rem; color:grey">/{{data.item.second_left}}</span>
                </template>
                <template #cell(third)="data">
                  {{data.item.third}}
                  <span style="font-size: 0.7rem; color:grey">/{{data.item.third_left}}</span>
                </template>              
                <template #cell(fourth)="data">
                  {{data.item.fourth}}
                  <span style="font-size: 0.7rem; color:grey">/{{data.item.fourth_left}}</span>
                </template>
              </b-table>
              <template #footer>
                <em >{{result.Home_round1}} ({{last_throws.home[0]}})</em>
              </template>
            </b-card>
          </b-col>
          <b-col class = "mt-4">
            <b-card no-body class="font-weight-bold theme2" :footer-bg-variant = "result.Home_round1 < result.Away_round1 ? 'success': 'danger'">
              <template #header>
                <h3 class="m-0 Glowing_name" @click="Team_selected(false)"> {{ result.Away_team_name }} </h3>
              </template>
              <b-table responsive v-b-tooltip striped hover :items="game_throws[1]" :fields="fields" class="font-weight-bold" @row-clicked="Player_selected">
                <template #cell(first)="data">
                  {{data.item.first}}
                  <span style="font-size: 0.7rem; color:grey">/{{data.item.first_left}}</span>
                </template>
                <template #cell(second)="data">
                  {{data.item.second}}
                  <span style="font-size: 0.7rem; color:grey">/{{data.item.second_left}}</span>
                </template>
                <template #cell(third)="data">
                  {{data.item.third}}
                  <span style="font-size: 0.7rem; color:grey">/{{data.item.third_left}}</span>
                </template>              
                <template #cell(fourth)="data">
                  {{data.item.fourth}}
                  <span style="font-size: 0.7rem; color:grey">/{{data.item.fourth_left}}</span>
                </template>
              </b-table>
              <template #footer>
                <em>{{result.Away_round1}} ({{last_throws.away[0]}})</em>
              </template>
            </b-card>
          </b-col>
        </b-row>
        <b-row>
          <b-col class = 'm-4'>
            <highcharts :options="chartOptions_first"></highcharts>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <h2 class="text-light">Toinen erä</h2>
          </b-col>
        </b-row>
        <b-row>
          <b-col class = "mt-4">
            <b-card no-body class="font-weight-bold theme2" :header=result.Home_team_name :footer-bg-variant = "result.Home_round2 > result.Away_round2 ? 'success': 'danger'">
              <template #header>
                <h3 class="m-0 Glowing_name" @click="Team_selected(true)"> {{ result.Home_team_name }} </h3>
              </template>
              <b-table responsive v-b-tooltip striped hover :items="game_throws[2]" :fields="fields" class="font-weight-bold" @row-clicked="Player_selected">
                <template #cell(first)="data">
                  {{data.item.first}}
                  <span style="font-size: 0.7rem; color:grey">/{{data.item.first_left}}</span>
                </template>
                <template #cell(second)="data">
                  {{data.item.second}}
                  <span style="font-size: 0.7rem; color:grey">/{{data.item.second_left}}</span>
                </template>
                <template #cell(third)="data">
                  {{data.item.third}}
                  <span style="font-size: 0.7rem; color:grey">/{{data.item.third_left}}</span>
                </template>              
                <template #cell(fourth)="data">
                  {{data.item.fourth}}
                  <span style="font-size: 0.7rem; color:grey">/{{data.item.fourth_left}}</span>
                </template>
              </b-table>
              <template #footer>
                <em>{{result.Home_round2}} ({{last_throws.home[1]}})</em>
              </template>
            </b-card>
          </b-col>
          <b-col class = "mt-4">
            <b-card no-body class="font-weight-bold theme2" :header=result.Away_team_name :footer-bg-variant = "result.Home_round2 < result.Away_round2 ? 'success': 'danger'">
              <template #header>
                <h3 class="m-0 Glowing_name" @click="Team_selected(false)"> {{ result.Away_team_name }} </h3>
              </template>
              <b-table responsive v-b-tooltip striped hover :items="game_throws[3]" :fields="fields" class="font-weight-bold" @row-clicked="Player_selected">
                <template #cell(first)="data">
                  {{data.item.first}}
                  <span style="font-size: 0.7rem; color:grey">/{{data.item.first_left}}</span>
                </template>
                <template #cell(second)="data">
                  {{data.item.second}}
                  <span style="font-size: 0.7rem; color:grey">/{{data.item.second_left}}</span>
                </template>
                <template #cell(third)="data">
                  {{data.item.third}}
                  <span style="font-size: 0.7rem; color:grey">/{{data.item.third_left}}</span>
                </template>              
                <template #cell(fourth)="data">
                  {{data.item.fourth}}
                  <span style="font-size: 0.7rem; color:grey">/{{data.item.fourth_left}}</span>
                </template>
              </b-table>
              <template #footer>
                <em>{{result.Away_round2}} ({{last_throws.away[1]}})</em>
              </template>
            </b-card>
          </b-col>
        </b-row>
        <b-row>
          <b-col class = ' m-4'>
            <highcharts :options="chartOptions_second"></highcharts>
          </b-col>
        </b-row>
      </b-container>
    </b-modal>

  </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment';

export default {
  data(){
    return {
      selected_game: 0,
      game_throws: [[],[],[],[]],
      result: [],
      last_throws:{home: [0,0], away: [0,0]},
      fields: [
        { key: "Name", label: "Nimi"},
        { key: "first", label: "1."},
        { key: "second", label: "2." },
        { key: "third", label: "3."},
        { key: "fourth", label: "4."},
        { key: "yht", label: "yht."},
        { key: "Hka", label: "Hka."},
      ],
      chartOptions_first: {
        chart: {
            backgroundColor: '#F8CB2E',
            type: 'line',

        },
        title: {
            text: 'Ensimmäisen erän kulku'
        },
        credits:{enabled:false},
        xAxis: [{
            title: { text: 'Heitot' },
        },
        ],

        yAxis: [{
            title: { text: 'Pisteet' },
        }],
        series: [
        ],
        plotOptions: {
                series: {
                    label: {
                        connectorAllowed: false
                    },
                }
            },
    },      
    chartOptions_second: {
        chart: {
            backgroundColor: '#F8CB2E',
            type: 'line',

        },
        title: {
            text: 'Toisen erän kulku'
        },
        credits:{enabled:false},
        xAxis: [{
            title: { text: 'Heitot' },
        },
        ],

        yAxis: [{
            title: { text: 'Pisteet' },
        }],
        series: [
        ],
        plotOptions: {
                series: {
                    label: {
                        connectorAllowed: false
                    },
                }
            },
    },
    }
  },
  methods: {
    parse_values(data) {
      // console.log(data.Results[0])
      this.result = data.Results[0];
      this.result.Game_time = moment.utc(this.result.Game_time).format('HH:mm DD.MM.YY')
      this.result.max_heitto = 0
      this.result.Home_hka = 0
      this.result.Away_hka = 0
      this.parse_throw(data.Throws)
    },
    parse_throw(throws){
      var throws_order = ["first", "second", "third", "fourth"], 
      left_order = ["first_left", "second_left", "third_left", "fourth_left"], 
      player_data_throws = [[], [], [], []], 
      data_throws = [new Array(17).fill(0), new Array(17).fill(0), new Array(17).fill(0), new Array(17).fill(0)], // For plot
      throw_order_index = 0,
      last_throws = {home: [], away: []}, 
      teams_hka = {home: [], away: []};
      var team = "-",
      team_away = "-", // For plot text
      team_home = "-", // For plot text
      last_point = "-",
      order = "home";
      var team_round = 0, 
      throw_n = 0, 
      throwP = 0;
      var player = {Name: "-", first: "-", first_left: 0, second: "-", second_left: 0, third: "-", third_left: 0, fourth: "-", fourth_left: 0, yht: 0, Hka: 0, id: 0};
      var self = this;
      throws.forEach(function(val){ // Set all the throws to one player object
        // console.log(val)
        // When the player changes in the json list
        if(player.Name != val.Name){
          //Throw order
          throw_n = 0
          // When it is not the first time
          if(player.Name != "-"){
            player_data_throws[team_round].push(player);
            // console.log(table[team_round]);
          }
          if(val.Player_team != team && team != "-"){
            last_point = self.get_last_points(player, throw_order_index)
            // console.log(last_point)
            if (last_point < 0){
              data_throws[team_round][throw_order_index] = Math.abs(last_point)
            }
            throw_order_index = 0
            // if (data_throws[team_round].length < 17){
            //   while(data_throws[team_round].length < 17){
            //     data_throws[team_round].push(0)
            //   }
            // }
            // console.log(data_throws)
            data_throws[team_round].sort(function(a, b){return b - a});
            team_round++;
            last_throws[order].push(last_point)
            // console.log(last_thorws,last_point, last_throw, left, order)
            if(order == "home"){
              order = "away"
              team_away = val.Player_team;
            }
            else{
              order = "home"
              team_home = val.Player_team;
            }
          }
          team = val.Player_team;
          player = {Name: val.Name, first: "-", first_left: 0, second: "-", second_left: 0, third: "-", third_left: 0, fourth: "-", fourth_left: 0, yht: 0, Hka: 0, id: val.Player_id};
        }
        // console.log(data_throws[team_round], team_round, val['Kyykkas_left'])
        data_throws[team_round][throw_order_index] = val['Kyykkas_left'] // Add game points to plot line
        throw_order_index ++;
        player[throws_order[throw_n]] = val.Throw_points;
        player[left_order[throw_n]] = val.Kyykkas_left;
        if (!isNaN(val.Throw_points)){
          throwP = Number(val.Throw_points);
          player.yht += throwP;
          if(throwP > self.result.max_heitto){
            self.result.max_heitto = throwP
          }
          teams_hka[order].push(throwP)
          throwP = Math.floor(throwP/2);
        }
        else{
          teams_hka[order].push(0)

        }
        throw_n++;
        player.Hka = (player.yht / throw_n).toFixed(1);
      });
      last_point = this.get_last_points(player, throw_order_index)
      if (last_point < 0){
              data_throws[team_round][throw_order_index] = Math.abs(last_point)
            }
      data_throws[team_round].sort(function(a, b){return b - a});
      // console.log(data_throws)
      this.chartOptions_first.series = [{
          name: team_home,
          data: data_throws[0],
        },{
          name: team_away,
          data: data_throws[1],
        }]      
      this.chartOptions_second.series = [{
          name: team_home,
          data: data_throws[2],
        },{
          name: team_away,
          data: data_throws[3],
        }]
      last_throws["away"].push(last_point)
      // console.log(last_thorws,last_point, last_throw, left, order)
      player_data_throws[team_round].push(player);
      this.game_throws = player_data_throws;
      this.last_throws = last_throws;
      this.result.Home_hka = (teams_hka["home"].reduce((a, b) => a + b, 0)/teams_hka["home"].length).toFixed(2);
      this.result.Away_hka = (teams_hka["away"].reduce((a, b) => a + b, 0)/teams_hka["away"].length).toFixed(2);
    },
    get_data(){
      axios
      .get('https://pinq.kapsi.fi/DK/api/data/game/' + this.selected_game)
      .then(response => (this.parse_values(response.data)));
    },
    get_last_points(player, order){

      if(player.fourth != "-"){ // If there was still points
        if (player.fourth == "h"){
          return -1 * player.fourth_left
        }else{
          return -1 * (player.fourth_left - player.fourth) // subtract last throw points from last left points
        }
      }
      else if (player.third != "-"){
        return 1
      }
      else{ // If there is more than two trows left
        // console.log('viimeinen', order)
        return 16 - order
      }
    },
    Player_selected(items) {
      this.$bvModal.hide("modal-1")
      this.$router.push({ name: 'Player_data', params: { id : items.id}}).catch(()=>{});
    },    
    Team_selected(items) {
      if (items){
        this.$router.push({ name: 'Team_data', params: { id : this.result.Home_team_id}})
      }
      else{
        this.$router.push({ name: 'Team_data', params: { id : this.result.Away_team_id}})
      }
      // this.$bvModal.hide("modal-1")
      // this.$router.push({ name: 'Player_data', params: { id : items.id}}).catch(()=>{});
    },
  },
  watch: {
    '$store.state.game_modal': function () {
      // console.log('modal',this.$store.state.player_id)
      this.selected_game = this.$store.state.game_id
      this.get_data();
    },
  },
  computed: {
  fields_info () {
    return [
      { key: "Home_hka", label: this.result.Home_team_name + " Hka."},
      { key: "Away_hka", label: this.result.Away_team_name + " Hka."},
      { key: "max_heitto", label: "Paras heitto"},
      { key: "Game_weather__Snow_deph", label: "Lumen syvyys"},
      { key: "Game_weather__Temp_day", label: "°C"},
    ]
  }
}
}
</script>

<style lang="css" scoped>
/deep/ .darker{
  background:#202020;
  border-color: #202020;
}

.Glowing_name:hover {
  text-shadow:1px 1px #006E7F,
            2px 2px #006E7F,
            3px 3px #006E7F,
            4px 4px #006E7F,
            5px 5px #006E7F !important;
}

.Glowing_name {
  cursor: pointer;
  text-shadow: 0px 0px !important;
  font-weight: bold;
  transition: text-shadow 0.1s ease-out 100ms
}
</style>
