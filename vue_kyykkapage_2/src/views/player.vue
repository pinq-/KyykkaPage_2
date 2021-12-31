<template>
    <div class="home">
        <b-container fluid>
            <b-row>
                <b-col col>
                    <b-card class="font-weight-bold theme2" :header = 'player_name' style="overflow:auto" no-body>
                        <player_stats :liig="liig" :year="year" @set_name='set_name'/>
        
                    </b-card>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>
<script>
    import player_stats from '@/components/player_stats.vue'
    export default {
        name: 'Home',
        components: {
            player_stats
        },
        data(){
            return {
                player_name : "Pelaajan nimi",
            }
        },
        methods: {
            set_name(value){
                this.player_name = value;
            }
        },
        props: ["year", "liig"],
    }
</script>