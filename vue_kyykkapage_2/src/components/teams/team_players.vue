<template lang="html">
  <div>
    <b-table responsive v-b-tooltip small striped hover :items="items" :fields="fields" class="font-weight-bold" @row-clicked="onRowCliked">
    </b-table>
  </div>
</template>

<script>
import axios from 'axios'

  export default {
    props : ["player_throw_divide_data"],
    data(){
      return {
        items: [],
        fields: [
          { key: "Name", label: "Nimi"},
          { key: "Rounds_n", sortable: true, label: "E",  headerTitle: "Erät"},
          { key: "Player_posSum",
            label: "HPka",
            formatter:(value, key, item) => {
              return Number((item.Player_posSum/item.Drows_n).toFixed(2));
            },
            sortByFormatted: true,
            headerTitle: "Heittopaikkakeskiarvo"
          },
          { key: "Player_resSum",
            sortable: true,
            label: "Hka",
            formatter:(value, key, item) => {
              return Number((item.Player_resSum/item.Drows_n).toFixed(2));
            },
            sortByFormatted: true,
            headerTitle: "Heittokeskiarvo"
          },
          { key: "OFKLka",
            sortable: true,
            formatter:(value, key, item) => {
              return Number((item.OFKL_p / item.Drows_n).toFixed(2));
            },
            sortByFormatted: true,
            headerTitle: "OFKL keskiarvo"
          },
          { key: "NKLka",
            sortable: true,
            formatter:(value, key, item) => {
              return Number((item.NKL_p / item.Drows_n).toFixed(2));
            },
            sortByFormatted: true,
            headerTitle: "NKL keskiarvo"
          },
          { key: "Best_drow", sortable: true, label: "Parasheitto"},
          { key: "Hauki_n",
            sortable: true,
            label: "H%",
            formatter:(value, key, item) => {
              return Number((item.Hauki_n / item.Drows_n * 100).toFixed());
            },
            sortByFormatted: true,
            headerTitle: "Hauki prosentti"
          },          
          { key: "Nolla_n",
            sortable: true,
            label: "0%",
            formatter:(value, key, item) => {
              return Number((item.Nolla_n / item.Drows_n * 100).toFixed());
            },
            sortByFormatted: true,
            headerTitle: "Nolla pistettä prosentti"
          },
          { key: "Age", label: "Ikä", sortable: true},
        ]
      }
    },
    methods: {
      get_data(){
        axios
        .get('https://pinq.kapsi.fi/DK/api/data/team_players/' + this.$store.state.team_id)
        .then(response => (this.parse_values(response.data)));
      },
      parse_values(data){
        this.items  = data;
        // console.log(data)
      },
      onRowCliked(items) {
        this.$router.push({ name: 'Player_data', params: { id : items.id}});
      },
    },
    watch: {
      '$store.state.team_id': function () {
        this.get_data();
      },
    }
  }
</script>

<style lang="css">
/*.highcharts-container,  svg { width: 100% !important;}*/
</style>
