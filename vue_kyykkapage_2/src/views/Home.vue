<template>
  <div class="home">
    <b-row>
      <b-col>
        <new_games/>
      </b-col>
      <b-col>
        <histogram :year="year"/>
      </b-col>
    </b-row>
  </div>
</template>

<script>
// @ is an alias to /src
import new_games from '@/components/new_games.vue'
import histogram from '@/components/histogram.vue'

export default {
  name: 'Home',
  components: {
    new_games,
    histogram
  },
  props:["year"],
}
</script>
