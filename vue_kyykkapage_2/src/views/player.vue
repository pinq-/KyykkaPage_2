<template>
    <div class="home">
        <b-container fluid>
            <b-row>
                <b-col col>
                    <b-card class="font-weight-bold theme2" header = 'Pelaajan Hka' style="overflow:auto" no-body>
                        <player_hka :player_hka_stats = "player_hka_stats"/>
        
                    </b-card>
                </b-col>
                <b-col col>
                    <b-card class="font-weight-bold theme2" :header = 'player_name' style="overflow:auto" no-body>
                        <player_stats :player_data = "player_data"/>
        
                    </b-card>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>
<script>
    import axios from 'axios'
    import player_stats from '@/components/player_stats.vue'
    import player_hka from '@/components/player_hka_plot.vue'
    export default {
        name: 'Home',
        components: {
            player_stats,
            player_hka
        },
        data(){
            return {
                player_name : "Pelaajan nimi",
                player_data : '',
                player_hka_stats : 0,
            }
        },
        mounted() {
            this.get_data();
        },
        methods: {
            set_name(value){
                this.player_name = value;
            },
            parse_values(data) {
                this.player_data = data[0]
                this.player_name = data[0][0].Name

                // Parse data from plot
                var hkas = [data[1][data[1].length - 1].Event__Year]; 
                hkas.push(Number((data[0][0].Player_resSum / data[0][0].Drows_n).toFixed(2)))
                data[1].forEach(function(val){
                    hkas.push(Number((val.Player_resSum / val.Drows_n).toFixed(2)))
                });
                this.player_hka_stats = hkas.reverse()
            },
            get_data(){
                axios
                .get('https://pinq.kapsi.fi/DK/api/data/player/' + this.$route.params.id)
                .then(response => (this.parse_values(response.data)));
            },
        },
        props: ["year", "liig"],
    }
</script>