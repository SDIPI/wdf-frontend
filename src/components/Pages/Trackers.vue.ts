import ProfileStore from "../../stores/ProfileStore";
import BarList from "../BarList.vue";
import TableList from "../TableList.vue";
import MostVisited from "./Profile/MostVisited.vue";
import MostWatched from "./Profile/MostWatched.vue";
import Vue from "vue";
import Utils from '../../utils';

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
  methods: {
    refreshProfileStoreWithDates() {
      ProfileStore.methods.refreshEverything(true);
    },
    exportJson() {
      let a = window.document.createElement('a');
      a.href = window.URL.createObjectURL(new Blob([JSON.stringify(ProfileStore.data.trackers)], {type: 'text/json'}));
      a.download = 'trackers.json';

      // Append anchor to body.
      document.body.appendChild(a);
      a.click();
    }
  },
  mounted() {
    this.$data.ProfileStore.filterForm.endDate = Utils.today();
  }
});
