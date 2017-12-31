<template>
  <div id="profile">
    <h1 class="display-4">Profile</h1>
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

    <ul class="nav nav-pills nav-fill blue">
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

    <router-view v-if="!ProfileStore.loading"></router-view>

    <div class="loader" v-if="ProfileStore.loading"></div>
    <div class="middleText" v-if="ProfileStore.loading">Loading data from server</div>

  </div>
</template>

<script lang="ts" src="./Profile.vue.ts"></script>

<style>
  .blue a.router-link-active {
    color: #fff !important;
    background-color: #007bff;
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
</style>
