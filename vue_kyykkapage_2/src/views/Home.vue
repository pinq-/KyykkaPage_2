<template>
    <div class="home">
        <b-container fluid>
            <b-row>
            <b-col lg="9">
                <b-row>
                    <b-col>
                        <b-card class="font-weight-bold m-2 theme2" header="Liigojen Oka jakautuminen"  no-body>
                            <data_plot :year="year" />
                        </b-card>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col>
                        <b-card class="font-weight-bold m-2 theme2" header="Parhaat joukkueet Suomessa" style="overflow:auto" no-body>
                            <best_teams :liig="liig" :year="year" />
                        </b-card>
                    </b-col>
                    <b-col>
                        <b-card class="font-weight-bold m-2 theme2" header="Paras Hka Suomessa" style="overflow:auto" no-body>
                            <best_players :liig="liig" :year="year" />
                        </b-card>
                    </b-col>
                </b-row>
            </b-col>
            <b-col lg="3">
                <game_modals :selected_game="selected_game" />
                <b-card class="font-weight-bold m-2 theme2" header="Viimeisimmät pelit" style="overflow:auto"  no-body>
                    <new_games :liig="liig" v-on="$listeners"/>
                </b-card>
            </b-col>
        </b-row>
        </b-container>
    </div>
</template>
<script>
    // @ is an alias to /src
    import new_games from '@/components/new_games.vue'
    import data_plot from '@/components/teams_data_plot.vue'
    import best_teams from '@/components/best_teams.vue'
    import best_players from '@/components/best_players.vue'
    import game_modals from '@/components/game_modals.vue'
    export default {
        name: 'Home',
        components: {
            new_games,
            data_plot,
            best_teams,
            best_players,
            game_modals
        },
        props: ["year", "liig", "selected_game"],
    }
</script>
<style>
    .maxw {
        max-width: 200px;
    }
</style>