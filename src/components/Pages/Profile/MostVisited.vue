<template>
  <div>
    <h2 class="mb-0">Most Visited Pages</h2>
    <BarExtendedList :list="ProfileStore.visitedSites" :labels="['Page', 'Keywords', 'Views']" :linkLabels="true" :keyLabel="'url'" :keyValue1="'words'" :keyValue2="'count'" :valueF1="(function(e) {return e.slice(0, 3).map((e) => {return e.word}).join(' ')})"></BarExtendedList>
    <h2 class="mb-0">Most Visited Domains</h2>
    <BarExtendedList :list="ProfileStore.visitedDomains" :labels="['Domain', 'Keywords', 'Views']" :linkLabels="true" :linkPrefix="'http://'" :keyLabel="'domain'" :keyValue1="'words'" :keyValue2="'count'" :valueF1="(function(e) {return e.slice(0, 3).map((e) => {return e.word}).join(' ')})"></BarExtendedList>
  </div>
</template>

<script>
  import ProfileStore from "../../../stores/ProfileStore";
  import BarList from "../../BarList.vue";
  import BarExtendedList from "../../BarExtendedList.vue";
  import TableList from "../../TableList.vue";

  export default {
    name: 'MostVisited',
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
