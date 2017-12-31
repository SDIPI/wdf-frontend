<template>
  <div id="profile">
    <div class="row">
      <div class="col-md-auto before-tabs">
        <h1>Profile</h1>
      </div>
      <div class="col contains-tabs">
        <ul class="nav nav-tabs nav-fill blue">
          <li class="nav-item">
            <router-link class="nav-link" to="/profile/wordcloud">Wordcloud</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/profile/graph">Topics graph</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/profile/mostvisited">Most Visited</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/profile/mostwatched">Most Watched</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/profile/history">History</router-link>
          </li>
        </ul>
      </div>
    </div>
    <div id="exampleAccordion" data-children=".item">
      <div class="item">
        <a class="dropdown-toggle" data-toggle="collapse" data-parent="#exampleAccordion" href="#exampleAccordion1" aria-expanded="true" aria-controls="exampleAccordion1">
          Filter by date
        </a>
        <div id="exampleAccordion1" class="collapse" role="tabpanel">
          <form class="form-inline filter" v-on:submit.prevent>
            <div class="form-group">
              <label for="startDate">From</label>
              <input type="date" v-model="ProfileStore.filterForm.startDate" :min="ProfileStore.oldest" :max="Utils.today()" class="form-control mx-sm-3" placeholder="Start date" id="startDate">
              <label for="endDate">To</label>
              <input type="date" v-model="ProfileStore.filterForm.endDate" :min="ProfileStore.oldest" :max="Utils.today()" class="form-control mx-sm-3" placeholder="End date" id="endDate">
              <button type="submit" class="btn btn-primary" v-on:click="refreshProfileStoreWithDates(true)" :disabled="ProfileStore.loading">Apply</button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <router-view v-if="!ProfileStore.loading"></router-view>

    <div class="loader" v-if="ProfileStore.loading"></div>
    <div class="middleText" v-if="ProfileStore.loading">Loading data from server</div>

  </div>
</template>

<script lang="ts" src="./Profile.vue.ts"></script>

<style>
  .blue a.router-link-active {
    color: #000 !important;
    border-color: #dee2e6 #dee2e6 #fff !important;
    /*background-color: #007bff;*/
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
  }

  .before-tabs {
    margin-left: 15px;
    padding-left: 0;
    border-bottom: 1px solid #dee2e6;
  }
</style>
