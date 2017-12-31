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
  },
  beforeMount() {
    let oldestP = ProfileStore.methods.refreshOldest().then(() => {
      ProfileStore.methods.computeOldest();
      ProfileStore.data.filterForm.startDate = ProfileStore.data.oldest;
    });
    ProfileStore.methods.refreshEverything(false);
  }
})
