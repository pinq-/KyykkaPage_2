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
        // console.log(data[1].hka)
        this.chartOptions.xAxis = {categories : data[0].year}
        this.chartOptions.series = {
          name: 'Hka',
          data: data[1].hka
        }

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
