<template lang="html">
  <div>
    <highcharts :options="chartOptions"></highcharts>
  </div>
</template>

<script>


  export default {
    props : ["team_Oka_stats"],
    data(){
      return {
        data_plot: [],
        chartOptions: {
              chart: {
                  backgroundColor: '#F8CB2E',
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
                        enabled : false
              },

              yAxis: [{
                  title: { text: 'Oka' },
              }],
              series: [
              ],
              tooltip: {
                pointFormat: 'Oka {point.y}'
              },
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
        this.chartOptions.xAxis = {categories : data[0]}
        // console.log('pitäisi toimia jo', this.chartOptions.series , data_plot)
        this.chartOptions.series = {
          data: data[1],
          color: '#e52b2b'
        }
      },
    },
    watch: {
      team_Oka_stats: function () {
        // console.log(this.team_Oka_stats)
        this.parse_values(this.team_Oka_stats)
      },
    }
  }
</script>

<style lang="css">
.highcharts-container,  svg { width: 100% !important;}
</style>
