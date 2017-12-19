<template>
  <div id="trackers">
    <h1 class="display-4">Trackers</h1>
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

    <router-view v-if="!ProfileStore.loading"></router-view>

    <div class="loader" v-if="ProfileStore.loading"></div>
    <div class="middleText" v-if="ProfileStore.loading">Loading data from server</div>

  </div>
</template>

<script lang="ts" src="./Trackers.vue.ts"></script>

<style>

</style>
