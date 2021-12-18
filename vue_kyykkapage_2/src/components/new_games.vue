<template lang="html">
  <div>
    <b-table  sticky-header striped hover :items="litems" :fields="fields" class="font-weight-bold" @row-clicked="onRowSelected">
      <template #cell(Event__Name)="data">
        <img v-if="data.item.Event__Name == 'NKL'" src="@/assets/NKL_small.png" width="30"/>
        <img v-else-if="data.item.Event__Name.startsWith('K')" src="@/assets/kyykkaliiga_small.png" width="30"/>
        <img v-else-if="data.item.Event__Name.startsWith('O')" src="@/assets/oamk_small.png" width="30"/>
        {{data.item.Event__Name.split("/")[1]}}
      </template>
      <template #cell(Home_result)="data">
        <p v-if="data.item.Home_result > data.item.Away_result" class='text-success'>
          {{ data.item.Home_result }}
        </p>
        <p v-else-if="data.item.Home_result < data.item.Away_result" class='text-danger'>
          {{ data.item.Home_result }}
        </p>
        <p v-else>
          {{ data.item.Home_result }}
        </p>
      </template>
      <template #cell(Away_result)="data">
        <p v-if="data.item.Home_result < data.item.Away_result" class='text-success'>
          {{ data.item.Away_result }}
        </p>
        <p v-else-if="data.item.Home_result > data.item.Away_result" class='text-danger'>
          {{ data.item.Away_result }}
        </p>
        <p v-else>
          {{ data.item.Away_result }}
        </p>
      </template>
    </b-table>
  </div>
</template>

<script>
  import axios from 'axios'
  import moment from 'moment';

  export default {
    props:["liig"],
    data(){
      return {
        litems: [],
        fields: [
          { key: "Game_time", formatter: (value) => {
            return moment.utc(value).format('HH:mm DD.MM.YY')
          }, label: 'Aika'},
          { key: "Event__Name", label: "Liiga" },
          { key: "Home_team_name", label: "Koti joukkue"},
          { key: "Home_result", label: "Koti tulos"},
          { key: "Away_result", label: "Vieras tulos"},
          { key: "Away_team_name", label: "Vieras joukkue"},
          { key: "Temp", label: "Lämpötila"},
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
      onRowSelected(items) {
          this.$emit("set_game_id", items.id);
          // console.log(this.$refs.childComponent);
          this.$bvModal.show("modal-1")
          // this.$refs['v-b-modal.modal-1'].show()
        },
      get_data(){
        axios
        .get('https://pinq.kapsi.fi/DK/api/data/new_games_10/' +this.liig.value)
        .then(response => (this.parse_values(response.data)));
      }
    },
    watch: {
      liig: function () {
        this.get_data();
      },
    }
  }
</script>

<style lang="css">
  
</style>
