<template lang="html">
  <div>
    <b-table responsive v-b-tooltip striped hover :items="litems" :fields="fields" class="font-weight-bold" sort-by="Real_Game_mean" :sort-desc="sortDesc"  @row-clicked="Team_selected">
      <template #cell(Event__Name)="data">
        <img v-if="data.item.Event__Name == 'NKL'" src="@/assets/NKL_small.png" width="30"/>
        <img v-else-if="data.item.Event__Name.startsWith('K')" src="@/assets/kyykkaliiga_small.png" width="30"/>
        <img v-else-if="data.item.Event__Name.startsWith('O')" src="@/assets/oamk_small.png" width="30"/>
        {{data.item.Event__Name.split("/")[1]}}
      </template>
      <template #cell(order)="data">
        {{data.index + 1}}
      </template>
    </b-table>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    props:["liig", "year"],
    data(){
      return {
        litems: [],
        sortDesc: true,
        fields: [
          { key: "order", label: "No."},
          { key: "Team__Sort_name", label: "Nimi"},
          { key: "Event__Name", label: "Liiga" },
          { key: "Games_n", sortable: true, label: "O",  headerTitle: "Ottelut"},
          { key: "Real_Game_mean", sortable: true, label: "Oka",  headerTitle: "Ottelukeskiarvo"},
          { key: "Best_game", sortable: true, label: "Paras peli"},
          { key: "Win_n", sortable: true, label: "Voitot"},
        ]
      }
    },
    mounted() {
      this.get_data();
    },
    methods: {
      parse_values(data) {
        this.litems = data;
      },
      get_data(){
        if (this.$store.state.year.text && this.$store.state.liig.text){
          axios
          .get('https://pinq.kapsi.fi/DK/api/data/teams_top/' + this.$store.state.year.text + '/' + this.$store.state.liig.value)
          .then(response => (this.parse_values(response.data)));
        }
      },
      Team_selected(items) {
        // console.log(items.id)
          this.$router.push({ name: 'Team_data', params: { id : items.id}});
        },
    },
    watch: {
       '$store.state.liig': function () {
        this.get_data();
      },
       '$store.state.year':function () {
        this.get_data();
      },
    }
  }
</script>

<style lang="css">
</style>
