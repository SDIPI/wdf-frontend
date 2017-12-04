<template>
  <div>
    <h2 class="mb-0">Most Watched Pages</h2>
    <BarList :list="ProfileStore.watchedSites" :labels="['Page', 'Time']" :keyLabel="'url'" :keyValue="'time'"
             :valueF="(function(data) {return this.$options.filters.toTime(data);})"></BarList>
    <h2 class="mb-0">Most Watched Domains</h2>
    <BarList :list="ProfileStore.watchedDomains" :labels="['Page', 'Time']" :keyLabel="'domain'" :keyValue="'time'"
             :valueF="(function(data) {return this.$options.filters.toTime(data);})"></BarList>
    <h2 class="mb-0">Themes</h2>
    <TableList :list="ProfileStore.tfIdf" :labels="['Page', 'Keywords']" :displayF="(function(el) {return [el['url'], el['top3']];})"></TableList>
  </div>
</template>

<script>
  import ProfileStore from "../../stores/ProfileStore";
  import BarList from "../BarList.vue";
  import TableList from "../TableList.vue";

  export default {
    name: 'MostWatched',
    components: {
      TableList,
      BarList
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
