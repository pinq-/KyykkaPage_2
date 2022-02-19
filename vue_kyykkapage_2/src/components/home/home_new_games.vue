<template lang="html">
  <div>
    <b-table responsive small striped hover :items="litems" :fields="fields" class="font-weight-bold" @row-clicked="onRowSelected">
      <template #cell(Event__Name)="data">
        <img v-if="data.item.Event__Name == 'NKL'" src="@/assets/NKL_small.png" width="20"/>
        <img v-else-if="data.item.Event__Name.startsWith('K')" src="@/assets/kyykkaliiga_small.png" width="20"/>
        <img v-else-if="data.item.Event__Name.startsWith('O')" src="@/assets/oamk_small.png" width="20"/>
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
        // format time show it shows only date or hours. if game was doday, then it shows only hours
          { key: "Game_time", formatter: (value) => {
            if (moment().get('date') - value.substr(8,2)  < 1 && value.substr(5,2) == moment().get('month') + 1){
              if (moment.utc(value).hours() != 0){
                return moment.utc(value).format('HH:mm')
              }
            }
            else if (moment().get('year') - value.substr(0,4) > 0){
              return moment.utc(value).format('DD.MM.YY')
            }
            return moment.utc(value).format('DD.MM')
          }, label: 'Aika'},
          { key: "Event__Name", label: "Liiga" },
          { key: "Home_team_name", label: "Koti"},
          { key: "Home_result", label: "Koti tulos"},
          { key: "Away_result", label: "Vieras tulos"},
          { key: "Away_team_name", label: "Vieras"}
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
          this.$store.state.game_id = items.id;
          this.$store.state.game_modal *= -1;
          // console.log(this.$refs.childComponent);
          this.$bvModal.show("modal-1")
          // this.$refs['v-b-modal.modal-1'].show()
        },
      get_data(){
        if (this.$store.state.liig.value){
          axios
          .get('https://pinq.kapsi.fi/DK/api/data/new_games_10/' + this.$store.state.liig.value)
          .then(response => (this.parse_values(response.data)));
        }
      }
    },
    watch: {
      '$store.state.liig': function () {
        this.get_data();
      },
    }
  }
</script>

<style lang="css">
  
</style>
