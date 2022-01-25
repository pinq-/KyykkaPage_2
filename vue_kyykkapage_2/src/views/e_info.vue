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
        <b-col>
          <b-card class="font-weight-bold theme2" header="Hyödyllisiä linkkejä" no-body>
             <b-link href="https://www.kyykkaliiga.fi/">Kyykkaliiga (Tampere)</b-link>
             <b-link href="https://kyykka.com/">NKL (Lappeenranta)</b-link>
             <b-link href="https://www.oamkry.fi/">Oamkry (Oulu)</b-link>
             Youtubekanavat:
             <b-link href="https://www.youtube.com/channel/UCCacZGJtAXtGDqGm59n6bcA/">NKL</b-link>
             <b-link href="https://www.youtube.com/channel/UCOOtT4uAqsaXH9r19lxaHEg">Ripe Kimari</b-link>
             <b-link href="https://www.youtube.com/c/TampereenAkateeminenKyykk%C3%A4Seura">TAKS</b-link>
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
