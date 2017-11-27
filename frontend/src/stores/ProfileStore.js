const ProfileStore = {
  data: {
    apiBase: "http://df.sdipi.ch:5000",
    visitedSites: []
  },
  methods: {
    refreshVisitedSites() {
      fetch(ProfileStore.data.apiBase + "/api/mostVisitedSites")
        .then(response => response.json())
        .then((data) => {
          var sorted = data.sort((a, b) => {return (b['count'] - a['count'])}).slice(0, 10);
          console.log(sorted);
          ProfileStore.data.visitedSites = sorted;
        })
    }
  }
};

export default ProfileStore;
