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
  methods: {
  },
  beforeMount() {
    // We need to know the earliest day before mounting the element
    ProfileStore.methods.refreshOldest().then(() => {
      ProfileStore.methods.computeOldest();
      ProfileStore.data.filterForm.startDate = ProfileStore.data.oldest;
    });
    ProfileStore.methods.refreshEverything(false);
  }
})
