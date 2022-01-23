<template>
    <div id="app" class="theme4">
        <b-navbar toggleable="lg" type="dark" class="theme3 font-weight-bold">
            <b-navbar-brand v-b-toggle.sidebar-1>
                <b-icon icon="arrow-bar-right" font-scale="2"></b-icon>
            </b-navbar-brand>
            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
            <b-collapse id="nav-collapse" is-nav class="h2 font-weight-bold">
                Ultimate kyykkä tilastot
                <img src="@/assets/logo.png" width="90" class = 'm-2'/>
                <b-container class="w-25">
                    <b-col>
                        <b-dropdown :text="year ? year.text : 'Valitse vuosi'">
                            <b-dropdown-item :disabled="option.disabled" @click="select_year(option)" v-for="option in options_years" :key="option.value">
                                <div>
                                    <img :src=option.src width="30">
                                    {{option.text}}
                                </div>
                            </b-dropdown-item>
                        </b-dropdown>
                    </b-col>
                    <b-col>
                        <b-dropdown :text="liig ? liig.text : 'Valitse liiga'">
                            <b-dropdown-item :disabled="option.disabled" @click="select_liig(option)" v-for="option in options_liig" :key="option.value">
                                <div>
                                    <img :src=option.src width="30">
                                    {{option.text}}
                                </div>
                            </b-dropdown-item>
                        </b-dropdown>
                    </b-col>
                </b-container>
            </b-collapse>
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
                            <b-nav-item to="/player">
                                <span class="d-inline-block m-2">
                                    <b-icon icon="person-bounding-box" scale="1.5"></b-icon>
                                </span>
                                Pelaajat
                            </b-nav-item>
                            <b-nav-item to="/teams">
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
                        </b-nav>
                    </nav>
                    <b-button variant="outline-info" class="mb-2" @click="hide">
                        <b-icon icon="arrow-bar-left" font-scale="2"></b-icon>
                    </b-button>
                </template>
            </b-sidebar>
        </div>
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
            for (let i = this.year.value; i >= 2005; i--) {
                this.options_years.push({
                    value: i,
                    text: String(i)
                });
            }
            document.title = "Maksimi kyykkä data"
        },
        methods: {
            select_year(option) {
                this.year = option;
            },
            select_liig(option) {
                this.liig = option;
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
        color: $theme1;

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


    select,
    button {
        background-color: $theme2 !important;
        border: none !important;
        outline: none !important;
        font-weight: bold !important;
        color: $theme4 !important;
    }

    .btn {
        outline: none !important;
        box-shadow: none;
    }

    .h2 {
        color: $theme1;
    }

    .b-sidebar-body {
        background-color: $theme3 !important;
    }

    .b-sidebar-header {
        background-color: $theme4 !important;
        color: $theme1;
    }

    .card-header{
     background-color: $theme3!important;
     color: $theme1;
    }
    //table{
    // background-color: $theme2!important; 
    //}
    th {
    background-color: $theme3 !important;
    }
</style>