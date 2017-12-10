import ProfileStore from "./stores/ProfileStore";
import "./filters";
import Vue from "vue";

function sealed(constructor: Function) {
  Object.seal(constructor);
  Object.seal(constructor.prototype);
}

export default Vue.extend({
  name: 'app',
  data() {
    return {
      ProfileStore: ProfileStore.data
    };
  },
  methods: {
    refreshEverything(dates: boolean) {
      ProfileStore.methods.connectionState().then(() => {
        if (ProfileStore.data.connected) {
          let visitedSitesP = ProfileStore.methods.refreshVisitedSites(dates);
          let watchedSitesP = ProfileStore.methods.refreshWatchedSites(dates);
          Promise.all([visitedSitesP, watchedSitesP]).then(() => {
            ProfileStore.methods.refreshNbDocuments().then(() => {
              ProfileStore.methods.refreshHistory();
              ProfileStore.methods.refreshTfIdf();
              ProfileStore.methods.refreshInterests();
            });
          });
        }
      });
    }
  },
  beforeMount() {
    let oldestP = ProfileStore.methods.refreshOldest().then(() => {
      ProfileStore.data.filterForm.startDate = ProfileStore.data.oldest;
    });
    this.refreshEverything(false);
  }
})
