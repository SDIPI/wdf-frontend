function parseUrl(url, part) {
  let parser = document.createElement('a');
  parser.href = url;
  return parser[part];
}

function tfIdf(tf, df, documents) {
  return tf * Math.log(documents / df);
}

interface ProfileStoreData {
  data: {
    apiBase: "http://df.sdipi.ch:5000",
    visitedSites: any[],
    visitedDomains: any[],
    watchedSites: any[],
    watchedDomains: any[],
    visitedSitesWithWords: any[],
    visitedDomainsWithWords: any[],
    watchedSitesWithWords: any[],
    watchedDomainsWithWords: any[],
    watchedKeyWords: {},
    interests: any[],
    historySites: any[],
    tfIdf: any[],
    tfIdfByUrl: {},
    tfIdfByDomain: {},
    nbDocuments?: number | null,
    connected?: boolean | null,
    wdfId: number
  },
  methods: {
    connectionState: () => Promise<any>,
    computeWords: () => void,
    refreshVisitedSites: () => Promise<any>,
    refreshWatchedSites: () => Promise<any>,
    refreshNbDocuments: () => Promise<any>,
    refreshTfIdf: () => Promise<any>,
    refreshHistory: () => Promise<any>,
    refreshInterests: () => Promise<any>,
  }
}

const ProfileStore: ProfileStoreData = {
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
    watchedKeyWords: {},
    interests: [],
    historySites: [],
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
          let domainsList: any[] = [];
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
          let domains: any = {};
          let domainsList: any = [];
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
          let urlsList: any = [];
          let domains = {};
          let domainsList: any = [];
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
      let result: any = [];
      for (let i in ProfileStore.data.visitedSites) {
        let page = ProfileStore.data.visitedSites[i];
        page.words = ProfileStore.data.tfIdfByUrl[page.url];
        result.push(page);
      }
      ProfileStore.data.visitedSitesWithWords = result;

      // visites domains
      result = [];
      for (let i in ProfileStore.data.visitedDomains) {
        let page = ProfileStore.data.visitedDomains[i];
        page.words = ProfileStore.data.tfIdfByDomain[page.domain];
        result.push(page);
      }
      ProfileStore.data.visitedDomainsWithWords = result;

      // watched sites
      result = [];
      for (let i in ProfileStore.data.watchedSites) {
        let page = ProfileStore.data.watchedSites[i];
        page.words = ProfileStore.data.tfIdfByUrl[page.url];
        result.push(page);
      }
      ProfileStore.data.watchedSitesWithWords = result;

      // watched domains
      result = [];
      for (let i in ProfileStore.data.watchedDomains) {
        let page = ProfileStore.data.watchedDomains[i];
        page.words = ProfileStore.data.tfIdfByDomain[page.domain];
        result.push(page);
      }
      ProfileStore.data.watchedDomainsWithWords = result;

      // best keywords
      let data = ProfileStore.data.watchedSitesWithWords;
      let tagsDict = {};
      for (let i in data) {
        let el = data[i];
        for (let wordI in el.words) {
          let word = el.words[wordI];
          if (word.word in tagsDict) {
            tagsDict[word.word] += tfIdf(word.tf, word.df, ProfileStore.data.nbDocuments) * el.time;
          } else {
            tagsDict[word.word] = tfIdf(word.tf, word.df, ProfileStore.data.nbDocuments) * el.time;
          }
        }
      }

      ProfileStore.data.watchedKeyWords = tagsDict;
    },
    refreshHistory() {
      return fetch(ProfileStore.data.apiBase + "/api/historySites", {credentials: 'include'})
        .then(response => response.json())
        .then((data) => {
          let result = {};
          let resultList: any = [];
          for (let entryI in data) {
            let entry = data[entryI];
            let newEl = [new Date(entry.day).getTime(), entry.sumAmount];
            if (entry.url in result) {
              result[entry.url].push(newEl);
            } else {
              result[entry.url] = [newEl];
            }
          }
          for (let el in result) {
            resultList.push({name: el, data:result[el]});
          }
          resultList = resultList.splice(0,5);
          console.log(result);
          console.log(resultList);
          ProfileStore.data.historySites = resultList;
        });
    },
    refreshInterests() {
      return fetch(ProfileStore.data.apiBase + "/api/interests", {credentials: 'include'})
        .then(response => response.json())
        .then((data) => {
          ProfileStore.data.interests = data;
        });
    },
  }
};

export default ProfileStore;