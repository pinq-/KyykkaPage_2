<template lang="html">
  <div>
    <highcharts :options="chartOptions"></highcharts>
  </div>
</template>

<script>

  import axios from 'axios'

  export default {
    data(){
      return {
        data_plot: [],
        chartOptions: {
              chart: {
                  type: 'scatter',
                  backgroundColor: '#bcd899',
              },
              title: {
                  text: ''
              },
              credits:{enabled:false},
              xAxis: [{
                  //alignTicks: false,
                  title: { text: 'Ottelujen määrä' },
                  // min: -120,
              },
              ],
              legend: {
                        enabled : (window.innerWidth > 768)
              },

              yAxis: [{
                  title: { text: 'Oka' },
              }],
              series: [],
              tooltip: {
                      headerFormat: '<b>{point.key}</b><br>',
                      pointFormat: '{point.y} Oka, {point.x} O'
                  }
          }
      }
    },
    props:["year"],
    mounted() {
      this.get_data();
    },
    methods: {
      parse_values(data) {
        var event_colors ={
                  "Oamkry/liigacup": "#4caf50",
                  "Oamkry/wcok": "#cddc39",
                  "Oamkry":"#3f51b5",
                  "NKL": "#ff5722",
                  "Kyykkäliiga": "#03a9f4"}
        var liig = "-";
        var event_stats = {};
        var data_plot = [];
        data.map(function(val) {
          if (val[1].startsWith("N")){
            liig = val[1];
          }
          else if (val[1].startsWith("O") && !val[1].includes('w') && !val[1].includes('l')){
            liig = "Oamkry";
          }
          else if (val[1].startsWith("K")){
            liig = "Kyykkäliiga";
          }
          if (event_stats[liig]  === undefined){
            event_stats[liig] = [];
          }
          //console.log(val)
          event_stats[liig].push({y:val[0], x:val[2], name:val[3]});
         });
      Object.keys(event_stats).forEach(key => {
         event_stats[key].sort();
         if (key == "Oamkry"){
           data_plot.push({
              name: key +" (" + event_stats[key].length + ")",
              color:event_colors[key],
              data:event_stats[key],
            });
         }
         else if (key == "Kyykkäliiga"){
           data_plot.push({
              name: key +" (" + event_stats[key].length + ")",
              color:event_colors[key],
              data:event_stats[key],
            });
         }
         else {
           data_plot.push({
              name: key +" (" + event_stats[key].length + ")",
              color:event_colors[key],
              data:event_stats[key],
            });
         }
       });
        this.chartOptions.series = [];
        this.chartOptions.series = data_plot;

      },
      get_data() {

        axios
        .get('https://pinq.kapsi.fi/DK/api/data/plot/' + this.year.value)
        .then(response => (this.parse_values(response.data)));
      }
    },
    watch: {
      year: function () {
        this.get_data();
      },
    }
  }
</script>

<style lang="css">
.highcharts-container,  svg { width: 100% !important;}
</style>
