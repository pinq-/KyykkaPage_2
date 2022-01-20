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
          { key: "Age", label: "Ikä", headerTitle: "Kyykkä kauseja takana"},
          { key: "Player_posSum",
            label: "HPke",
            formatter:(value, key, item) => {
              return Number((item.Player_posSum/item.Drows_n).toFixed(2));
            },
            headerTitle: "Heittopaikan keskiarvo"
          },
          { key: "throw_mean1", label: "1.", headerTitle: "Keskiarvo 1. heittopaikalta"},
          { key: "throw_mean2", label: "2.", headerTitle: "Keskiarvo 2. heittopaikalta"},
          { key: "throw_mean3", label: "3.", headerTitle: "Keskiarvo 3. heittopaikalta"},
          { key: "throw_mean4", label: "4.", headerTitle: "Keskiarvo 4. heittopaikalta"},
          { key: "Best_drow", label: "Paras heitto", headerTitle: "Paras heitto"},        
          { key: "Player_resSum", label: "Pisteet", headerTitle: "Piseet"},
          { key: "OFKL_p", label: "OFKL pisteet", headerTitle: "OFKL pisteet"},
          { key: "NKL_p", label: "NKL pisteet", headerTitle: "NKL pisteet"},
        ]
      }
    },
    watch: {
      player_data: function () {
        // console.log(this.player_data)
        this.items = this.player_data;
      },
    },
  }
</script>

<style lang="css">
</style>
