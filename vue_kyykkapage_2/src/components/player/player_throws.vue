<template lang="html">
  <div>
    <b-table responsive v-b-tooltip small striped hover :items="items" :fields="fields" class="font-weight-bold" @row-clicked="onRowCliked" :tbody-tr-class="rowClass">
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
      onRowCliked(items) {
        // this.$emit("set_game_id", items.id);
        this.$store.state.game_id = items.id;
        this.$store.state.game_modal *= -1;
        // console.log('player',this.$store.state.player_id)
        this.$bvModal.show("modal-1")
      },
      rowClass(item) {
        if (item.Throw_sum === this.player_round_throws[1]) return 'theme1'
        if ([item.throw_1, item.throw_2, item.throw_3, item.throw_4].every(element => element === 'h')) return 'table-danger'
      },


    },
    watch: {
      player_round_throws: function () {
        this.items = this.player_round_throws[0];
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
