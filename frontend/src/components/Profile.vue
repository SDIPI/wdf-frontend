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
        <h2>Most visited sites</h2>
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
            <td>reddit.com</td>
            <td>3919</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>20minutes.ch</td>
            <td>3100</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>heia-fr.ch</td>
            <td>2655</td>
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
      newProfileData: null,
      ProfileStore: ProfileStore.data
    };
  },
  methods: {
    addData(number) {
      ProfileData.methods.addData(number);
      this.newProfileData = number;
    }
  }
}
</script>

<style>

</style>
