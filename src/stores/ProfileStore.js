const ProfileStore = {
  data: {
    apiBase: "http://df.sdipi.ch:5000",
    visitedSites: [],
    connected: null,
    wdfId: -1
  },
  methods: {
    connectionState() {
      return fetch(ProfileStore.data.apiBase + "/api/connectionState", {credentials: 'include'})
        .then(response => response.json())
        .then((data) => {
          if (data.error) {
            ProfileStore.data.connected = false;
            ProfileStore.data.wdfId = -1;
          } else if (data.success) {
            ProfileStore.data.connected = true;
            ProfileStore.data.wdfId = data.wdfId;
          }
        });
    },
    refreshVisitedSites() {
      fetch(ProfileStore.data.apiBase + "/api/mostVisitedSites", {credentials: 'include'})
        .then(response => response.json())
        .then((data) => {
          let sorted = data.sort((a, b) => {return (b['count'] - a['count'])}).slice(0, 10);
          console.log(sorted);
          ProfileStore.data.visitedSites = sorted;
        });
    },
    refreshWatchedSites() {
      fetch(ProfileStore.data.apiBase + "/api/mostWatchedSites", {credentials: 'include'})
        .then(response => response.json())
        .then((data) => {
          let sorted = data.sort((a, b) => {return (b['time'] - a['time'])}).slice(0, 10);
          console.log(sorted);
          ProfileStore.data.watchedSites = sorted;
        });
    }
  }
};

export default ProfileStore;
