<template lang="html">
  <div>
    <highcharts :options="chartOptions"></highcharts>
  </div>
</template>

<script>


  export default {
    props : ["player_hka_stats"],
    data(){
      return {
        data_plot: [],
        chartOptions: {
              chart: {
                  backgroundColor: '#bcd899',
                  type: 'line',
              },
              title: {
                  text: ''
              },
              credits:{enabled:false},
              xAxis: [{
                  //alignTicks: false,
                  title: { text: 'Vuodet' },
                  // tickInterval: 1,

                  // min: -120,
              },
              ],
              legend: {
                        enabled : (window.innerWidth > 768)
              },

              yAxis: [{
                  title: { text: 'Hka' },
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
          }
      }
    },
    methods: {
      parse_values(data) {
        // console.log(data)
        var event_stats = {};
        var data_plot = [];
        var event_colors ={
          "Oamkry/liigacup": "#4caf50",
          "Oamkry/wcok": "#cddc39",
          "Oamkry":"#e5632b",
          "Oamkry/a":"#e5632b",
          "Oamkry/b":"#e5c02b",
          "Oamkry/c":"#ade52b",
          "NKL": "#e52b2b",
          "Kyykkäliiga": "#022ef4",
          "Kyykkäliiga/liiga": "#022ef4",
          "Kyykkäliiga/pulju": "#02f4c8",
          "Kyykkäliiga/divari": "#02a8f4",
        }
        data[0].year = [...new Set(data[0].year)]
        var len = data[0].year.length
        // Get right keys fill them with null
        data[1].hka.map(function(val) {
          // console.log(len)
          // console.log(val)
          if (event_stats[val[0]]  === undefined){
            event_stats[val[0]] = new Array(len).fill(null);
          }
        });       
        // console.log('Eka', event_stats, data[0].year)
        var tik = [-1, 0]; // jotta kaikki tulee x-akselilla oikeeseen paikkaan
        // Set years and result to right column
        data[1].hka.map(function(val) {
          if (tik[1] != val[2]){
            tik[0]++;
            tik[1] = val[2];
          }
          event_stats[val[0]][tik[0]] = val[1];
        });
        // console.log('valissa asetusta', event_stats)
        // Set values to highchart
        Object.keys(event_stats).forEach(key => {
         data_plot.push({
            name: key ,

            color:event_colors[key],
            data:event_stats[key],
          });
       });
        // console.log('ennen asetusta', data_plot)
        this.chartOptions.xAxis = {categories : data[0].year}
        // console.log('pitäisi toimia jo', this.chartOptions.series , data_plot)
        this.chartOptions.series = data_plot
      },
    },
    watch: {
      player_hka_stats: function () {
        // console.log(this.player_hka_stats)
        this.parse_values(this.player_hka_stats)
        // this.data_plot = this.player_hka_stats;
      },
    }
  }
</script>

<style lang="css">
.highcharts-container,  svg { width: 100% !important;}
</style>
