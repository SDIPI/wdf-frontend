<template>
  <div>
    <h2 class="mb-0">Most contacted trackers</h2>
    <BarExtendedList :list="ProfileStore.trackersPage.mostRecieving" :labels="['Domain', 'Data', 'Requests']" :keyLabel="'to'" :keyValue1="'size'" :keyValue2="'amount'" :valueF1="(function(e) {return Math.floor(e/8/1024) + ' kB';})"></BarExtendedList>
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
