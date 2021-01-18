<template lang="html">
  <div>
    <b-table striped hover :items="litems" :fields="fields" class="font-weight-bold" sort-by="Player_resSum" :sort-desc="sortDesc">
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
          { key: "Name", label: "Nimi"},
          { key: "Event__Name", label: "Liiga" },
          { key: "Team_Sort_name", label: "Joukkue"},
          { key: "Rounds_n", sortable: true, label: "E",  headerTitle: "Erät"},
          { key: "Player_resSum",
            sortable: true,
            label: "Hka",
            formatter:(value, key, item) => {
              return Number((item.Player_resSum/item.Drows_n).toFixed(2));
            },
            sortByFormatted: true,
            headerTitle: "Heittokeskiarvo"
          },
          { key: "Player_posSum",
            sortable: true,
            label: "HPka",
            formatter:(value, key, item) => {
              return Number((item.Player_posSum/item.Drows_n).toFixed(2));
            },
            sortByFormatted: true,
            headerTitle: "Heittopaikkakeskiarvo"
          },
          { key: "Best_drow", sortable: true, label: "Parasheitto"},
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
        axios
        .get('https://pinq.kapsi.fi/DK/api/data/hka_top/' + this.year.value + "/" + this.liig.value)
        .then(response => (this.parse_values(response.data)));
      },
    },
    watch: {
      liig: function () {
        this.get_data();
      },
      year:function () {
        this.get_data();
      },
    }
  }
</script>

<style lang="css">
</style>
