<template>
  <div>
    <h2 class="mb-0">Trackers stats</h2>
    <div class="card bg-light mb-3" style="max-width: 20rem;">
      <div class="card-header">Trackers</div>
      <div class="card-body">
        <h4 class="card-title">{{ ProfileStore.api.getTrackersStats.nbTrackers }}</h4>
        <p class="card-text">different trackers were contacted.</p>
      </div>
    </div>
  </div>
</template>

<script>
  import ProfileStore from "../../stores/ProfileStore";
  import BarList from "../BarList.vue";
  import BarExtendedList from "../BarExtendedList.vue";
  import TableList from "../TableList.vue";

  export default {
    name: 'Stats',
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
