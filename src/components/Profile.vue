<template>
  <div id="profile">
    <h1>Profile</h1>
    <div class="row">
      <div class="col">
        <h2>Word cloud</h2>
      </div>
      <div class="col">
        <h2>Interests graph</h2>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <h2>Website themes</h2>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <h2>Most visited pages</h2>
        <TableList :list="ProfileStore.visitedSites" :labels="['Page', 'Views']" :displayF="(function (data) {return [data.url, data.count];})" />
      </div>
    </div>
    <div class="row">
      <div class="col">
        <h2>Most watched pages</h2>
        <TableList :list="ProfileStore.watchedSites" :labels="['Page', 'Seconds']" :displayF="(function (data) {return [data.url, this.$options.filters.toTime(data.time)];})" />
      </div>
    </div>
    <div class="row">
      <div class="col">
        <h2>History of sites</h2>
      </div>
      <div class="col">
        <h2>History of interests</h2>
      </div>
    </div>
  </div>
</template>

<script>
import ProfileStore from "../stores/ProfileStore";
import TableList from "./TableList.vue";

export default {
  name: 'Profile',
  components: {
    TableList
  },
  data() {
    return {
      ProfileStore: ProfileStore.data
    };
  },
  methods: {

  }
}
</script>

<style>

</style>
