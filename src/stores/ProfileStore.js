function groupBy(xs, key) {
  return xs.reduce(function (rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
}

function parseUrl(url, part) {
  let parser = document.createElement('a');
  parser.href = url;
  return parser[part];
}

function tfIdf(tf, df, documents) {
  return tf * Math.log(documents / df);
}

const ProfileStore = {
  data: {
    apiBase: "http://df.sdipi.ch:5000",
    visitedSites: [],
    visitedDomains: [],
    watchedSites: [],
    watchedDomains: [],
    visitedSitesWithWords: [],
    visitedDomainsWithWords: [],
    watchedSitesWithWords: [],
    watchedDomainsWithWords: [],
    tfIdf: [],
    tfIdfByUrl: {},
    tfIdfByDomain: {},
    nbDocuments: null,
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
      return fetch(ProfileStore.data.apiBase + "/api/mostVisitedSites", {credentials: 'include'})
        .then(response => response.json())
        .then((data) => {
          // Compute domains
          let domains = {};
          let domainsList = [];
          data.map((el) => {
            let domain = parseUrl(el.url, "hostname");
            if (domain in domains) {
              domains[domain] += el['count'];
            } else {
              domains[domain] = el['count'];
            }
          });
          for (let domain in domains) {
            domainsList.push({domain: domain, count: domains[domain]});
          }
          // Sort and truncate data
          let sortedUrls = data.sort((a, b) => {
            return (b['count'] - a['count'])
          }).slice(0, 10);
          let sortedDomains = domainsList.sort((a, b) => {
            return (b['count'] - a['count'])
          }).slice(0, 10);
          ProfileStore.data.visitedSites = sortedUrls;
          ProfileStore.data.visitedDomains = sortedDomains;
        });
    },
    refreshWatchedSites() {
      return fetch(ProfileStore.data.apiBase + "/api/mostWatchedSites", {credentials: 'include'})
        .then(response => response.json())
        .then((data) => {
          // Compute domains
          let domains = {};
          let domainsList = [];
          data.map((el) => {
            let domain = parseUrl(el.url, "hostname");
            if (domain in domains) {
              domains[domain] += el.time;
            } else {
              domains[domain] = el.time;
            }
          });
          for (let domain in domains) {
            domainsList.push({domain: domain, time: domains[domain]});
          }
          // Sort and truncate data
          let sortedUrls = data.sort((a, b) => {
            return (b['time'] - a['time'])
          }).slice(0, 10);
          let sortedDomains = domainsList.sort((a, b) => {
            return (b['time'] - a['time'])
          }).slice(0, 10);
          ProfileStore.data.watchedSites = sortedUrls;
          ProfileStore.data.watchedDomains = sortedDomains;
        });
    },
    refreshNbDocuments() {
      return fetch(ProfileStore.data.apiBase + "/api/nbDocuments", {credentials: 'include'})
        .then(response => response.json())
        .then((data) => {
          ProfileStore.data.nbDocuments = parseInt(data['count']);
        });
    },
    refreshTfIdf() {
      return fetch(ProfileStore.data.apiBase + "/api/tfIdfSites", {credentials: 'include'})
        .then(response => response.json())
        .then((data) => {
          let urls = {};
          let urlsList = [];
          let domains = {};
          let domainsList = [];
          // Compute TfIdf
          data.map((el) => {
            let url = el['url'];
            let domain = parseUrl(url, "hostname");
            delete el['url'];
            if (url in urls) {
              urls[url].push(el);
            } else {
              urls[url] = [el];
            }
            if (domain in domains) {
              domains[domain].push(el);
            } else {
              domains[domain] = [el];
            }
          });
          for (let url in urls) {
            // Sorting all words by weight and keeping the first three
            urls[url].sort((a, b) => {
              return (tfIdf(b['tf'], b['df'], ProfileStore.data.nbDocuments) - tfIdf(a['tf'], a['df'], ProfileStore.data.nbDocuments))
            });
            urlsList.push({url: url, words: urls[url], top3:urls[url].map((el) => el['word']).splice(0, 3).join(', ')});
          }

          for (let domain in domains) {
            // Sorting all words by weight and keeping the first three
            domains[domain].sort((a, b) => {
              return (tfIdf(b['tf'], b['df'], ProfileStore.data.nbDocuments) - tfIdf(a['tf'], a['df'], ProfileStore.data.nbDocuments))
            });
            domainsList.push({domain: domain, words: domains[domain], top3: domains[domain].map((el) => el['word']).splice(0, 3).join(', ')});
          }

          // Sort and truncate data
          /*
          urlsList.sort((a, b) => {
            return (tfIdf(b['tf'], b['df'], nbDocs) - tfIdf(a['tf'], a['df'], nbDocs))
          }).slice(0, 10);*/
          ProfileStore.data.tfIdfByUrl = urls;
          ProfileStore.data.tfIdfByDomain = domains;
          ProfileStore.data.tfIdf = urlsList;
          this.computeWords();
        });
    },
    /* Add keywords to existing lists */
    computeWords() {
      // visited sites
      var result = [];
      for (var i in ProfileStore.data.visitedSites) {
        var page = ProfileStore.data.visitedSites[i];
        page.words = ProfileStore.data.tfIdfByUrl[page.url];
        result.push(page);
      }
      ProfileStore.data.visitedSitesWithWords = result;

      // visites domains
      result = [];
      for (var i in ProfileStore.data.visitedDomains) {
        var page = ProfileStore.data.visitedDomains[i];
        page.words = ProfileStore.data.tfIdfByDomain[page.domain];
        result.push(page);
      }
      ProfileStore.data.visitedDomainsWithWords = result;

      // watched sites
      var result = [];
      for (var i in ProfileStore.data.watchedSites) {
        var page = ProfileStore.data.watchedSites[i];
        page.words = ProfileStore.data.tfIdfByUrl[page.url];
        result.push(page);
      }
      ProfileStore.data.watchedSitesWithWords = result;

      // watched domains
      result = [];
      for (var i in ProfileStore.data.watchedDomains) {
        var page = ProfileStore.data.watchedDomains[i];
        page.words = ProfileStore.data.tfIdfByDomain[page.domain];
        result.push(page);
      }
      ProfileStore.data.watchedDomainsWithWords = result;
    }
  }
};

export default ProfileStore;
