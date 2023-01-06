<template>
    <div class="home">
        <b-container fluid>
            <b-row>
            <b-col lg="9">
                <b-row>
                    <b-col sm="6">
                        <b-card class="font-weight-bold m-1 theme2" header="Parhaat joukkueet Suomessa" no-body>
                            <best_teams :liig="liig" :year="year" />
                        </b-card>
                    </b-col>
                    <b-col sm="6">
                        <b-card class="font-weight-bold m-1 theme2" header="Paras Hka Suomessa" no-body>
                            <best_players :liig="liig" :year="year" />
                        </b-card>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col>
                        <b-card class="font-weight-bold m-2 theme2" header="Liigojen Oka jakautuminen"  no-body>
                            <data_plot :year="year" />
                        </b-card>
                    </b-col>
                </b-row>
            </b-col>
            <b-col lg="3">
                <game_modals/>
                <games_modal/>
                <b-card class="font-weight-bold mt-2 theme2" no-body header="Viimeisimmät pelit">
                    <new_games :liig="liig" v-on="$listeners"/>
                </b-card>
            </b-col>
        </b-row>
        </b-container>
    </div>
</template>
<script>
    // <b-button @click="all_games()"> Kaikki pelit </b-button>
    import new_games from '@/components/home/home_new_games.vue'
    import data_plot from '@/components/home/home_data_plot.vue'
    import best_teams from '@/components/home/home_best_teams.vue'
    import best_players from '@/components/home/home_best_players.vue'
    import game_modals from '@/components/game_modals.vue'
    import games_modal from '@/components/games_modal.vue'
    export default {
        name: 'Home',
        components: {
            new_games,
            data_plot,
            best_teams,
            best_players,
            game_modals,
            games_modal
        },
        props: ["year", "liig"],
        methods: {
          all_games() {
              // this.$store.state.game_id = items.id;
              this.$store.state.games_modal *= -1;
              this.$bvModal.show("modal-2")
              // this.$refs['v-b-modal.modal-2'].show()
            },
        },
    }
</script>
<style>
</style>