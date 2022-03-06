<template lang="html">
  <div>
    <b-modal id="modal-2" size="huge" body-bg-variant="dark" header-class="darker" footer-class="darker">
      <b-table responsive small striped hover :items="items" :fields="fields" class="font-weight-bold" @row-clicked="Game_selected">
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
    </b-modal>

  </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment';

export default {
  data(){
    return {
      items: [],
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
  methods: {
    parse_values(data) {
      console.log(data)
      // this.litems = data;
    },
    get_data(){
      axios
      .get('https://pinq.kapsi.fi/DK/api/data/games/' + this.$store.state.year + '/' + this.$store.state.liig)
      .then(response => (this.parse_values(response.data)));
    },
    Game_selected(items) {
      this.$bvModal.hide("modal-2")
      console.log(items)
      // this.$router.push({ name: 'Player_data', params: { id : items.id}}).catch(()=>{});
    },  
  },
  watch: {
    '$store.state.games_modal': function () {
      // console.log('modal',this.$store.state.player_id)
      this.get_data();
    },
    liig: function () {
        this.get_data();
      },
  },
}
</script>

<style lang="css" scoped>
</style>
