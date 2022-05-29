<template lang="html">
  <div>
    <b-table small :items="items" :fields="fields" class="font-weight-bold">
    </b-table>
  </div>
</template>

<script>

  export default {
    props:['player_data'],
    data(){
      return {
        items: [],
        fields: [
          { key: "Rounds_n", label: "Erät", headerTitle: "Erät"},
          { key: "Age", label: "Ikä", headerTitle: "Kyykkä kauseja takana"},
          { key: "Player_posSum",
            label: "HPka",
            formatter:(value, key, item) => {
              return (item.Player_posSum/item.Drows_n).toFixed(2);
            },
            headerTitle: "Heittopaikan keskiarvo"
          },
          { key: "Best_round", label: "Paras erä", headerTitle: "Paras erä"},        
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