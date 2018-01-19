<template>
  <div id="trackers">
    <div class="row">
      <div class="col-md-auto before-tabs">
        <h1>Trackers</h1>
      </div>
      <div class="col contains-tabs">
        <ul class="nav nav-tabs nav-fill blue">
          <li class="nav-item">
            <router-link class="nav-link" to="/trackers/send" v-on:click="ProfileStore.trackersForm.modalList.splice()">
              Most sending
              <span v-if="ProfileStore.trackersForm.nbHiddenSending > 0" class="badge badge-warning">{{ProfileStore.trackersForm.nbHiddenSending}} hidden</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/trackers/receive" v-on:click="ProfileStore.trackersForm.modalList.splice()">
              Most recieving
              <span v-if="ProfileStore.trackersForm.nbHiddenRecieving > 0" class="badge badge-warning">{{ProfileStore.trackersForm.nbHiddenRecieving}} hidden</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/trackers/stats">Stats</router-link>
          </li>
        </ul>
      </div>

      <div class="col-md-auto after-tabs">
        <div class="btn-group">
          <button type="button" class="btn btn-secondary" v-on:click="exportJson()">
            Export data
          </button>
        </div>
      </div>
    </div>

    <router-view v-if="!ProfileStore.loadingTrackers" class="router-view"></router-view>

    <div class="loader" v-if="ProfileStore.loadingTrackers"></div>
    <div class="middleText" v-if="ProfileStore.loadingTrackers">Loading data from server</div>

  </div>
</template>

<script lang="ts" src="./Trackers.vue.ts"></script>

<style>
  .blue a.router-link-active {
    color: #000 !important;
    border-color: #dee2e6 #dee2e6 #fff !important;
    background: linear-gradient(#343a40, #343a40 5%, white 5%);
  }

  .filter {
    margin: 1rem;
  }

  .middleText {
    margin: 50px auto;
    text-align: center;
  }

  .loader {
    border: 16px solid #f3f3f3; /* Light grey */
    border-top: 16px solid #ff0000; /* Blue */
    border-radius: 50%;
    width: 120px;
    height: 120px;
    animation: spin 2s linear infinite;
    margin: 50px auto;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  ul.nav {
    height: 100%;
    align-items: flex-end;
  }

  .contains-tabs {
    padding-left: 0;
    padding-right: 0;
  }

  .before-tabs {
    margin-left: 15px;
    padding-left: 0;
    border-bottom: 1px solid #dee2e6;
  }

  .after-tabs {
    display: flex;
    align-items: center;
    border-bottom: 1px solid #dee2e6;
  }

  .router-view {
    margin-top: 14px;
  }

  #trackers {
    margin-top: 4px;
  }
</style>
