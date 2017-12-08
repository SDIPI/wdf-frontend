<template>
  <div>
    <h2 class="mb-0">Most Watched Pages</h2>
    <BarExtendedList :list="ProfileStore.watchedSitesWithWords" :labels="['Page', 'Keywords', 'Time']"
                     :keyLabel="'url'" :keyValue1="'words'" :keyValue2="'time'"
                     :valueF1="(function(e) {return e.slice(0, 3).map((e) => {return e.word}).join(' ')})"
                     :valueF2="(function(data) {return this.$options.filters.toTime(data);})"></BarExtendedList>
    <h2 class="mb-0">Most Watched Domains</h2>
    <BarExtendedList :list="ProfileStore.watchedDomainsWithWords" :labels="['Domain', 'Keywords', 'Time']"
                     :keyLabel="'domain'" :keyValue1="'words'" :keyValue2="'time'"
                     :valueF1="(function(e) {return e.slice(0, 3).map((e) => {return e.word}).join(' ')})"
                     :valueF2="(function(data) {return this.$options.filters.toTime(data);})"></BarExtendedList>

  </div>
</template>

<script>
  import ProfileStore from "../../stores/ProfileStore";
  import BarList from "../BarList.vue";
  import BarExtendedList from "../BarExtendedList.vue";
  import TableList from "../TableList.vue";

  export default {
    name: 'MostWatched',
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
