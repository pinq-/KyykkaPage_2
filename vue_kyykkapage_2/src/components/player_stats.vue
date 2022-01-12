<template lang="html">
  <div>
    <b-table responsive v-b-tooltip striped hover :items="items" :fields="fields" class="font-weight-bold">
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
          { key: "Rounds_n", label: "E", headerTitle: "Erät"},
          { key: "Hka", label: "Hka",
            formatter:(value, key, item) => {
              return Number((item.Player_resSum/item.Drows_n).toFixed(2));
            },
            headerTitle: "Heittokeskiarvo"},
          { key: "Player_posSum",
            label: "HPka",
            formatter:(value, key, item) => {
              return Number((item.Player_posSum/item.Drows_n).toFixed(2));
            },
            headerTitle: "Heittopaikkakeskiarvo"
          },
          { key: "Best_drow", label: "PH", headerTitle: "Paras heitto"},
          { key: "Hauki_n",
            label: "H%",
            formatter:(value, key, item) => {
              return Number((item.Hauki_n/item.Drows_n).toFixed(2) * 100);
            },
            headerTitle: "Haukiprosentti"
          },          
          { key: "Nolla_n",
            label: "N%",
            formatter:(value, key, item) => {
              return Number((item.Nolla_n/item.Drows_n).toFixed(2) * 100);
            },
            headerTitle: "Nollaprosentti"
          },
          { key: "Age", label: "Ikä", headerTitle: "Kyykkä kauseja takana"},
          { key: "Player_resSum", label: "p.", headerTitle: "Piseet"},
          { key: "OFKL_p", label: "OFKL", headerTitle: "OFKL pisteet"},
          { key: "NKL_p", label: "NKL", headerTitle: "NKL pisteet"},
          { key: "4H", label: "4H", headerTitle: "Montako 4 hauuen putkea"},
        ]
      }
    },
    watch: {
      player_data: function () {
        this.items = this.player_data;
      },

    },
  }
</script>

<style lang="css">
</style>
