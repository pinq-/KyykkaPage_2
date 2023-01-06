<template>
    <div id="app" class="theme4">
        <b-navbar toggleable="lg" type="dark" class="theme3 font-weight-bold">
            </b-navbar-brand>
                <h1 class = 'font-weight-bold'>Ultimate kyykkä tilastot</h1>
                <img src="@/assets/logo.png" width="90" class = 'm-2'/>
                <b-button-toolbar>
                    <b-button-group class="mr-1">
                        <b-button class="nav-btn" title="Save file" to="/" >
                          <b-icon icon="newspaper"></b-icon>
                        </b-button>
                        <b-button class="nav-btn" title="Load file" to="/player/-">
                          <b-icon icon="person-bounding-box"></b-icon>
                        </b-button>
                        <b-button class="nav-btn" title="New document" to="/teams/-">
                          <b-icon icon="people-fill" ></b-icon>
                        </b-button>        
                        <b-button class="nav-btn" title="New document" to="/e_info">
                          <b-icon  icon="journal-bookmark-fill" ></b-icon>
                        </b-button>        
                        <b-button class="nav-btn" title="New document" href = "https://github.com/pinq-/KyykkaPage_2/tree/main/vue_kyykkapage_2">
                          <b-icon  icon="github" ></b-icon>
                        </b-button>
                    </b-button-group>
                </b-button-toolbar>
                <b-navbar-nav class="ml-auto">
                    <b-navbar-brand v-b-toggle.sidebar-1>
                        <b-icon icon="list" font-scale="2"></b-icon>
                    </b-navbar-brand>
                </b-navbar-nav>
        </b-navbar>
        <router-view :year="year" :liig="liig" />
        <div id="nav">
            <b-sidebar id="sidebar-1" bg-variant="dark" title="Valikko" shadow backdrop>
                <template #default="{ hide }">
                    <nav class="px-3 py-2 ">
                        <b-nav vertical>
                            <b-nav-item to="/">
                                <span class="d-inline-block m-2">
                                    <b-icon icon="newspaper" scale="1.5"></b-icon>
                                </span>
                                Etusivu
                            </b-nav-item>
                            <b-nav-item to="/player/-">
                                <span class="d-inline-block m-2">
                                    <b-icon icon="person-bounding-box" scale="1.5"></b-icon>
                                </span>
                                Pelaajat
                            </b-nav-item>
                            <b-nav-item to="/teams/-">
                                <span class="d-inline-block m-2">
                                    <b-icon icon="people-fill" scale="1.5"></b-icon>
                                </span>
                                Joukkuueet
                            </b-nav-item>
                            <b-nav-item to="/e_info">
                                <span class="d-inline-block m-2">
                                    <b-icon icon="journal-bookmark-fill" scale="1.5"></b-icon>
                                </span>
                                Ekstrat
                            </b-nav-item>
                            <b-nav-item href = "https://github.com/pinq-/KyykkaPage_2/tree/main/vue_kyykkapage_2">
                                <span class="d-inline-block m-2">
                                    <b-icon icon="github" scale=" 0.8"></b-icon>
                                </span>
                                <span style = "font-size:0.7em;">
                                    Github
                                </span>
                            </b-nav-item>
                        </b-nav>
                    </nav>
                    <b-button variant="outline-info" class="mb-2" @click="hide">
                        <b-icon icon="arrow-bar-left" font-scale="2"></b-icon>
                    </b-button>
                </template>
            </b-sidebar>
        </div>

        <b-navbar fixed = 'bottom' class = 'theme3 font-weight-bold' align = 'center'>
            <div class = 'mx-auto' v-if="$route.name == 'Home'" >
                <span v-if="$route.name == 'Home'" >Vuosi: </span>
                <b-dropdown dropup v-if="$route.name == 'Home'" :text="$store.state.year.text">
                    <b-dropdown-item  @click="select_year(year.value + 1 - year_i)" v-for="year_i in year.value - 2004" :key="year_i">
                        <div>
                            <b>{{year.value + 1 - year_i}}</b>
                        </div>
                    </b-dropdown-item>
                </b-dropdown>
            </div>
            <div class = 'mx-auto' v-if="$route.name == 'Home'" >
                <span v-if="$route.name == 'Home'" >Liiga: </span>
                <b-dropdown dropup v-if="$route.name == 'Home'" :text="$store.state.liig.text">
                    <b-dropdown-item :disabled="option.disabled" @click="select_liig(option)" v-for="option in options_liig" :key="option.value">
                        <div>
                            <img :src=option.src width="30">
                                {{option.text}}
                        </div>
                    </b-dropdown-item>
                </b-dropdown>
            </div>
             <b-button class = 'mx-auto'  v-if="$route.name == 'Team_data'"  @click="show_all_teams()"> Kaikki joukkueet </b-button>
             <b-button class = 'mx-auto'  v-if="$route.name == 'Player_data'"  @click="show_all_players()"> Kaikki pelaajat </b-button>
        </b-navbar>
    </div>
</template>
<script>
    export default {
        data() {

            return {
                year: {
                    value: new Date().getFullYear(),
                    text: new Date().getFullYear().toString()
                },
                liig: {
                    value: "all",
                    text: "Kaikki"
                },
                selected_game: 0,
                options_years: [],
                options_liig: [{
                        value: "all",
                        text: "Kaikki",
                    },
                    {
                        value: "NKL",
                        text: "NKL",
                        src: require("@/assets/NKL_small.png")
                    },
                    {
                        value: "Kyykk",
                        text: "Kyykkaliiga",
                        src: require("@/assets/kyykkaliiga_small.png")
                    },
                    {
                        value: "Oamk",
                        text: "Oamk",
                        src: require("@/assets/oamk_small.png")
                    },
                ],
            }
        },
        mounted() {
            document.title = "Maksimi kyykkä data";
            this.$store.state.year = this.year;
            this.$store.state.liig = this.liig;
            this.$store.state.screen_size = window.innerWidth;
        },
        methods: {
            select_year(option) {
                // console.log(this.$store.state.year)
                this.$store.state.year = {value: option, text: option.toString()};
                this.year = {value: option, text: option.toString()};
            },
            select_liig(option) {
                // console.log(option)
                this.$store.state.liig = {value: option.value, text: option.text};
                this.liig = option;
            },
            show_all_teams() {
              this.$store.state.teams_modal *= -1;
              // console.log(this.$refs.childComponent);
              this.$bvModal.show("modal-teams")
              // this.$refs['v-b-modal.modal-1'].show()
            },            
            show_all_players() {
              this.$store.state.players_modal *= -1;
              // console.log(this.$refs.childComponent);
              this.$bvModal.show("modal-players")
              // this.$refs['v-b-modal.modal-1'].show()
            },

        }
    }
</script>
<style lang="scss">
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
    }

    #nav {
        padding: 30px;
    }

    #nav a {
        font-weight: bold;
        color: $theme2;
        text-shadow:1px 1px $theme4,
                    2px 2px $theme4,
                    3px 3px $theme4;

    }
    #b-card{
      background-color: $theme4 !important;
    }

    #nav a:hover {
        color: white;
    }

    .theme3 {
        background-color: $theme3 !important;
    }

    .theme4 {
        background-color: $theme4 !important;
    }

    .theme1 {
        background-color: $theme1 !important;
    }
    .theme2 {
        background-color: $theme2 !important;
    }
    .green_own {
        background-color: #A0C334 !important;
    }

    select,
    button {
        background-color: $theme2 !important;
        border: none !important;
        outline: none !important;
        font-weight: bold !important;
        color: black !important;
    }    
    .nav-btn {
        background-color: $theme2 !important;
        border: none !important;
        outline: none !important;
        font-weight: bold !important;
        color: black !important;
    }

    .nav-btn:hover{
        filter: brightness(150%);
    }

    .btn {
        outline: none !important;
        box-shadow: none;
    }

    h1 {
        color: $theme2;
        text-shadow: 1px 1px $theme4,
        2px 2px $theme4,
        3px 3px $theme4,
        4px 4px $theme4,
        5px 5px $theme4,
        6px 6px $theme4,
  ;
    }

    .b-sidebar-body {
        background-color: $theme3 !important;
    }

    .b-sidebar-header {
        background-color: $theme4 !important;
        color: $theme2;
    }

    .card-header{
        background-color: $theme3 !important;
        color: $theme2;
        text-shadow:1px 1px $theme4,
                    2px 2px $theme4,
                    3px 3px $theme4;
    }
    th {
    background-color: #FADA6C !important;
    }
    .modal .modal-huge {
        max-width: 90%;
        width: 90%;
    }
</style>