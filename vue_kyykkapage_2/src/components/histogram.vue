<template lang="html">
  <div>
    <highcharts :options="chartOptions"></highcharts>
  </div>
</template>

<script>
require('highcharts-histogram-bellcurve')
  import axios from 'axios'

  export default {
    data(){
      return {
        histogram_plot: [],
        chartOptions: {
              chart: {
                  type: 'histogram',
              },
              title: {
                  text: ''
              },
              credits:{enabled:false},
              xAxis: [{
                  title: { text: '' },
              }, {
                  alignTicks: false,
                  title: { text: 'Oka' },
                  // min: -120,
                  max: 0,
              },
              ],
              // legend: {
              //           enabled : (window.innerWidth > 768)
              // },

              yAxis: [{
                  title: { text: '' },
                  height: '33.33%',
                  offset:0,
                  max: 15,
              }, {
                  title: { text: 'Määrä' },
                  height: '28.33%',
                  top: '38.33%',
                  offset:0,
                  max: 15,
              },{
                  title: { text: '' },
                  height: '28.33%',
                  top: '71.66%',
                  offset:0,
                  max: 15,
              }],
              series: [],
              plotOptions: {
                histogram: {
                    borderRadius: 2,
                    borderColor: '#222846',
                    // binWidth: 10,
                    // binsNumber: 100,
                    // pointStart: -100
                  },
                  series: {
                    binWidth: 10,
                    }
              },
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
        var histogram_plot = [];
        data.map(function(val) {
          if (val[1].startsWith("N") ||  val[1] == "Oamkry/liigacup" || val[1] == "Oamkry/wcok"){
            liig = val[1];
          }
          else if (val[1].startsWith("O")){
            liig = "Oamkry";
          }
          else if (val[1].startsWith("K")){
            liig = "Kyykkäliiga";
          }
          if (event_stats[liig]  === undefined){
            event_stats[liig] = [];
          }
          event_stats[liig].push(val[0]);
         });
      Object.keys(event_stats).forEach(key => {
         event_stats[key].sort();
         if (key == "Oamkry/wcok" || key == "Oamkry/liigacup"){
           histogram_plot.push({
             name: key +" (" + event_stats[key].length + ")",
             type: 'histogram', color:event_colors[key],
             visible: false, xAxis: 1, yAxis: 0,
             baseSeries: key,zIndex: -1,},
             {type: 'scatter',id: key, data:event_stats[key],
             visible: false,showInLegend: false
           });
         }
         else if (key == "Oamkry"){
           histogram_plot.push({name: key +" (" + event_stats[key].length + ")",
              type: 'histogram',
              color:event_colors[key],
              xAxis: 1,
              yAxis: 0,
              baseSeries: key,zIndex: -1,},{type: 'scatter',id: key,
              data:event_stats[key],
              visible: false,
              showInLegend: false
            });
         }
         else if (key == "Kyykkäliiga"){
           histogram_plot.push({name: key +" (" + event_stats[key].length + ")",
              type: 'histogram',
              color:event_colors[key],
              xAxis: 1,
              yAxis: 1,
              baseSeries: key,zIndex: -1,},{type: 'scatter',id: key,
              data:event_stats[key],
              visible: false,
              showInLegend: false
            });
         }
         else {
           histogram_plot.push({name: key +" (" + event_stats[key].length + ")",
              type: 'histogram',
              color:event_colors[key],
              xAxis: 1,
              yAxis: 2,
              baseSeries: key,zIndex: -1,},{type: 'scatter',id: key,
              data:event_stats[key],
              visible: false, showInLegend: false
            });
         }
       });
        this.chartOptions.series = [];
         this.chartOptions.series = histogram_plot;

      },
      get_data() {

        axios
        .get('https://pinq.kapsi.fi/DK/api/data/histogram/' + this.year.value)
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
