<template lang="html">
  <div>
    <b-table small responsive striped hover :items="litems" :fields="fields" class="font-weight-bold" sort-by="Player_resSum" :sort-desc="sortDesc" @row-clicked="Player_selected">
      <template #cell(Event__Name)="data">
        <img v-if="data.item.Event__Name == 'NKL'" src="@/assets/NKL_small.png" width="20"/>
        <img v-else-if="data.item.Event__Name.startsWith('K')" src="@/assets/kyykkaliiga_small.png" width="20"/>
        <img v-else-if="data.item.Event__Name.startsWith('O')" src="@/assets/oamk_small.png" width="15"/>
      </template>
      <template #cell(Name)="data">
        {{data.item.Name[0]}} {{data.item.Name.split(" ")[1]}}
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
          { key: "Player_resSum",
            sortable: true,
            label: "Hka",
            formatter:(value, key, item) => {
              return Number((item.Player_resSum / item.Drows_n).toFixed(2));
            },
            sortByFormatted: true,
            headerTitle: "Heittokeskiarvo"
          },
          { key: "Rounds_n", sortable: true, label: "E",  headerTitle: "Erät"},
          { key: "Player_posSum",
            label: "HPka",
            formatter:(value, key, item) => {
              return Number((item.Player_posSum / item.Drows_n).toFixed(1));
            },
            sortByFormatted: true,
            headerTitle: "Heittopaikkakeskiarvo"
          },
          { key: "Best_drow", sortable: true, label: "ph", headerTitle: "Parasheitto"},
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
          .get('https://pinq.kapsi.fi/DK/api/data/hka_top/' + this.$store.state.year.text + '/' + this.$store.state.liig.value)
          .then(response => (this.parse_values(response.data)));
        }
      },
      Player_selected(items) {
          this.$router.push({ name: 'Player_data', params: { id : items.id}});
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
