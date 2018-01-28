<template>
  <div>
    <h2 class="mb-0">Global stats</h2>
    <div v-if="!ProfileStore.loadingTrackers" class="router-view">
      <div class="row">
        <div class="col-sm">
          <div class="card bg-light" style="max-width: 20rem;">
            <div class="card-header">Requests gathered</div>
            <div class="card-body">
              <h4 class="card-title">{{ ProfileStore.api.getGeneralStats.totalRequests }}</h4>
              <p class="card-text">total requests were gathered.</p>
            </div>
          </div>
        </div>
        <div class="col-sm">
          <div class="card bg-light" style="max-width: 20rem;">
            <div class="card-header">Trackers amount</div>
            <div class="card-body">
              <h4 class="card-title">{{ ProfileStore.api.getGeneralStats.trackersNb }}</h4>
              <p class="card-text">total different trackers were registered.</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="loader" v-if="ProfileStore.loadingStats"></div>
    <div class="middleText" v-if="ProfileStore.loadingStats">Loading data from server</div>
  </div>

</template>

<script>
  import ProfileStore from "../../stores/ProfileStore";

  export default {
    name: 'GlobalStats',
    components: {
    },
    data() {
      return {
        ProfileStore: ProfileStore.data
      };
    },
    methods: {}
  }
</script>

<style>
</style>
