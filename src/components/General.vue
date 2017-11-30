<template>
  <div id="profile">
    <h1 class="display-4">General</h1>

    <p>
      Welcome to your dashboard of Web Digital Footprints.
    </p>

  </div>
</template>

<script>
  import ProfileStore from "../stores/ProfileStore";

  export default {
    name: 'General',
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
