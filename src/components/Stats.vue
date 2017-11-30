<template>
  <div id="profile">
    <h1 class="display-4">Stats</h1>

    <p>
      We have a total of {{ ProfileStore.nbDocuments }} different pages.
    </p>

  </div>
</template>

<script>
  import ProfileStore from "../stores/ProfileStore";

  export default {
    name: 'Stats',
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
