<template lang="html">
  <div>
    Kyllä
    <progress max="100" value="60">
  <strong>Progress: 60% done.</strong>
</progress>
  </div>
</template>

<script>

  export default {
    props:["liig"],
    data(){
      return {
        items: [],
      }
    },
    mounted() {
    },
    methods: {
    },
    watch: {
    }
  }
</script>

<style lang="css">
  
</style>
