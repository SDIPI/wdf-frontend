<template>
  <div id="trackers">
    <div class="row">
      <div class="col-md-auto before-tabs">
        <h1>Trackers</h1>
      </div>
      <div class="col contains-tabs">
        <ul class="nav nav-tabs nav-fill blue">
          <li class="nav-item">
            <router-link class="nav-link" to="/trackers/widespread">Most widespread</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/trackers/contacted">Most contacted</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/trackers/stats">Stats</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/trackers/flow">Information flux</router-link>
          </li>
        </ul>
      </div>
      <div class="col-md-auto after-tabs">
        <div class="btn-group">
          <button type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Date filter
          </button>
          <form class="dropdown-menu p-4 dropdown-menu-right" v-on:submit.prevent>
            <div class="form-group">
              <label for="startDate">From</label>
              <input type="date" v-model="ProfileStore.filterForm.startDate" :min="ProfileStore.oldest" :max="Utils.today()" class="form-control" placeholder="Start date" id="startDate">
            </div>
            <div class="form-group">
              <label for="endDate">To</label>
              <input type="date" v-model="ProfileStore.filterForm.endDate" :min="ProfileStore.oldest" :max="Utils.today()" class="form-control" placeholder="End date" id="endDate">
            </div>
            <button type="submit" class="btn btn-primary" v-on:click="refreshProfileStoreWithDates(true)" :disabled="ProfileStore.loading">Apply</button>
          </form>
        </div>
      </div>
    </div>

    <router-view v-if="!ProfileStore.loading" class="router-view"></router-view>

    <div class="loader" v-if="ProfileStore.loading"></div>
    <div class="middleText" v-if="ProfileStore.loading">Loading data from server</div>

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
