<template>
  <div>
    <h2 class="mb-0">Most contacted trackers</h2>
    <BarList :list="ProfileStore.api.getMostPresentTrackers" :labels="['Domain', 'Requests']" :keyLabel="'requestDomain'" :keyValue="'count'" :valueF1="(function(e) {return e.slice(0, 3).map((e) => {return e.word}).join(' ')})"></BarList>
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
