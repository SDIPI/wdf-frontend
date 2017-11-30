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
        <BarList :list="ProfileStore.visitedSites" :labels="['Page', 'Views']" :keyLabel="'url'" :keyValue="'count'" />
      </div>
    </div>
    <div class="row">
      <div class="col">
        <h2>Most visited domains</h2>
        <BarList :list="ProfileStore.visitedDomains" :labels="['Page', 'Views']" :keyLabel="'domain'" :keyValue="'count'" />
      </div>
    </div>
    <div class="row">
      <div class="col">
        <h2>Most watched pages</h2>
        <BarList :list="ProfileStore.watchedSites" :labels="['Page', 'Time']" :keyLabel="'url'" :keyValue="'time'" :valueF="(function(data) {return this.$options.filters.toTime(data);})"/>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <h2>Most watched domains</h2>
        <BarList :list="ProfileStore.watchedDomains" :labels="['Page', 'Time']" :keyLabel="'domain'" :keyValue="'time'" :valueF="(function(data) {return this.$options.filters.toTime(data);})"/>
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
import BarList from "./BarList.vue";
import TableList from "./TableList.vue";

export default {
  name: 'Profile',
  components: {
    TableList,
    BarList
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
