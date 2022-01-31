<template lang="html">
  <div>
    <highcharts :options="chartOptions"></highcharts>
  </div>
</template>

<script>
  import axios from 'axios'
  import moment from 'moment';

  export default {
    props : ["player_throw_divide_data"],
    data(){
      return {
        chartOptions: {
              chart: {
                  backgroundColor: '#bcd899',
              //     events: {
              //     click: function(event) {
              //       console.log(event)
              //     }
              // }
              },
              title: {
                  text: ''
              },
              credits:{enabled:false},
              xAxis: [{
                  //alignTicks: false,
                  // title: { text: 'Poistetut kyykät' },
                  // categories: [0, 1, 2, 3, 4, 5, 6, 7],
                  // tickInterval: 1,

                  // min: -120,
              },
              ],
              legend: {
                        enabled : (window.innerWidth > 768)
              },

              // yAxis: [{
              //     title: { text: 'Määrä' },
              // }],
              yAxis: [{
                reversed: false,
                title: {
                    text: 'Ottelu tulos'
                },
                height: "60%",
                labels: {
              },
              plotLines: [{
                color: '#e64a19',
                width: 2,
                // value: game_mean
              }],
            },{
                title: {
                    text: 'Lumi (cm)',
                },
                top: "70%",
                height: "20%",
                max: 120,
                offset:0,
            },
            {
                title: {
                    text: 'Lämpötila'
                },
                opposite: true,
                labels: {
                  format: '{value}°C',
            },
                top: "70%",
                height: "20%",
                max: 10,
                min: -35,
            }],
              series: [
              ],
              tooltip: {
                shared: true,
                formatter: function () {
                  // console.log('tama',this.points[2])
                  const header = '<span style="color: blue; font-size:2em; ">' + this.points[1].point.opponent + '</span>  ' + this.points[1].point.time + '<br/>';
                  const header2 = this.points[1].key + ':  <span style="color: ' + this.points[1].color + ';">' + this.points[1].y + '</span><br/>'                  
                  const header3 = this.points[1].point.opponent + ':  <span style="color: ' + this.points[0].color + ';">' + this.points[0].y + '</span><br/>'
                  const header4 = 'Lämpötila:  <span style="color: ' + this.points[2].color + ';">' + this.points[2].y + '°C</span><br/>'
                  const header5 = 'Lumi (cm):  <span style="color: ' + this.points[2].color + ';">' + this.points[3].y + ' cm</span><br/>'
                  return header + header2 + header3 + header4 + header5
                }//'Oka: {point.y}, Ottelut: {point.x}'
              },
              plotOptions: {
                      series: {
                          label: {
                              connectorAllowed: false
                          },
                          // cursor: 'pointer',
                        //   point: {
                        //     events: {
                        //       click: function () {
                        //         // this.Cliked(this);
                        //         app.$options.methods.Cliked(this);

                        //     },
                        //   },
                        // },
                      },
                      column: {
                        // stacking: 'normal',
                        grouping: false,
                        shadow: false,
                        borderWidth: 0
                      },
                  },
          }
      }
    },
    mounted() {
      this.get_data();
    },
    methods: {
      parse_values(data) {
        // console.log(data)
        let home_games = []
        let away_games = []
        let wheter_temp = []
        let wheter_snow = []
        data.forEach((value) => {
          let h_game = {name:this.$store.state.team_name_short,  time:0, y:0 ,color : '-', opponent: '-', id: 0}
          let a_game = {y:0 ,color : 'rgba(112,112,112, 0.5)'}
          if(value.Home_team__Team__Sort_name == this.$store.state.team_name_short){
              if (value.Home_result > value.Away_result){
                h_game['color'] = "#A7EE50";
              }
              else if(value.Home_result < value.Away_result){
                h_game['color'] = "#ef5350";
              }else{
                h_game['color'] = "#707070";
              }
              h_game['y'] = value.Home_result;
              a_game['y'] = value.Away_result;
              h_game['opponent'] = value.Away_team__Team__Sort_name;
          }
          else if(value.Away_team__Team__Sort_name == this.$store.state.team_name_short){
              if (value.Home_result < value.Away_result){
                h_game['color'] = "#A7EE50";
              }
              else if(value.Home_result > value.Away_result){
                h_game['color'] = "#ef5350";
              }else{
                h_game['color'] = "#707070";
              }
              h_game['opponent'] = value.Home_team__Team__Sort_name;
              h_game['y'] = value.Away_result;
              a_game['y'] = value.Home_result;
          }
          h_game['time'] = moment.utc(value.Game_time).format('DD.MM');
          h_game['id'] = value.id;
          home_games.push(h_game);
          away_games.push(a_game);
          wheter_temp.push(value.Game_weather__Temp_day);
          wheter_snow.push(value.Game_weather__Snow_deph);
        });
        this.chartOptions.series = [
        {
          type: 'column',
          name: 'toiset',
          data:away_games,
          pointPadding: 0.2,
          yAxis:0,

          },
        { 
          type: 'column',
          name: 'pelit',
          data:home_games,
          pointPadding: 0.3,
          yAxis:0,
        },        
        { 
          type: 'spline',
          name: 'Lämpötila',
          data:wheter_temp,
          pointPadding: 0.3,
          yAxis:2,
          color:'#0277bd',
        },        
        { 
          type: 'column',
          name: 'Lumen syvyys',
          data:wheter_snow,
          pointPadding: 0.3,
          yAxis:1,
          color:'#1eb0e6',
        },

        ]
  
      },
      Cliked: function(items) {
        this.$store.state.game_id = items.id;
        this.$store.state.game_modal *= -1;
        this.$bvModal.show("modal-1")
      },
      get_data(){
        axios
        .get('https://pinq.kapsi.fi/DK/api/data/games/' + this.$store.state.team_id)
        .then(response => (this.parse_values(response.data)));
      },
    },
    watch: {
      '$store.state.team_id': function () {
        this.get_data();
      },
    }
  }
</script>

<style lang="css">
/*.highcharts-container,  svg { width: 100% !important;}*/
</style>
