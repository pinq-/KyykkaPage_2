<template>
  <div class="home">
    <b-container fluid>
      <b-row>
        <b-col col lg="6">
          <game_modals/>
          <b-card class="font-weight-bold theme2" header="4H kerholaiset" no-body>
            <fourh :liig="liig" :year="year"/>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>

import fourh from '@/components/extra/fourh.vue'
import game_modals from '@/components/game_modals.vue'

export default {
  name: 'Home',
  components: {
    fourh,
    game_modals
  },
  props:["year", "liig"],
}
</script>
