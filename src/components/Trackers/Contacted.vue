<template>
  <div>
    <h2 class="mb-0">Most amount of communications</h2>
    <BarExtendedList :list="ProfileStore.visitedSites" :labels="['Page', 'Keywords', 'Views']" :keyLabel="'url'" :keyValue1="'words'" :keyValue2="'count'" :valueF1="(function(e) {return e.slice(0, 3).map((e) => {return e.word}).join(' ')})"></BarExtendedList>
  </div>
</template>

<script>
  import ProfileStore from "../../stores/ProfileStore";
  import BarList from "../BarList.vue";
  import BarExtendedList from "../BarExtendedList.vue";
  import TableList from "../TableList.vue";

  export default {
    name: 'Contacted',
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
