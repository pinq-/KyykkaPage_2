<template>
    <div class="home">
        <b-container fluid>
            <b-row>
                <b-col col lg="5">
                    <game_modals :selected_game="selected_game" />
                    <b-card class="font-weight-bold m-2 theme2" header="Viimeisimmät pelit" style="overflow:auto"  no-body>
                        <new_games :liig="liig" v-on="$listeners"/>
                    </b-card>
                </b-col>
                <b-col lg="5">
                    <b-card class="font-weight-bold m-2 theme2" header="Liigojen Oka jakautuminen"  no-body>
                        <histogram :year="year" />
                    </b-card>
                </b-col>
            </b-row>
            <b-row>
                <b-col col lg="5">
                    <b-card class="font-weight-bold m-2 theme2" header="Parhaat joukkueet Suomessa" style="overflow:auto" no-body>
                        <best_teams :liig="liig" :year="year" />
                    </b-card>
                </b-col>
                <b-col col lg="5">
                    <b-card class="font-weight-bold m-2 theme2" header="Paras Hka Suomessa" style="overflow:auto" no-body>
                        <best_players :liig="liig" :year="year" />
                    </b-card>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>
<script>
    // @ is an alias to /src
    import new_games from '@/components/new_games.vue'
    import histogram from '@/components/histogram.vue'
    import best_teams from '@/components/best_teams.vue'
    import best_players from '@/components/best_players.vue'
    import game_modals from '@/components/game_modals.vue'
    export default {
        name: 'Home',
        components: {
            new_games,
            histogram,
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