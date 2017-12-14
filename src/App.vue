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
            <li class="nav-item">
              <router-link class="nav-link exact" to="/">General</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/trackers">Trackers</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/profile">Profile</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/stats">Stats</router-link>
            </li>
          </ul>
          <ul class="navbar-nav justify-content-end">
            <li class="nav-item">
              <router-link class="nav-link" to="/settings">Settings</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <div class="container">
      <router-view v-if="ProfileStore.connected"/>
      <div v-if="ProfileStore.connected === null">Connecting...</div>
      <div v-if="ProfileStore.connected == false">You're not connected.</div>
    </div>

    <div id="alert_placeholder"></div>

    <hr>

    <footer class="footer">
      <div class="container">
        <p class="text-muted">wdf-frontend sources available on <a href="https://github.com/SDIPI/wdf-frontend">GitHub</a>
        </p>
      </div>
    </footer>
  </div>
</template>

<script lang="ts" src="./App.vue.ts"></script>

<style>
  #app {
    font-family: 'Arimo', sans-serif;
  }

  img.logo {
    max-height: 44px;
  }

  a.router-link-exact-active.exact {
    color: #fff !important;
  }

  a.router-link-active:not(.exact) {
    color: #fff !important;
  }

  var {
    padding-right: 2px;
  }

  #alert_placeholder {
    bottom: 20px;
    position: absolute;
    margin: auto;
    left: 0;
    right: 0;
    z-index: 2;
    text-align: center;
    background-color: #ffffff;
    line-height: 2em;
  }
</style>
