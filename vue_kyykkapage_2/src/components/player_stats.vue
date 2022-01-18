<template lang="html">
  <div>
    <b-table  responsive v-b-tooltip striped hover :items="items" :fields="fields" class="font-weight-bold">
    </b-table>
  </div>
</template>

<script>

  export default {
    props:['player_data', 'player_position_means'],
    data(){
      return {
        items: [],
        fields: [
          { key: "Rounds_n", label: "Erät", headerTitle: "Erät"},
          { key: "Player_posSum",
            label: "Keskimääräinen heittopaikka",
            formatter:(value, key, item) => {
              return Number((item.Player_posSum/item.Drows_n).toFixed(2));
            },
            headerTitle: "Heittopaikkakeskiarvo"
          },
          { key: "Best_drow", label: "Paras heitto", headerTitle: "Paras heitto"},        
          { key: "Age", label: "Ikä", headerTitle: "Kyykkä kauseja takana"},
          { key: "Player_resSum", label: "Pisteet", headerTitle: "Piseet"},
          { key: "Player_resSum", label: "1.", headerTitle: "Keskiarvo 1. heittopaikalta"},
          { key: "Player_resSum", label: "2.", headerTitle: "Keskiarvo 2. heittopaikalta"},
          { key: "Player_resSum", label: "3.", headerTitle: "Keskiarvo 3. heittopaikalta"},
          { key: "Player_resSum", label: "4.", headerTitle: "Keskiarvo 4. heittopaikalta"},
          { key: "OFKL_p", label: "OFKL pisteet", headerTitle: "OFKL pisteet"},
          { key: "NKL_p", label: "NKL pisteet", headerTitle: "NKL pisteet"},
          { key: "4H", label: "4H", headerTitle: "Montako 4 hauuen putkea"},
        ]
      }
    },
    watch: {
      player_data: function () {
        // consoel
        this.items = this.player_data;
      },
    },
  }
</script>

<style lang="css">
</style>
