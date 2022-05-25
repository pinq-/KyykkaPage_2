<template lang="html">
  <div>
    <b-table  responsive v-b-tooltip striped hover :items="items" :fields="fields" class="font-weight-bold">
    </b-table>
  </div>
</template>

<script>

  export default {
    props:['team_data'],
    data(){
      return {
        items: [],
        fields: [
          { key: "Games_n", label: "O", headerTitle: "Ottelut"},
          { key: "Game_mean",
            label: "Oka",
            formatter:(value, key, item) => {
              return Number((item.Game_mean/item.Games_n).toFixed(2));
            },
            headerTitle: "Ottelukeskiarvo"
          },
          { key: "Best_game", label: "Paras peli"},        
          { key: "Throw_avg", label: "Hka", headerTitle: "Heittokeskiarvo"},
          { key: "hauki_pro", label: "H%", headerTitle: "Haukiprosentti"},
          { key: "null_pro", label: "0%", headerTitle: "Nollaprosentti"},
          { key: "Kokemus", label: "Ikä", headerTitle: "Kuinka monta vuotta kokemusta"},
        ]
      }
    },
    watch: {
      team_data: function () {
        // console.log(this.team_data)
        this.items = this.team_data;
      },
    },
  }
</script>

<style lang="css">
</style>
