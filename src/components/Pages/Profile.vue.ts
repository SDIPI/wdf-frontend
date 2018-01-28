import ProfileStore from "../../stores/ProfileStore";
import BarList from "../BarList.vue";
import TableList from "../TableList.vue";
import MostVisited from "./Profile/MostVisited.vue";
import MostWatched from "./Profile/MostWatched.vue";
import Vue from "vue";
import Utils from '../../utils';

export default Vue.extend({

  name: 'Profile',
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
    }
  },
  mounted() {
    this.$data.ProfileStore.filterForm.endDate = Utils.today();
  }
});
