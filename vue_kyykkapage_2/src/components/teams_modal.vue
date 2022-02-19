<template lang="html">
  <div>
    <b-modal id="modal-3" size="xl" content-class = 'theme2' footer-class = 'theme3' header-class = 'theme3'>
    <template #modal-header>
      <b-dropdown :text="year.text">
        <b-dropdown-item @click="select_year(now_year + 1 - year_i)" v-for="year_i in now_year - 2004" :key="year_i">
            <div>
                <b>{{now_year + 1 - year_i}}</b>
            </div>
        </b-dropdown-item>
      </b-dropdown>      
      <b-dropdown :text="liig.text">
          <b-dropdown-item :disabled="option.disabled" @click="select_liig(option)" v-for="option in options_liig" :key="option.value">
              <div>
                  <img :src=option.src width="30">
                  {{option.text}}
              </div>
          </b-dropdown-item>
      </b-dropdown>
      <h5>Kaikki joukkueet</h5>
      <b-col lg="6" class="my-1">
        <b-form-group
          label="Etsi"
          label-for="filter-input"
          label-cols-sm="3"
          label-align-sm="right"
          label-size="sm"
          class="mb-0"
        >
          <b-input-group size="sm">
            <b-form-input
              id="filter-input"
              v-model="filter"
              type="search"
              placeholder="Hae joukkuetta"
            ></b-form-input>

            <b-input-group-append>
              <b-button :disabled="!filter" @click="filter = ''">Tyhjennä</b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>
    </template>
    <b-table responsive small v-b-tooltip striped hover 
    :items="items" 
    :fields="fields" 
    class="font-weight-bold p-0" 
    sort-by="Real_Game_mean" 
    :sort-desc="sortDesc"  
    @row-clicked="Team_selected"
    :filter="filter"
    >
      <template #cell(Event__Name)="data">
        <img v-if="data.item.Event__Name == 'NKL'" src="@/assets/NKL_small.png" width="30"/>
        <img v-else-if="data.item.Event__Name.startsWith('K')" src="@/assets/kyykkaliiga_small.png" width="30"/>
        <img v-else-if="data.item.Event__Name.startsWith('O')" src="@/assets/oamk_small.png" width="30"/>
        {{data.item.Event__Name.split("/")[1]}}
      </template>
    </b-table>
    </b-modal>

  </div>
</template>

<script>
import axios from 'axios'

export default {
  data(){
    return {
      items: [],
      now_year: new Date().getFullYear(),
      sortDesc: true,
      filter: null,
      fields: [
        { key: "Team__Sort_name", label: "Nimi"},
        { key: "Event__Name", label: "Liiga" },
        { key: "Games_n", sortable: true, label: "O",  headerTitle: "Ottelut"},
        { key: "Real_Game_mean",
            sortable: true,
            label: "Oka",
            formatter:(value, key, item) => {
              return Number((item.Game_mean/item.Games_n).toFixed(1));
            },
            sortByFormatted: true,
            headerTitle: "Ottelukeskiarvo"
        },
        { key: "Best_game", sortable: true, label: "Paras peli"},
        { key: "Win_n", sortable: true, label: "Voitot"},
        { key: "Los_n", sortable: true, label: "Häviöt"},
      ],
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
      liig: {
        value: "all",
        text: "Kaikki"
      },
      year: {
        value: new Date().getFullYear(),
        text: new Date().getFullYear().toString()
      },
    }
  },
  methods: {
    parse_values(data) {
      // console.log(data)
      this.items = data;
    },
    get_data(){
      axios
      .get('https://pinq.kapsi.fi/DK/api/data/teams/' + this.$store.state.year.text + '/' + this.$store.state.liig.value)
      .then(response => (this.parse_values(response.data)));
    },
    Team_selected(items) {
      this.$bvModal.hide("modal-3")
      // console.log(items)
      this.$router.push({ name: 'Team_data', params: { id : items.id}}).catch(()=>{});
    },
    select_year(year){
      // console.log(this.$store.state.year)
      this.$store.state.year = {value: year, text: year.toString()};
      this.year = {value: year, text: year.toString()};
      this.get_data();      
      // this.year = year.toString();
    },    
    select_liig(liig){
      this.liig = {value: liig.value, text: liig.text};
      this.$store.state.liig = {value: liig.value, text: liig.text}; 
      this.get_data();
    },
  },
  watch: {
    '$store.state.teams_modal': function () {
      // console.log(this.items.length)
      // console.log(this.$store.state.year)
      if (this.$store.state.year != this.year || this.$store.state.liig != this.liig || this.items.length == 0){
        this.year = this.$store.state.year;
        this.liig = this.$store.state.liig;
        // console.log('Hae_tietoja')
        this.get_data();
      }

    },    
  },
}
</script>

<style lang="css" scoped>
</style>
