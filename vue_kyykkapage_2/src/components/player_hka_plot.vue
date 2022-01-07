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
              },
              title: {
                  text: ''
              },
              credits:{enabled:false},
              xAxis: [{
                  //alignTicks: false,
                  title: { text: 'Vuodet' },
                  tickInterval: 1,

                  // min: -120,
              },
              ],
              legend: {
                        enabled : (window.innerWidth > 768)
              },

              yAxis: [{
                  title: { text: 'Oka' },
              }],
              series: [
              ],
              plotOptions: {
                      series: {
                          label: {
                              connectorAllowed: false
                          },
                          pointStart: 2010
                      }
                  },
          }
      }
    },
    methods: {
      parse_values(data) {
        this.chartOptions.plotOptions.series.pointStart = data[data.length - 1];
        // this.chartOptions.series = data.slice(0,-1);
        this.chartOptions.series = {
          name: 'Hka',
          data: data.slice(0,-1)
        }

      },
    },
    watch: {
      player_hka_stats: function () {
        this.parse_values(this.player_hka_stats)
        // this.data_plot = this.player_hka_stats;
      },
    }
  }
</script>

<style lang="css">
.highcharts-container,  svg { width: 100% !important;}
</style>
