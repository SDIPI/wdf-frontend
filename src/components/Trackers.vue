<template>
  <div id="profile">
    <h1 class="display-4">Trackers</h1>

    <p>
      Soon
    </p>

  </div>
</template>

<script>
  import ProfileStore from "../stores/ProfileStore";

  export default {
    name: 'Trackers',
    components: {
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
