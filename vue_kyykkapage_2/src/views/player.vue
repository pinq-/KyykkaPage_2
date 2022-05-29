<template>
    <div class="home">
        <players_modal/>
        <b-container fluid>
            <b-row>
                <b-col>
                    <b-card class="font-weight-bold theme2 m-2" style="overflow:auto" no-body>
                        <player_stats :player_data = "player_data"/>
                        <template #header>
                            <b-row class="justify-content-md-center">
                                <b-col>
                                    <h1 class="m-2" > {{player_name}} </h1>
                                </b-col>
                                <b-col>
                                    Joukkue:<h3 class="m-2" > {{player_team}} </h3>
                                </b-col>                                
                                <b-col>
                                    <b-row class="justify-content-md-center">
                                        <img v-if="player_liig == 'NKL'" src="@/assets/NKL_small.png" width="40"/>
        <img v-else-if="player_liig.startsWith('K')" src="@/assets/kyykkaliiga_small.png" width="40"/>
        <img v-else-if="player_liig.startsWith('O')" src="@/assets/oamk_small.png" width="40"/><h4 class="m-2" > {{player_liig.split("/")[1]}} </h4>
                                    </b-row>
                                </b-col>
                            </b-row>
                        </template>
                    </b-card>
                </b-col> 
            </b-row>
            <b-row>
                <b-col lg="4">
                    <b-card class="font-weight-bold theme2 m-2" header = 'Pelaajan Hka' style="overflow:auto" no-body>
                        <player_hka :player_hka_stats = "player_hka_stats"/>
        
                    </b-card>
                </b-col>
                <b-col>
                    <b-row>
                        <b-col>
                            <b-card class="font-weight-bold theme2 m-2" header = 'Tilastot' style="overflow:auto" no-body>
                                <player_extra_stats :player_data = "player_data"/>
                            </b-card>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col>
                            <b-card class="font-weight-bold theme2 m-2" header = 'Poistettujen kyykkien tilasto' style="overflow:auto" no-body>
                                <player_throw_plot :player_throw_divide_data = 'player_throw_divide_data'/>
                            </b-card>
                        </b-col>
                    </b-row>
                </b-col>
                <b-col>
                    <b-card class="font-weight-bold theme2 m-2" header = 'Peli tulokset' style="overflow:auto" no-body>
                        <game_modals />
                        <player_throws :player_round_throws = 'player_round_throws'/>
                    </b-card>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>
<script>
    import axios from 'axios'
    import player_stats from '@/components/player/player_stats.vue'
    import player_hka from '@/components/player/player_hka_plot.vue'
    import player_throws from '@/components/player/player_throws.vue'
    import game_modals from '@/components/game_modals.vue'
    import player_extra_stats from '@/components/player/player_bars.vue'
    import player_throw_plot from '@/components/player/player_throw_plot.vue'
    import players_modal from '@/components/players_modal.vue'
    export default {
        name: 'Home',
        components: {
            player_stats,
            player_hka,
            player_throws,
            game_modals,
            player_extra_stats,
            player_throw_plot,
            players_modal,
        },
        data(){
            return {
                player_name : "Pelaajan nimi",
                player_team : "Pelaajan tiimi",
                player_liig : "Pelaajan liiga",
                player_data : '',
                player_round_throws : '-',
                player_hka_stats   : [],
                player_throw_divide_data : [],
                player_stats_temp : [],
            }
        },
        mounted() {
            this.get_player_stats();
            // this.get_player_throws();
        },
        methods: {
            set_name(value){
                this.player_name = value;
            },
            parse_player_stats(data) {
                // console.log(data[0])
                this.player_stats_temp = data[0]
                this.player_name = data[0][0].Name
                this.player_team = data[0][0].Sort_name
                this.player_liig = data[0][0].Event__Name

                //Parse data for plot. Hkas and years and different leags
                if (data[1].length){// If there is more years
                    var hkas = [],
                    year = []; // for x-axis tiks
                    hkas.unshift([data[0][0].Event__Name, +(data[0][0].Player_resSum / data[0][0].Drows_n).toFixed(2), data[0][0].Event__Year])
                    year.unshift(data[0][0].Event__Year)
                    data[1].forEach(function(val){
                        hkas.unshift([val.Event__Name, +(val.Player_resSum / val.Drows_n).toFixed(2), val.Event__Year])
                        year.unshift(val.Event__Year)
                    });
                    this.player_hka_stats = [{year: year}, {hka: hkas }];
                }else{// if this is the first year
                    this.player_hka_stats = [{year: [this.year.value]}, {hka: [[data[0][0].Event__Name, (data[0][0].Player_resSum / data[0][0].Drows_n).toFixed(2), data[0][0].Event__Year]] }];

                }

            },
            parse_player_thorws(throws){
            // console.log(throws);
            var player = {};
            var order = 0,
                points = 0,
                RoundScore = 0,
                pointer = 0,
                game_id = 0;
                player.Best_round = 0;
                player.throw_mean1 = 0;
                player.throw_mean2 = 0;
                player.throw_mean3 = 0;
                player.throw_mean4 = 0;
            var throw_mean_names = ["throw_mean1", "throw_mean2", "throw_mean3", "throw_mean4"];
            var throw_names = ["throw_1", "throw_2", "throw_3", "throw_4"];
            var position = [[],[],[],[]];
            var round = {
                Game_time:0,
                opponent:"-",
                Player_position:0,
                Game_round:0,
                throw_1:0,
                throw_2:0,
                throw_3:0,
                throw_4:0,
                Throw_sum:0,
                throw_mean:0,
                Best_drow: 0,
                id: 0,
            };
            var game_throws = [];
            var starts = new Array(8).fill(0);
            var more = new Array(8).fill(0);
            var less = new Array(8).fill(0);
            var histogram_plot_category = 0;
              
            throws.forEach((val) => {
                points = Number(val.Throw_points);
                if (isNaN(points)){
                  points = 0;
                }
                // Histogram
                if (val.Throw_KyykkasInt > 6){
                  histogram_plot_category = 7;
                } else{
                  histogram_plot_category = val.Throw_KyykkasInt;
                }
                if ( val.Kyykkas_left == 80){
                  starts[histogram_plot_category] += 1;
                }
                else if(val.Kyykkas_left > 40){
                  more[histogram_plot_category] += 1;
                }
                else if(val.Kyykkas_left <= 40){
                  less[histogram_plot_category] += 1;
                }
                // Every round 
                if (val.Player_order > order){
                  RoundScore += points;
                }else
                {
                    if (player.Best_round < RoundScore){
                        player.Best_round = RoundScore;
                    }
                    // console.log(round, index, game_id)
                    game_throws.push(round);
                    round = {
                        Game_time:0,
                        opponent:"-",
                        Player_position:0,
                        Game_round:0,
                        throw_1:"-",
                        throw_2:"-",
                        throw_3:"-",
                        throw_4:"-",
                        Throw_sum:0,
                        throw_mean:0,
                        Best_drow: 0,
                        id:0,
                    };
                    RoundScore = 0;
                    RoundScore = points;
                    pointer = 0;
                }
                // Set all the stabel value
                if (round.Game_time == 0){
                    if ( game_id != val.Game_id){
                        var d  = new Date(val.Game_id__Game_time);
                        round.Game_time =d.getDate() + "." + Number(d.getMonth() + 1);
                        if (val.Away_team == this.player_team){
                            round.opponent = val.Home_team;
                        }else{
                            round.opponent = val.Away_team;
                        } 
                    }else{
                        round.Game_time = "";
                        round.opponent = "";
                    }

                    round.Player_position = val.Player_position;
                    round.Game_round = val.Game_round;
                    round.id = val.Game_id;
                }
                round[throw_names[pointer]] = val.Throw_points;
                round.Throw_sum = RoundScore;
                round.throw_mean = (RoundScore / (pointer + 1)).toFixed(1);
                if (round.Best_drow < points){
                    round.Best_drow = points;
                }
                pointer += 1;
                game_id = val.Game_id;
                // console.log(val);
                order = val.Player_order;
                position[val.Player_position - 1].push(points);
              // console.log(index);
            });
              // console.log(RoundScore,starts, pointer);
            game_throws.push(round);
            position.forEach((val, i) =>{
                if(val.length == 0){
                    player[throw_mean_names[i]] = 0;
                }else{
                    player[throw_mean_names[i]] = (val.reduce((a, b) => a + b, 0) / val.length).toFixed(1) + " p (" + val.length + ")";
                }
            });
            // console.log(player)
            this.player_round_throws = [game_throws, player['Best_round']];

            // Set player data to player_data to send player_stats component
            for (var k in player){
                this.player_stats_temp[0][k] = player[k];
            }
            this.player_data = this.player_stats_temp;
            this.player_throw_divide_data = [starts, more, less];
            },
            get_player_stats(){
                if(this.$route.params.id != '-'){
                    axios
                    .get('https://pinq.kapsi.fi/DK/api/data/player/' + this.$route.params.id)
                    .then(response => (this.parse_player_stats(response.data)));
                }
            },
            get_player_throws(){
                if (this.$route.params.id != '-'){
                    axios
                    .get('https://pinq.kapsi.fi/DK/api/data/player_throws/' + this.$route.params.id)
                    .then(response => (this.parse_player_thorws(response.data)));
                }
            },
        },
        props: ["year", "liig"],
        watch: {
            player_name: function () {
                this.get_player_throws();
            },          
            '$route' (){
                // console.log(to, from)
                this.get_player_stats();
            },
        }
    }
</script>