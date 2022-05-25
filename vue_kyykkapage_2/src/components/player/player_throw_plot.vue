<template lang="html">
  <div>
    <highcharts :options="chartOptions"></highcharts>
  </div>
</template>

<script>


  export default {
    props : ["player_throw_divide_data"],
    data(){
      return {
        chartOptions: {
              chart: {
                  backgroundColor: '#F8CB2E',
                  type: 'column',
              },
              title: {
                  text: ''
              },
              credits:{enabled:false},
              xAxis: [{
                  //alignTicks: false,
                  title: { text: 'Poistetut kyykät' },
                  categories: [0, 1, 2, 3, 4, 5, 6, 7],
                  // tickInterval: 1,

                  // min: -120,
              },
              ],
              legend: {
                        enabled : (window.innerWidth > 768)
              },

              yAxis: [{
                  title: { text: 'Määrä' },
              }],
              series: [
              ],
              tooltip: {
                headerFormat: '<b>{series.name}</b><br>',
                pointFormat: '{point.y} kpl {point.x} kyykän poistoja'
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
        // console.log(data[0])
        this.chartOptions.series = [{
          name: 'Aloitusheitot',
          data: data[0],
          color: '#2b7fe0'
        },{
          name: '>40 jäljellä',
          data: data[1],
          color: '#dae02b'
        },{
          name: '<40 jäljellä',
          data: data[2],
          color: '#e0322b'
        }

        ]
  
      },
    },
    watch: {
      player_throw_divide_data: function () {
        // console.log(this.player_throw_divide_data)
        this.parse_values(this.player_throw_divide_data)
      },
    }
  }
</script>

<style lang="css">
/*.highcharts-container,  svg { width: 100% !important;}*/
</style>
