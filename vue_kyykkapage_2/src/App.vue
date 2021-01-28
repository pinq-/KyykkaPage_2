<template>
  <div id="app" class="bg-dark">
    <b-navbar toggleable="lg" type="dark" variant="dark" class="font-weight-bold">
  <b-navbar-brand v-b-toggle.sidebar-1>
      <b-icon icon="arrow-bar-right" font-scale="2"></b-icon>
  </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        Kyykka tilastot
        <b-container class="w-25">
          <b-col>
            <b-dropdown :text="year ? year.text : 'Valitse vuosi'">
              <b-dropdown-item
                :disabled="option.disabled"
                @click="select_year(option)"
                v-for="option in options_years"
                :key="option.value"
              >
                <div>
                  <img :src=option.src width="30">
                  {{option.text}}
                </div>
              </b-dropdown-item>
            </b-dropdown>
          </b-col>
          <b-col>
            <b-dropdown :text="liig ? liig.text : 'Valitse liiga'">
              <b-dropdown-item
                :disabled="option.disabled"
                @click="select_liig(option)"
                v-for="option in options_liig"
                :key="option.value"
              >
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
    <router-view :year="year" :liig="liig" :selected_game="selected_game" @set_game_id="set_game_id"/>

    <div id="nav">
      <b-sidebar id="sidebar-1" title="Sidebar" no-header shadow backdrop>
        <template #default="{ hide }">
          <b-button variant="outline-info" class="mb-2" @click="hide">
              <b-icon icon="arrow-bar-left" font-scale="2"></b-icon>
         </b-button>
          <div class="px-3 py-2">
            <b-navbar-nav>
              <b-nav-item to="/"><b-icon icon="newspaper" font-scale="1.5"></b-icon> Etusivu</b-nav-item>
              <b-nav-item to="/e_info"><b-icon icon="journal-bookmark-fill" font-scale="1.5"></b-icon>Ekstrat</b-nav-item>
            </b-navbar-nav>
          </div>
        </template>
      </b-sidebar>
    </div>
  </div>
</template>
<script>

  export default {
    data(){
      return {
        year: {value:2021, text:"2021"},
        liig:{value: "all", text: "Kaikki"},
        selected_game: 0,
        options_years: [],
        options_liig: [
        {
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
      for (let i = 2021; i >= 2021-10; i--) {
          this.options_years.push({value:i, text:String(i) });
      }
      document.title = "Kyykkä Autisti"
    },
    methods: {
    select_year(option) {
      this.year = option;
    },
    select_liig(option) {
      this.liig = option;
    },
    set_game_id(Game_id){
      this.selected_game = Game_id;
    }
  }
  }
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}
.navbar.navbar-dark.bg-dark{
   background-color: #0D8F32!important;
}

select, button {
  background-color: #2ADB5C!important;
  border:none !important;
  outline:none !important;
  font-weight: bold !important;
}
.btn {
   outline: none !important;
   box-shadow: none;
}
</style>
