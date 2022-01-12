<template lang="html">
  <div>
    <b-table responsive v-b-tooltip small striped hover :items="items" :fields="fields" class="font-weight-bold" @row-clicked="onRowSelected">
      <template #cell(throw_1) = "data">
        <b v-if="data.item.throw_1 == data.item.Best_drow">
          {{ data.item.throw_1 }}
        </b>
        <p v-else>
          {{ data.item.throw_1 }}
        </p>
      </template>
      <template #cell(throw_2) = "data">
        <b v-if="data.item.throw_2 == data.item.Best_drow">
          {{ data.item.throw_2 }}
        </b>
        <p v-else>
          {{ data.item.throw_2 }}
        </p>
      </template>
      <template #cell(throw_3) = "data">
        <b v-if="data.item.throw_3 == data.item.Best_drow">
          {{ data.item.throw_3 }}
        </b>
        <p v-else>
          {{ data.item.throw_3 }}
        </p>
      </template>
      <template #cell(throw_4) = "data">
        <b v-if="data.item.throw_4 == data.item.Best_drow">
          {{ data.item.throw_4 }}
        </b>
        <p v-else>
          {{ data.item.throw_4 }}
        </p>
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
      onRowSelected(items) {
        // console.log(items.id)
        this.$emit("set_game_id", items.id);
        // // console.log(this.$refs.childComponent);
        this.$bvModal.show("modal-1")
        // this.$refs['v-b-modal.modal-1'].show()
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
</style>
