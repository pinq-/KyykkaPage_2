<template lang="html">
  <div>
    <b-table striped hover :items="litems" :fields="fields" class="font-weight-bold">
      <template #cell(Event__Name)="data">
        <img v-if="data.item.Event__Name == 'NKL'" src="@/assets/NKL.png" width="30"/>
        <img v-else-if="data.item.Event__Name.startsWith('K')" src="@/assets/kyykkaliiga.png" width="30"/>
        <img v-else-if="data.item.Event__Name.startsWith('O')" src="@/assets/oamk.png" width="30"/>
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
    data(){
      return {
        litems: [],
        fields: [
          { key: "Game_time", formatter: (value) => {
            return moment.utc(value).format('HH:mm DD.MM.YY')
          }, label: 'Aika'},
          { key: "Event__Name", label: "Tapahtuma" },
          { key: "Home_team_name", label: "Koti joukkue"},
          { key: "Home_result", label: "Koti tulos"},
          { key: "Away_result", label: "Vieras tulos"},
          { key: "Away_team_name", label: "Vieras joukkue"},
          { key: "Temp", label: "Lämpötila"},
        ]
      }
    },
    mounted() {
      axios
      .get('https://pinq.kapsi.fi/DK/api/data/new_games_10/all')
      .then(response => (this.parse_values(response.data)));
    },
    methods: {
      parse_values(data) {
        this.litems = data;
      },
    }
  }
</script>

<style lang="css">
</style>
