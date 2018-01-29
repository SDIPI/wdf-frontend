<template>
  <div>
    <h2 class="mb-0">Your stats</h2>
    <div class="router-view">

      <div class="row">
        <div class="col-sm">
          <div class="card bg-light" style="max-width: 20rem;">
            <div class="card-header">Requests gathered</div>
            <div class="card-body">
              <h4 class="card-title">{{ ProfileStore.stats.nbRequests }}</h4>
              <p class="card-text">total requests were gathered.</p>
            </div>
          </div>
        </div>
        <div class="col-sm">
          <div class="card bg-light" style="max-width: 20rem;">
            <div class="card-header">Trackers amount</div>
            <div class="card-body">
              <h4 class="card-title">{{ ProfileStore.api.getTrackersStats.nbTrackers }}</h4>
              <p class="card-text">total different trackers were registered.</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

ProfileStore.data.stats.nbRequests

<script>
  import ProfileStore from "../../../stores/ProfileStore";
  import BarList from "../../BarList.vue";
  import BarExtendedList from "../../BarExtendedList.vue";
  import TableList from "../../TableList.vue";

  export default {
    name: 'UserStats',
    components: {
      TableList,
      BarList,
      BarExtendedList
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
