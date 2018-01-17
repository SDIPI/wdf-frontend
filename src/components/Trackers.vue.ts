import ProfileStore from "../stores/ProfileStore";
import BarList from "./BarList.vue";
import TableList from "./TableList.vue";
import MostVisited from "./Profile/MostVisited.vue";
import MostWatched from "./Profile/MostWatched.vue";
import Vue from "vue";
import Utils from '../utils';

export default Vue.extend({
  name: 'Trackers',
  components: {
    TableList,
    BarList,
    MostVisited,
    MostWatched
  },
  data() {
    return {
      ProfileStore: ProfileStore.data,
      Utils: Utils
    };
  },
  computed: {
    nbHiddenSending() {
      let total = 0;
      for (let domain in ProfileStore.data.trackersForm.active.from) {
        if (ProfileStore.data.trackersForm.active.from[domain] === true) total++;
      }
      return total;
    },
    nbHiddenRecieving() {
      let total = 0;
      for (let domain in ProfileStore.data.trackersForm.active.to) {
        if (ProfileStore.data.trackersForm.active.to[domain] === true) total++;
      }
      return total;
    }
  },
  methods: {
    refreshProfileStoreWithDates() {
      ProfileStore.methods.refreshEverything(true);
    }
  },
  mounted() {
    this.$data.ProfileStore.filterForm.endDate = Utils.today();
  }
});
