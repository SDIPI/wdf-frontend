<template>
  <div>
    <h2 class="mb-0">Most Visited Pages</h2>
    <BarExtendedList :list="ProfileStore.visitedSitesWithWords" :labels="['Page', 'Words', 'Views']" :keyLabel="'url'" :keyValue1="'words'" :keyValue2="'count'" :valueF1="(function(e) {return e.slice(0, 3).map((e) => {return e.word}).join(', ')})"></BarExtendedList>
    <h2 class="mb-0">Most Visited Domains</h2>
    <BarList :list="ProfileStore.visitedDomains" :labels="['Page', 'Views']" :keyLabel="'domain'" :keyValue="'count'"></BarList>
    <h2 class="mb-0">Themes</h2>
    <TableList :list="ProfileStore.tfIdf" :labels="['Page', 'Keywords']" :displayF="(function(el) {return [el['url'], el['top3']];})"></TableList>
  </div>
</template>

<script>
  import ProfileStore from "../../stores/ProfileStore";
  import BarList from "../BarList.vue";
  import BarExtendedList from "../BarExtendedList.vue";
  import TableList from "../TableList.vue";

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
