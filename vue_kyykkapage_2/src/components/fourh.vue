<template lang="html">
  <div>
    <b-table responsive striped hover :items="litems" :fields="fields" class="font-weight-bold table-sm" 
    @row-clicked="onRowSelected">
      <template #cell(Game_id__Event__Name)="data">
        <img v-if="data.item.Game_id__Event__Name == 'NKL'" src="@/assets/NKL_small.png" width="30"/>
        <img v-else-if="data.item.Game_id__Event__Name.startsWith('K')" src="@/assets/kyykkaliiga_small.png" width="30"/>
        <img v-else-if="data.item.Game_id__Event__Name.startsWith('O')" src="@/assets/oamk_small.png" width="30"/>
        {{data.item.Game_id__Event__Name.split("/")[1]}}
      </template>
    </b-table>
  </div>
</template>

<script>
  import axios from 'axios'
  import moment from 'moment';

  export default {
    props:["liig", "year"],
    data(){
      return {
        litems: [],
        fields: [
          { key: "Game_id__Game_time", formatter: (value) => {
            return moment.utc(value).format('DD.MM.YY')
          }, label: 'Aika'},
          { key: "Game_id__Event__Name", label: "Liiga"},
          { key: "Player__Team__Team__Sort_name", label: "Joukkue"},
          { key: "Player__Name", label: "Nimi"},
          { key: "Player_position", label: "Heittopaikka"},
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
        .get('https://pinq.kapsi.fi/DK/api/data/fourhauki/' + this.year.value + "/" + this.liig.value)
        .then(response => (this.parse_values(response.data)));
      },
      onRowSelected(items) {
        // console.log(items[0].Game_id)
          this.$emit("set_game_id", items.Game_id);
          this.$bvModal.show("modal-1")
        },
    },
    watch: {
      liig: function () {
        this.get_data();
      },
      year: function () {
        this.get_data();
      },
    }
  }
</script>

<style lang="css">
</style>
