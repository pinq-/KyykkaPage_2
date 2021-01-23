<template>
  <div class="home">
    <b-container fluid>
      <b-row>
        <b-col col lg="5">
          <b-card class="font-weight-bold" header="4H kerholaiset" style="overflow:auto">
            <fourh :liig="liig" :year="year"/>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
// @ is an alias to /src
import fourh from '@/components/fourh.vue'

export default {
  name: 'Home',
  components: {
    fourh
  },
  props:["year", "liig"],
}
</script>
