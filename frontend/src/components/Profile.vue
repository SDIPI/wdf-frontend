<template>
  <div id="profile">
    <h1>Profile</h1>
    <div class="row">
      <div class="col">
        <h2>Word cloud</h2>
      </div>
      <div class="col">
        <h2>Interests graph</h2>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <h2>Website themes</h2>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <h2>Most visited sites ({{ProfileStore.visitedSites.length}})</h2>
        <table class="table">
          <thead>
          <tr>
            <th>#</th>
            <th>Site</th>
            <th># Pages</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(site, index) in ProfileStore.visitedSites">
            <th scope="row">{{index+1}}</th>
            <td>{{site.url}}</td>
            <td>{{site.count}}</td>
          </tr>
          </tbody>
        </table>
      </div>
      <div class="col">
        <h2>Most watched sites</h2>
        <table class="table">
          <thead>
          <tr>
            <th>#</th>
            <th>Site</th>
            <th># Pages</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <th scope="row">1</th>
            <td>youtube.com</td>
            <td>2123</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>reddit.com</td>
            <td>1429</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>stackoverflow.com</td>
            <td>813</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <h2>History of sites</h2>
      </div>
      <div class="col">
        <h2>History of interests</h2>
      </div>
    </div>
  </div>
</template>

<script>
import ProfileStore from "../stores/ProfileStore";

export default {
  data() {
    return {
      ProfileStore: ProfileStore.data
    };
  },
  methods: {

  }
}
</script>

<style>

</style>
