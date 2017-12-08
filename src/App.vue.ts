import ProfileStore from "./stores/ProfileStore";
import "./filters";
import Vue from "vue";
export default Vue.extend({
  name: 'app',
  data() {
    return {
      ProfileStore: ProfileStore.data
    };
  },
  beforeMount() {
    ProfileStore.methods.connectionState().then(() => {
      if (ProfileStore.data.connected) {
        let visitedSitesP = ProfileStore.methods.refreshVisitedSites();
        let watchedSitesP = ProfileStore.methods.refreshWatchedSites();
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
})
