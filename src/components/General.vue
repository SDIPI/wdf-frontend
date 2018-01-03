<template>
  <div id="profile">
    <h1>General</h1>

    <p>
      Welcome to your dashboard of Web Digital Footprints.
    </p>

    <h2>About</h2>
    <p>
      <b>Web Digital Footprints</b> is a project that aims to create a browser extension that analyses users' web browsing habits. The goal is to raise awareness about what kind of information are leave while browsing, and how these informations can be used by third parties to infer personal informations.
    </p>

    <p>
      This view is an <b>early version</b> of the features of the extension.
    </p>

    <p>
      This project is developed by Kewin Dousse as part of a Master project for the <a href="https://sdipi.ch">SDIPI</a>.
    </p>

    <p>
      All the source code related to this project including the browser extension, server backend and this interface are open-source and available on <a href="https://github.com/SDIPI">GitHub</a>.
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
