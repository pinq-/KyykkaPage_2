<template lang="html">
  <div>
    <b-table v-b-tooltip striped hover :items="items" :fields="fields" class="font-weight-bold">
    </b-table>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    props:["liig", "year"],
    data(){
      return {
        items: [],
        player_id: 0,
        sortDesc: true,
        fields: [
          { key: "Rounds_n", label: "E", headerTitle: "Erät"},
          { key: "Player_resSum", label: "Hka",
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
          { key: "OFKL_p", label: "OFKL", headerTitle: "OFKL pisteet"},
          { key: "NKL_p", label: "NKL", headerTitle: "NKL pisteet"},
          { key: "4H", label: "4H", headerTitle: "Montako 4 hauuen putkea"},
        ]
      }
    },
    mounted() {
      this.get_data();
    },
    methods: {
      parse_values(data) {
        this.items = data[0];
        //console.log(data[0][0].Name)
        this.$emit('set_name', data[0][0].Name)
      },
      get_data(){
        axios
        .get('http://pinq.kapsi.fi/DK/api/data/player/' + this.player_id)
        .then(response => (this.parse_values(response.data)));
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
