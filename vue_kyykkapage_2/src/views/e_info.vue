<template>
  <div class="home">
    <b-container fluid>
      <b-row>
        <b-col col lg="6">
          <game_modals :selected_game="selected_game"/>
          <b-card class="font-weight-bold" header="4H kerholaiset" style="overflow:auto">
            <fourh :liig="liig" :year="year" v-on="$listeners"/>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
// @ is an alias to /src
import fourh from '@/components/fourh.vue'
import game_modals from '@/components/game_modals.vue'

export default {
  name: 'Home',
  components: {
    fourh,
    game_modals
  },
  props:["year", "liig", "selected_game"],
}
</script>
