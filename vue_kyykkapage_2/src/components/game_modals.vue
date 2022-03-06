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
              <span style=" color:#E0D338;" @click="Team_selected(true)">
                {{result.Home_team_name}}
              </span>
              <span class="text-light">
                vs.
              </span>
              <span style=" color:#E0D338;" @click="Team_selected(false)">
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
                <h4 class="mb-0" @click="Team_selected(true)"> {{ result.Home_team_name }} </h4>
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
                <h4 class="mb-0" @click="Team_selected(false)"> {{ result.Away_team_name }} </h4>
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
          <b-col>
            <h2 class="text-light">Toinen erä</h2>
          </b-col>
        </b-row>
        <b-row>
          <b-col class = "mt-4">
            <b-card no-body class="font-weight-bold theme2" :header=result.Home_team_name :footer-bg-variant = "result.Home_round2 > result.Away_round2 ? 'success': 'danger'">
              <template #header>
                <h4 class="mb-0" @click="Team_selected(true)"> {{ result.Home_team_name }} </h4>
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
                <h4 class="mb-0" @click="Team_selected(false)"> {{ result.Away_team_name }} </h4>
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
          <b-col>
            <highcharts :options="chartOptions_home"></highcharts>
          </b-col>
          <b-col>
            <highcharts :options="chartOptions_away"></highcharts>
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
        { key: "Player__Name", label: "Nimi"},
        { key: "first", label: "1."},
        { key: "second", label: "2." },
        { key: "third", label: "3."},
        { key: "fourth", label: "4."},
        { key: "yht", label: "yht."},
        { key: "Hka", label: "Hka."},
      ],
      chartOptions_home: {
        chart: {
    backgroundColor: null,
      },
          title: {
              text: 'Poistot',
              align: 'center',
              verticalAlign: 'middle',
              style: {
                  color: 'white'
              },
              y: 60
          },
          credits:{enabled:false},
          tooltip: {
              pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
          },
          accessibility: {
              point: {
                  valueSuffix: '%'
              }
          },
          plotOptions: {
              pie: {
                  dataLabels: {
                      enabled: true,
                      distance: -50,
                      style: {
                          fontWeight: 'bold',
                          // color: 'white'
                      }
                  },
                  startAngle: -90,
                  endAngle: 90,
                  center: ['50%', '75%'],
                  size: '110%'
              }
          },
          series: [{
              type: 'pie',
              name: 'Osuus heitoista',
              innerSize: '50%',
              data: []
          }]
      },
      chartOptions_away: {
        chart: {
    backgroundColor: null,
      },
          title: {
              text: 'Poistot',
              align: 'center',
              verticalAlign: 'middle',
              style: {
                  color: 'white'
              },
              y: 60
          },
          credits:{enabled:false},
          tooltip: {
              pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
          },
          accessibility: {
              point: {
                  valueSuffix: '%'
              }
          },
          plotOptions: {
              pie: {
                  dataLabels: {
                      enabled: true,
                      distance: -50,
                      style: {
                          fontWeight: 'bold',
                          // color: 'white'
                      }
                  },
                  startAngle: -90,
                  endAngle: 90,
                  center: ['50%', '75%'],
                  size: '110%'
              }
          },
          series: [{
              type: 'pie',
              name: 'Osuus heitoista',
              innerSize: '50%',
              data: []
          }]
      }
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
      data_throws = [[], [], [], []], 
      last_throws = {home: [], away: []}, 
      teams_hka = {home: [], away: []};
      var team = "-", 
      last_point = "-",
      order = "home";
      var team_round = 0, 
      throw_n = 0, 
      throwP = 0;
      var player = {Player__Name: "-", first: "-", first_left: 0, second: "-", second_left: 0, third: "-", third_left: 0, fourth: "-", fourth_left: 0, yht: 0, Hka: 0, id: 0};
      var self = this;
      var throw_names ={home: [["Hauki", 0],["Virkamies", 0],["2", 0], ["4", 0], ["6", 0], ["8", 0], ["10", 0],["12", 0], [">12", 0]], away: [["Hauki", 0],["Virkamies", 0],["2", 0], ["4", 0], ["6", 0], ["8", 0], ["10", 0],["12", 0], [">12", 0]]};

      throws.forEach(function(val){ // Set all the throws to one player object
        // console.log(val)
        // When the player changes in the json list
        if(player.Player__Name != val.Player__Name){
          //Throw order
          throw_n = 0
          // When it is not the first time
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
          player = {Player__Name: val.Player__Name, first: "-", first_left: 0, second: "-", second_left: 0, third: "-", third_left: 0, fourth: "-", fourth_left: 0, yht: 0, Hka: 0, id: val.Player_id};
        }
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
          if(throwP < 7 && throwP > -1){
            throw_names[order][throwP + 1][1]++;
          }
          else{
            throw_names[order][8][1]++;

          }
        }
        else{
          if(val.Throw_points == "h"){
            throw_names[order][0][1]++;
          }
          teams_hka[order].push(0)

        }
        throw_n++;
        player.Hka = (player.yht / throw_n).toFixed(2);
      });
      last_point = this.get_last_points(player)
      last_throws["away"].push(last_point)
      this.chartOptions_home.series[0].data = throw_names["home"];
      this.chartOptions_away.series[0].data = throw_names["away"];
      // console.log(last_thorws,last_point, last_throw, left, order)
      data_throws[team_round].push(player);
      this.game_throws = data_throws;
      this.last_throws = last_throws;
      this.result.Home_hka = (teams_hka["home"].reduce((a, b) => a + b, 0)/teams_hka["home"].length).toFixed(2);
      this.result.Away_hka = (teams_hka["away"].reduce((a, b) => a + b, 0)/teams_hka["away"].length).toFixed(2);
    },
    get_data(){
      axios
      .get('https://pinq.kapsi.fi/DK/api/data/game/' + this.selected_game)
      .then(response => (this.parse_values(response.data)));
    },
    get_last_points(player){

      if(player.fourth != "-"){
        if (player.fourth == "h"){
          return -1 * player.fourth_left
        }else{
          return -1 * (player.fourth_left - player.fourth)
        }
      }
      else if (player.third != "-"){
        if (player.third == "h"){
          return -1 * player.third_left
        }else{
          return -1 * ( player.third_left - player.third)
        }

      }
      else{
        return "+"
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
.card-header, .card-footer {
  /*min-width: 440px !important;*/
}
</style>
