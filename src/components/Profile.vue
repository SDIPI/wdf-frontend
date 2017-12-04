<template>
  <div id="profile">
    <h1 class="display-4">Profile</h1>

    <ul class="nav nav-pills nav-fill blue">
      <li class="nav-item">
        <router-link class="nav-link" to="/profile/wordcloud">Wordcloud</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link disabled" to="/profile/graph">Interests graph</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/profile/mostvisited">Most Visited</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/profile/mostwatched">Most Watched</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/profile/history">Interests history</router-link>
      </li>
    </ul>

    <router-view></router-view>

  </div>
</template>

<script>
  import ProfileStore from "../stores/ProfileStore";
  import BarList from "./BarList.vue";
  import TableList from "./TableList.vue";
  import MostVisited from "./Profile/MostVisited.vue";
  import MostWatched from "./Profile/MostWatched.vue";

  export default {
    name: 'Profile',
    components: {
      TableList,
      BarList,
      MostVisited,
      MostWatched
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
  .blue a.router-link-active {
    color: #fff !important;
    background-color: #007bff;
  }
</style>
