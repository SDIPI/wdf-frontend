<template>
  <div id="profile">
    <h1 class="display-4">Profile</h1>
    <div id="exampleAccordion" data-children=".item">
      <div class="item">
        <a class="dropdown-toggle" data-toggle="collapse" data-parent="#exampleAccordion" href="#exampleAccordion1" aria-expanded="true" aria-controls="exampleAccordion1">
          Filter by date
        </a>
        <div id="exampleAccordion1" class="collapse" role="tabpanel">
          <form class="form-inline filter">
            <div class="form-group">
              <label for="startDate">From</label>
              <input type="text" class="form-control mx-sm-3" placeholder="First name" id="startDate">
              <label for="endDate">To</label>
              <input type="text" class="form-control mx-sm-3" placeholder="Last name" id="endDate">
              <button type="submit" class="btn btn-primary">Apply</button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <ul class="nav nav-pills nav-fill blue">
      <li class="nav-item">
        <router-link class="nav-link" to="/profile/wordcloud">Wordcloud</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/profile/graph">Interests graph</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/profile/mostvisited">Most Visited</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/profile/mostwatched">Most Watched</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/profile/history">History</router-link>
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

  .filter {
    margin: 1rem;
  }
</style>
