<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container">
        <a class="navbar-brand" href="#"><img src="./assets/logo_notext.png" class="logo"> Web Digital Footprints</a>
        <button class="navbar-toggler navbar-toggler-right hidden-lg-up" type="button" data-toggle="collapse"
                data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false"
                aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarsExampleDefault">
          <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
            <li class="nav-item active">
              <router-link class="nav-link" to="general">General</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="trackers">Trackers</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="profile">Profile</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="stats">Stats</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <div class="container">
      <router-view/>
    </div>

    <hr>

    <footer class="footer">
      <div class="container">
        <p class="text-muted">wdf-server sources available on <a href="https://github.com/SDIPI/wdf-server">GitHub</a>
        </p>
      </div>
    </footer>
  </div>
</template>

<script>
  import ProfileStore from "./stores/ProfileStore";
  export default {
    name: 'app',
    data() {
      return {
        ProfileStore: ProfileStore.data
      };
    },
    mounted() {
      ProfileStore.methods.refreshVisitedSites();
    }
  }
</script>

<style>
  #app {
    font-family: 'Arimo', sans-serif;
  }

  img.logo {
    max-height: 44px;
  }
</style>
