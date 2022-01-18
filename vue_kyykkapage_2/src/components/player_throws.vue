<template lang="html">
  <div>
    <b-table responsive v-b-tooltip small striped hover :items="items" :fields="fields" class="font-weight-bold" @row-clicked="onRowCliked">
      <template #cell(throw_1) = "data">
        <b v-if="data.item.throw_1 == data.item.Best_drow" class = 'paras theme1' >
          {{ data.item.throw_1 }}
        </b>
        <b v-else>
          {{ data.item.throw_1 }}
        </b>
      </template>
      <template #cell(throw_2) = "data">
        <b v-if="data.item.throw_2 == data.item.Best_drow" class = 'paras theme1' >
          {{ data.item.throw_2 }}
        </b>
        <b v-else>
          {{ data.item.throw_2 }}
        </b>
      </template>
      <template #cell(throw_3) = "data">
        <b v-if="data.item.throw_3 == data.item.Best_drow" class = 'paras theme1' >
          {{ data.item.throw_3 }}
        </b>
        <b v-else>
          {{ data.item.throw_3 }}
        </b>
      </template>
      <template #cell(throw_4) = "data">
        <b v-if="data.item.throw_4 == data.item.Best_drow" class = 'paras theme1' >
          {{ data.item.throw_4 }}
        </b>
        <b v-else>
          {{ data.item.throw_4 }}
        </b>
      </template>
    </b-table>
  </div>
</template>

<script>
  export default {
    props:['player_round_throws'],
    data(){
      return {
        items: [],
        fields: [
          { key: "Game_time", label: "Pvm"},
          { key: "opponent", label: "Vastustaja",headerTitle: "Vastustaja"},
          { key: "Player_position", label: "HP", headerTitle: "Heittopaikka"},
          { key: "Game_round", label: "Erä"},
          { key: "throw_1", label: "1", headerTitle: "Ensimmäinen heitto"},
          { key: "throw_2", label: "2", headerTitle: "Toinen heitto"},
          { key: "throw_3", label: "3", headerTitle: "Kolmas heitto"},
          { key: "throw_4", label: "4", headerTitle: "Neljäs heitto"},
          { key: "Throw_sum", label: "Yht.", headerTitle: "Yhteens"},
          { key: "throw_mean", label: "Hka", headerTitle: "Heittokeskiarvo"},
        ]
      }
    },
    mounted() {
      // this.get_data();
    },
    methods: {
      parse_values(data) {
        this.items = data;
        // console.log(data)
      },
      onRowCliked(items) {
        // this.$emit("set_game_id", items.id);
        this.$store.state.player_id = items.id;
        this.$store.state.game_modal *= -1;
        // console.log('player',this.$store.state.player_id)
        this.$bvModal.show("modal-1")
      },


    },
    watch: {
      player_round_throws: function () {
        this.items = this.player_round_throws;
      },

    },
  }
</script>

<style lang="css">
  .paras{
    color: $theme4 !important;
    border-radius:10px;
  }
</style>
