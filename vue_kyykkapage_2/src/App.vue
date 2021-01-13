<template>
  <div id="app">
    <b-navbar toggleable="lg" type="dark" variant="dark" class="font-weight-bold">
  <b-navbar-brand v-b-toggle.sidebar-1>
      <b-icon icon="arrow-bar-right" font-scale="2"></b-icon>
  </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        Kyykka tilastot
      </b-collapse>
    </b-navbar>
    <router-view :year="year"/>

    <div id="nav">
      <b-sidebar id="sidebar-1" title="Sidebar" no-header shadow backdrop>
        <template #default="{ hide }">
          <b-button variant="outline-info" class="mb-2" @click="hide">
              <b-icon icon="arrow-bar-left" font-scale="2"></b-icon>
         </b-button>
          <div class="px-3 py-2">
            <b-navbar-nav>
              <b-nav-item to="/"><b-icon icon="newspaper" font-scale="1.5"></b-icon> Etusivu</b-nav-item>
            </b-navbar-nav>
          </div>
        </template>
      </b-sidebar>
    </div>
  </div>
</template>
<script>

  export default {
    data(){
      return {
        year: 2020,
      }
    },
  }
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
.navbar.navbar-dark.bg-dark{
   background-color: #0D8F32!important;
}
</style>
