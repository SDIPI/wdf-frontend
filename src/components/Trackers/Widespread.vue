<template>
  <div>
    <h2 class="mb-0">Most revealing domains</h2>
    <BarExtendedList :list="ProfileStore.trackersPage.mostSending" :labels="['Domain', 'Data', 'Requests']" :keyLabel="'from'" :keyValue1="'size'" :keyValue2="'amount'" :valueF1="(function(e) {return Math.floor(e/8/1024) + ' kB';})"></BarExtendedList>
  </div>
</template>

<script>
  import ProfileStore from "../../stores/ProfileStore";
  import BarList from "../BarList.vue";
  import BarExtendedList from "../BarExtendedList.vue";
  import TableList from "../TableList.vue";

  export default {
    name: 'Widespread',
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
