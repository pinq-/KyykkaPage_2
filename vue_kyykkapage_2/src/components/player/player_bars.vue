<template lang="html">
  <div>
    <b-container class="bv-example-row">
      <b-row>
        <b-col>
            Heittokeskiarvo: {{ hka }} p
        </b-col>
      </b-row>     
      <b-row>
        <b-col>
            <svg class="progressbar" viewBox="10 0 340 30">
              <rect v-for='index in bar_size' :key='index' width="15" height="25" :x = 'index * 18' :fill = "getColor_hka(index, 0)" stroke= "rgb(10,10,10)"/>
            </svg>
        <b-button v-if= 'myToggle' v-b-toggle.collapse-1 :pressed.sync="myToggle" variant="primary" >▼</b-button>        
        <b-button v-if= 'myToggle == false' v-b-toggle.collapse-1 :pressed.sync="myToggle" variant="primary" >▲</b-button>
        </b-col>
      </b-row>
      <b-row>
        <b-collapse id="collapse-1">
          <b-row class='m-0'>
            <b-col>
              {{ throws[0] }}
            </b-col>
          </b-row>
          <b-row class='m-0'>
            <b-col sm='1' class='mr-0 p-0'>
              1.
            </b-col>
            <b-col >
            <svg class="progressbar" viewBox="10 0 340 30">
              <rect v-for='index in bar_size' :key='index' width="15" height="25" :x = 'index * 18' :fill = "getColor_hka(index, 1)" stroke= "rgb(10,10,10)"/>
            </svg>
            </b-col>
          </b-row>
          <b-row class='m-0'>
            <b-col>
              {{ throws[1] }}
            </b-col>
          </b-row>
          <b-row class='m-0'>
            <b-col sm='1' class='mr-0 p-0'>
              2.
            </b-col>
            <b-col >
            <svg class="progressbar" viewBox="10 0 340 30">
              <rect v-for='index in bar_size' :key='index' width="15" height="25" :x = 'index * 18' :fill = "getColor_hka(index, 2)" stroke= "rgb(10,10,10)"/>
            </svg>
            </b-col>
          </b-row>
          <b-row class='m-0'>
            <b-col>
              {{ throws[2] }}
            </b-col>
          </b-row>
          <b-row class='m-0'>
            <b-col sm='1' class='mr-0 p-0'>
              3.
            </b-col>
            <b-col >
            <svg class="progressbar" viewBox="10 0 340 30">
              <rect v-for='index in bar_size' :key='index' width="15" height="25" :x = 'index * 18' :fill = "getColor_hka(index, 3)" stroke= "rgb(10,10,10)"/>
            </svg>
            </b-col>
          </b-row>
          <b-row class='m-0'>
            <b-col>
              {{ throws[3] }}
            </b-col>
          </b-row>
          <b-row class='m-0'>
            <b-col sm='1' class='mr-0 p-0'>
                4.
            </b-col>
            <b-col >
            <svg class="progressbar" viewBox="10 0 340 30">
              <rect v-for='index in bar_size' :key='index' width="15" height="25" :x = 'index * 18' :fill = "getColor_hka(index, 4)" stroke= "rgb(10,10,10)"/>
            </svg>
            </b-col>
          </b-row>
        </b-collapse>
      </b-row>
      <b-row>
        <b-col>
            Nolla & H: <strong>{{ nolla }}</strong> %
            <svg class="progressbar" viewBox="10 0 340 30">
              <rect v-for='index in bar_size' :key='index' width="15" height="25" :x = 'index * 18' :fill = "getColor_zero(index)" stroke= "rgb(10,10,10)"/>
            </svg>
        </b-col>
      </b-row>    
      <b-row>
        <b-col>
          <span class='hauki_pro'>
            <svg class="hauki" viewBox="0 0 110 30">
              <defs>
                <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" style="stop-color:#0f6317ff;stop-opacity:1" />
                  <stop :offset="hauki_pro" style="stop-color:#0f6317ff;stop-opacity:1" />
                  <stop :offset="hauki_pro" style="stop-color:white;stop-opacity:1" />
                  <stop offset="100%" style="stop-color:white;stop-opacity:1" />
                </linearGradient>
              </defs>
              <path d="m3.7881 24.46 1.8535-4.954-2.7453-2.5657c-1.5099-1.4111-2.7453-3.3892-2.7453-4.3958 0-1.659 0.34931-1.7751 3.7376-1.2417 10.415 1.6396 14.417 1.6479 16.878 0.0352l2.4204-1.5859-2.9438-1.3865c-1.9397-0.91358-3.0473-2.1179-3.2472-3.531-0.62577-4.4235 5.6054-5.856 11.569-2.6597 2.8958 1.5521 3.8019 1.6535 7.0224 0.78583 2.0337-0.54791 9.4359-1.0185 16.449-1.0458 19.212-0.0748 28.939 2.6884 42.752 12.145 3.1432 2.152 6.6823 4.1554 7.8645 4.4521 2.4203 0.60747 2.6412 1.2259 1.0502 2.9406-0.89737 0.96714-0.8166 1.0853 0.43971 0.6432 0.84645-0.29784 1.539-0.20226 1.539 0.21241 0 2.0511-16.348 1.61-25.728-0.6942-3.5803-0.8795-3.652-0.83586-4.5075 2.7432-0.74428 3.1139-2.9735 3.119-3.7541 9e-3 -1.0264-4.0898-2.2394-4.6258-10.469-4.6258h-7.6479l0.45231 2.4184c0.24877 1.3301 0.18506 3.1368-0.14157 4.0148-0.56147 1.5093-0.68279 1.4981-2.2246-0.20563-1.1353-1.2545-2.2613-1.6438-3.7059-1.2812-1.5118 0.37944-2.0751 0.15092-2.0751-0.84174 0-0.74942 0.39574-1.6072 0.87943-1.9061 0.48368-0.29894 0.87942-1.1138 0.87942-1.8108 0-0.98485-1.397-1.2672-6.2693-1.2672-5.9296 0-6.4538 0.16674-9.6762 3.078-3.6382 3.2869-6.0602 3.854-7.7524 1.8151-0.76307-0.91944-0.79236-1.7409-0.10768-3.0202 1.3015-2.4319 1.2011-2.7523-0.86207-2.7523-2.6011 0-6.6723 2.3-12.69 7.1687-2.8983 2.3451-5.9624 4.2639-6.809 4.2639-1.429 0-1.4065-0.35507 0.31415-4.954z" :fill="fill"/>
               <text x="50%" y="40%" dominant-baseline="middle" text-anchor="middle" class = 'Rrrrr'>{{ hauki_pro }}</text>  
            </svg>
        </span>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>


<script>

  export default {
    props:["player_data"],
    data(){
      return {
        items: [],
        fill: "url('#grad1')",
        hauki_pro : "0%",
        hka: 0,
        nolla: 0,
        bar_size: 18,
        hka_max: 8.5,
        throws: [0, 0, 0, 0],
        myToggle: true,
      }
    },
    mounted() {
    },
    methods: {
      getColor_hka(index, val){
        let hka = 0
        if (val == 0){
          hka = this.hka
        }else{
          // console.log(this.throws[val - 1], val)
          if (this.throws[val - 1] == '0'){
            hka = 0
          }else{
            hka = Number(this.throws[val - 1].split(" ", 1)[0]);
          }
        }
        if (index < hka / this.hka_max * this.bar_size){
          // console.log(index,this.hka)
          return 'rgb(' + (255 - (Math.floor(index / ((this.bar_size / 2) + 1)) * (index - (this.bar_size / 2)) / (this.bar_size / 2) * 255 )) + ',' + (index / (this.bar_size / 2) * Math.floor((this.bar_size - index) / (this.bar_size / 2)) * 255 + 255 * Math.floor(index / ((this.bar_size / 2) + 1))) + ',0)'
        }else{
          return 'rgb(150, 150, 150)'
        }
      },      
      getColor_zero(index){
        if (index / this.bar_size * 100 < this.nolla){
          var blue = 255 - index * (255 / this.bar_size);
          return 'rgb(' + blue + ',' + blue + ',255)'
        }else{
          return 'rgb(150, 150, 150)'
        }
      }
    },
    watch: {
      player_data: function () {
        this.hauki_pro = ((this.player_data[0].Hauki_n / this.player_data[0].Drows_n).toFixed(2) * 100).toFixed().toString() + '%';
        this.nolla = Number((this.player_data[0].Nolla_n / this.player_data[0].Drows_n).toFixed(2) * 100).toFixed();
        this.hka = Number((this.player_data[0].Player_resSum / this.player_data[0].Drows_n).toFixed(2));
        this.throws = [this.player_data[0]['throw_mean1'], this.player_data[0]['throw_mean2'], this.player_data[0]['throw_mean3'], this.player_data[0]['throw_mean4']]
      },
    },
    // components: { LogoSVG },
  }
</script>

<style lang="css">
  .hauki {
    /*display: inline-flex;*/
    height: 4em;
    width: 50% !important;
  }
  .progress span {
    position: absolute;
    display: block;
    width: 90%;
    color: black;
 }
  .progressbar {
    /*position: absolute;*/
    float: left;
    width: 100% !important;
    /*height: 60px;*/
    display: block;
  }
  .progressbar_e {
    /*position: absolute;*/
    float: left;
    width: 80% !important;
    /*margin: 0 !important;*/
    /*height: 60px;*/
    display: block;
  }
  .Rrrrr { 
    font: italic 15px sans-serif;
    font-family: "Lucida Handwriting", "Courier New", monospace;
  }

</style>
