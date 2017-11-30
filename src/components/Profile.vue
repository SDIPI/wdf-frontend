<template>
  <div id="profile">
    <h1 class="display-4">Profile</h1>

    <!-- Word cloud -->
    <div id="accordion" role="tablist">
      <div class="card">
        <div class="card-header" role="tab" id="headingOne">
          <h2 class="mb-0">
            <a class="collapsed" data-toggle="collapse" href="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
              Word cloud
            </a>
          </h2>
        </div>
        <div id="collapseOne" class="collapse" role="tabpanel" aria-labelledby="headingOne" data-parent="#accordion">
          <div class="card-body">
            Soon
          </div>
        </div>
      </div>
    </div>

    <!-- Interests graph -->
    <div class="card">
      <div class="card-header" role="tab" id="headingTwo">
        <h2 class="mb-0">
          <a class="collapsed" data-toggle="collapse" href="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
            Interests graph
          </a>
        </h2>
      </div>
      <div id="collapseTwo" class="collapse" role="tabpanel" aria-labelledby="headingTwo" data-parent="#accordion">
        <div class="card-body">
          Soon
        </div>
      </div>
    </div>

    <!-- Website themes -->
    <div class="card">
      <div class="card-header" role="tab" id="headingThree">
        <h2 class="mb-0">
          <a class="collapsed" data-toggle="collapse" href="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
            Website themes
          </a>
        </h2>
      </div>
      <div id="collapseThree" class="collapse" role="tabpanel" aria-labelledby="headingThree" data-parent="#accordion">
        <div class="card-body">
          Soon
        </div>
      </div>
    </div>

    <!-- Most visited pages -->
    <div class="card">
      <div class="card-header" role="tab" id="headingFour">
        <h2 class="mb-0">
          <a class="collapsed" data-toggle="collapse" href="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
            Most visited pages
          </a>
        </h2>
      </div>
      <div id="collapseFour" class="collapse" role="tabpanel" aria-labelledby="headingFour" data-parent="#accordion">
        <div class="card-body">
          <BarList :list="ProfileStore.visitedSites" :labels="['Page', 'Views']" :keyLabel="'url'" :keyValue="'count'"></BarList>
        </div>
      </div>
    </div>

    <!-- Most visited domains -->
    <div class="card">
      <div class="card-header" role="tab" id="headingFive">
        <h2 class="mb-0">
          <a class="collapsed" data-toggle="collapse" href="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
            Most visited domains
          </a>
        </h2>
      </div>
      <div id="collapseFive" class="collapse" role="tabpanel" aria-labelledby="headingFive" data-parent="#accordion">
        <div class="card-body">
          <BarList :list="ProfileStore.visitedDomains" :labels="['Page', 'Views']" :keyLabel="'domain'" :keyValue="'count'"></BarList>
        </div>
      </div>
    </div>

    <!-- Most watched pages -->
    <div class="card">
      <div class="card-header" role="tab" id="headingSix">
        <h2 class="mb-0">
          <a class="collapsed" data-toggle="collapse" href="#collapseSix" aria-expanded="false" aria-controls="collapseSix">
            Most watched pages
          </a>
        </h2>
      </div>
      <div id="collapseSix" class="collapse" role="tabpanel" aria-labelledby="headingSix" data-parent="#accordion">
        <div class="card-body">
          <BarList :list="ProfileStore.watchedSites" :labels="['Page', 'Time']" :keyLabel="'url'" :keyValue="'time'"
                   :valueF="(function(data) {return this.$options.filters.toTime(data);})"></BarList>
        </div>
      </div>
    </div>

    <!-- Most watched domains -->
    <div class="card">
      <div class="card-header" role="tab" id="headingSeven">
        <h2 class="mb-0">
          <a class="collapsed" data-toggle="collapse" href="#collapseSeven" aria-expanded="false" aria-controls="collapseSeven">
            Most watched domains
          </a>
        </h2>
      </div>
      <div id="collapseSeven" class="collapse" role="tabpanel" aria-labelledby="headingSeven" data-parent="#accordion">
        <div class="card-body">
          <BarList :list="ProfileStore.watchedDomains" :labels="['Page', 'Time']" :keyLabel="'domain'" :keyValue="'time'"
                   :valueF="(function(data) {return this.$options.filters.toTime(data);})"></BarList>
        </div>
      </div>
    </div>

    <!-- History of sites -->
    <div class="card">
      <div class="card-header" role="tab" id="headingEight">
        <h2 class="mb-0">
          <a class="collapsed" data-toggle="collapse" href="#collapseEight" aria-expanded="false" aria-controls="collapseEight">
            History of sites
          </a>
        </h2>
      </div>
      <div id="collapseEight" class="collapse" role="tabpanel" aria-labelledby="headingEight" data-parent="#accordion">
        <div class="card-body">
          Soon
        </div>
      </div>
    </div>

    <!-- History of interests -->
    <div class="card">
      <div class="card-header" role="tab" id="headingNine">
        <h2 class="mb-0">
          <a class="collapsed" data-toggle="collapse" href="#collapseNine" aria-expanded="false" aria-controls="collapseNine">
            History of interests
          </a>
        </h2>
      </div>
      <div id="collapseNine" class="collapse" role="tabpanel" aria-labelledby="headingNine" data-parent="#accordion">
        <div class="card-body">
          Soon
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import ProfileStore from "../stores/ProfileStore";
  import BarList from "./BarList.vue";
  import TableList from "./TableList.vue";

  export default {
    name: 'Profile',
    components: {
      TableList,
      BarList
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
