<template>
  <div>
    <h2 class="mb-0">Most Visited Pages</h2>
    <BarList :list="ProfileStore.visitedSites" :labels="['Page', 'Views']" :keyLabel="'url'" :keyValue="'count'"></BarList>
    <h2 class="mb-0">Most Visited Domains</h2>
    <BarList :list="ProfileStore.visitedDomains" :labels="['Page', 'Views']" :keyLabel="'domain'" :keyValue="'count'"></BarList>
    <h2 class="mb-0">Themes</h2>
    <TableList :list="ProfileStore.tfIdf" :labels="['Page', 'Keywords']" :displayF="(function(el) {return [el['url'], el['top3']];})"></TableList>
  </div>
</template>

<script>
  import ProfileStore from "../../stores/ProfileStore";
  import BarList from "../BarList.vue";
  import TableList from "../TableList.vue";

  export default {
    name: 'MostVisited',
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
