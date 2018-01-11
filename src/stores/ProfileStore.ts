function parseUrl(url, part) {
  let parser = document.createElement('a');
  parser.href = url;
  return parser[part];
}

function day(dateString) {
  let date = new Date(dateString);
  let dd: string|number = date.getDate();
  let mm: string|number = date.getMonth()+1; //January is 0!
  let yyyy = date.getFullYear();
  if(dd<10){
    dd='0'+dd
  }
  if(mm<10){
    mm='0'+mm
  }
  return yyyy+'-'+mm+'-'+dd;
}

/**
 * Aggregates the data for different URLs and group them by domain
 */
function groupByDomain(data, key: string) {
  let domains = {};
  let domainsWords = {};
  let domainsList: any[] = [];
  let domainsWordsList = {};
  data.map((el) => {
    let domain = parseUrl(el.url, "hostname");
    if (!(domain in domains)) {
      domains[domain] = 0;
      domainsWords[domain] = {};
    }
    domains[domain] += el[key];
    for (let wordOcc in el['words']) {
      let wordObject = el['words'][wordOcc];
      let word = wordObject['word'];
      if (word in domainsWords[domain]) {
        domainsWords[domain][word] += wordObject['tfidf'];
      } else {
        domainsWords[domain][word] = wordObject['tfidf'];
      }
    }
  });
  for (let domain in domainsWords) {
    domainsWordsList[domain] = [];
    for (let word in domainsWords[domain]) {
      domainsWordsList[domain].push({word: word, tfidf: domainsWords[domain][word]});
    }
    domainsWordsList[domain].sort((a, b) => {
      return (b['tfidf'] - a['tfidf'])
    });
  }
  for (let domain in domains) {
    let toAdd = {domain: domain, words: domainsWordsList[domain]};
    toAdd[key] = domains[domain];
    domainsList.push(toAdd);
  }
  return domainsList
}

interface ProfileStoreData {
  data: {
    apiBase: "http://df.sdipi.ch:5000",
    visitedSites: any[],
    visitedDomains: any[],
    watchedSites: any[],
    watchedDomains: any[],
    watchedKeyWords: {},
    topics: {},
    historySites: any[],
    historyWords: any[],
    historyTopics: any[],
    tfIdf: any[],
    tfIdfByUrl: {},
    tfIdfByDomain: {},
    bestKeyWords: {},
    interestsList: any[],
    nbDocuments?: number | null,
    oldest?: string | null,
    connected?: boolean | null,
    wdfId: number,
    filterForm: {
      startDate?: string | null,
      endDate?: string | null
    },
    settingsForm: {
      interests?: any
    },
    graph: {
      selected: false | string,
      interest?: false | number,
      formChanged: boolean
    },
    urlsTopic: {},
    loading: boolean,
    api: {
      connectionState?: {
        wdfId: number
      },
      mostVisitedSites?: {
        count: number,
        url: string,
        words: {
          tfidf: number,
          word: string
        }[]
      }[],
      mostWatchedSites?: {
        time: number,
        url: string,
        words: {
          tfidf: number,
          word: string
        }[]
      }[],
      topics?: {
        keywords: {
          [wordId: string]: {
            topics: number[],
            word: string
          }},
        topics: {
          [topicId: string]: [string, number][]
        }
      },
      historySites?: {
        day: string,
        sumAmount: number,
        url: string,
        wdfId: string
      }[],
      oldestEntry?: {
        date: string
      },
      nbDocuments?: {
        count: number
      },
      interestsList?: {
        id: number,
        name: string
      }[],
      getInterests?: {
        interest_id: number,
        user_id: number
      }[],
      getUrlsTopic?: {
        topic: string,
        url: string
      }[],
      getTags?: {
        interest_id: number,
        user_id: number,
        word: string
      }[]
    }
  },
  methods: {
    connectionState: () => Promise<any>,
    computeWords: () => void,
    refreshVisitedSites: (boolean) => Promise<any>,
    computeVisitedSites: () => void,
    refreshWatchedSites: (boolean) => Promise<any>,
    computeWatchedSites: () => void,
    refreshNbDocuments: () => Promise<any>,
    computeNbDocuments: () => void,
    refreshHistory: (boolean) => Promise<any>,
    computeHistory: () => void,
    refreshTopics: () => Promise<any>,
    computeTopics: () => void,
    refreshOldest: () => Promise<any>,
    computeOldest: () => void,
    refreshInterestsList: () => Promise<any>,
    computeInterestsList: () => void,
    refreshUserInterests: () => Promise<any>,
    computeUserInterests: () => void,
    refreshUrlsTopic: () => Promise<any>,
    computeUrlsTopic: () => void,
    refreshEverything: (boolean) => Promise<any>,
    sendInterests: (any) => Promise<any>,
    sendTag: (number, string) => Promise<any>,
    refreshTags: () => Promise<any>
  }
}

const ProfileStore: ProfileStoreData = {
  data: {
    apiBase: "http://df.sdipi.ch:5000",
    visitedSites: [],
    visitedDomains: [],
    watchedSites: [],
    watchedDomains: [],
    watchedKeyWords: {},
    topics: [],
    historySites: [],
    historyWords: [],
    historyTopics: [],
    tfIdf: [],
    tfIdfByUrl: {},
    tfIdfByDomain: {},
    bestKeyWords: {},
    interestsList: [],
    nbDocuments: null,
    oldest: null,
    connected: null,
    wdfId: -1,
    filterForm: {
      startDate: null,
      endDate: null
    },
    settingsForm: {
      interests: null
    },
    graph: {
      selected: false,
      interest: undefined,
      formChanged: false
    },
    urlsTopic: {},
    loading: true,
    api: {}
  },
  methods: {
    connectionState() {
      return fetch(ProfileStore.data.apiBase + "/api/connectionState", {credentials: 'include'})
        .then(response => response.json())
        .then((data) => {
          ProfileStore.data.api.connectionState = data;
          if (data.error) {
            ProfileStore.data.connected = false;
            ProfileStore.data.wdfId = -1;
          } else if (data.success) {
            ProfileStore.data.connected = true;
            ProfileStore.data.wdfId = data.wdfId;
          }
        });
    },

    // VISITED SITES
    refreshVisitedSites(dates: boolean) {
      let apiUrl = ProfileStore.data.apiBase + "/api/mostVisitedSites";
      if (dates) {
        apiUrl += "?from=" + ProfileStore.data.filterForm.startDate + "&to=" + ProfileStore.data.filterForm.endDate
      }
      return fetch(apiUrl, {credentials: 'include'})
        .then(response => response.json())
        .then((data) => {
          ProfileStore.data.api.mostVisitedSites = data;
        });
    },
    computeVisitedSites() {
      const data = ProfileStore.data.api.mostVisitedSites;
      if (data) {
        // Compute domains
        let domainsList = groupByDomain(data, 'count');
        // Sort and truncate data
        let sortedUrls = data.sort((a, b) => {
          return (b['count'] - a['count'])
        }).slice(0, 10);
        let sortedDomains = domainsList.sort((a, b) => {
          return (b['count'] - a['count'])
        }).slice(0, 10);
        ProfileStore.data.visitedSites = sortedUrls;
        ProfileStore.data.visitedDomains = sortedDomains;
      }
    },

    // WATCHED SITES
    refreshWatchedSites(dates: boolean) {
      let apiUrl = ProfileStore.data.apiBase + "/api/mostWatchedSites";
      if (dates) {
        apiUrl += "?from=" + ProfileStore.data.filterForm.startDate + "&to=" + ProfileStore.data.filterForm.endDate
      }
      return fetch(apiUrl, {credentials: 'include'})
        .then(response => response.json())
        .then((data) => {
          ProfileStore.data.api.mostWatchedSites = data;
        });
    },
    computeWatchedSites() {
      const data = ProfileStore.data.api.mostWatchedSites;
      if (data) {
        // Compute domains
        let domainsList = groupByDomain(data, 'time');
        // Sort and truncate data
        let sortedUrls = data.sort((a, b) => {
          return (b['time'] - a['time'])
        }).slice(0, 10);
        let sortedDomains = domainsList.sort((a, b) => {
          return (b['time'] - a['time'])
        }).slice(0, 10);
        ProfileStore.data.watchedSites = sortedUrls;
        ProfileStore.data.watchedDomains = sortedDomains;
      }
    },

    // NB DOCUMENTS
    refreshNbDocuments() {
      return fetch(ProfileStore.data.apiBase + "/api/nbDocuments", {credentials: 'include'})
        .then(response => response.json())
        .then((data) => {
          ProfileStore.data.api.nbDocuments = data;
        });
    },
    computeNbDocuments () {
      const data = ProfileStore.data.api.nbDocuments;
      if (data) {
        ProfileStore.data.nbDocuments = data['count'];
      }
    },

    /* Add keywords to existing lists */
    computeWords() {
      // best keywords
      let data = ProfileStore.data.watchedSites;
      let tagsDict = {};
      let kwByUrl = {};
      for (let i in data) {
        let el = data[i];
        let url = el['url'];
        kwByUrl[url] = {};
        for (let wordI in el.words) {
          let word = el.words[wordI];
          kwByUrl[url][word.word] = word.tfidf;
          if (word.word in tagsDict) {
            tagsDict[word.word] += word.tfidf * el.time;
          } else {
            tagsDict[word.word] = word.tfidf * el.time;
          }
        }
      }

      ProfileStore.data.watchedKeyWords = tagsDict;
      ProfileStore.data.bestKeyWords = kwByUrl;
    },

    // HISTORY
    refreshHistory(dates: boolean) {
      let apiUrl = ProfileStore.data.apiBase + "/api/historySites";
      if (dates) {
        apiUrl += "?from=" + ProfileStore.data.filterForm.startDate + "&to=" + ProfileStore.data.filterForm.endDate
      }
      return fetch(apiUrl, {credentials: 'include'})
        .then(response => response.json())
        .then((data) => {
          ProfileStore.data.api.historySites = data;
        });
    },
    computeHistory() {
      const data = ProfileStore.data.api.historySites;
      if (data) {
        /* --- History by keyword --- */
        let resultByDay = {};
        let resultByWord = {};
        let sumByWord = {};
        let resultList: any = [];
        for (let entryI in data) {
          let entry = data[entryI];
          let day = new Date(entry['day']).getTime();
          if (!(day in resultByDay)) {
            resultByDay[day] = {};
          }
          for (let word in ProfileStore.data.bestKeyWords[entry['url']]) {
            if (ProfileStore.data.bestKeyWords[entry['url']].hasOwnProperty(word)) {
              if (!(word in resultByWord)) {
                resultByWord[word] = [];
              }

              if (!(word in resultByDay[day])) {
                resultByDay[day][word] = 0;
              }

              let toAdd = entry['sumAmount'] * ProfileStore.data.bestKeyWords[entry['url']][word];
              resultByDay[day][word] += toAdd;
              if (resultByWord[word].length > 0 && resultByWord[word][resultByWord[word].length - 1][0] == day) {
                resultByWord[word][resultByWord[word].length - 1][1] += toAdd;
              } else {
                resultByWord[word].push([day, toAdd]);
              }
            }
          }
        }
        for (let word in resultByWord) {
          sumByWord[word] = 0;
          for (let dayR in resultByWord[word]) {
            sumByWord[word] += resultByWord[word][dayR][1];
          }
        }
        let sumByWordList: {word: string, sum: number}[] = [];
        for (let word in sumByWord) {
          sumByWordList.push({'word': word, 'sum': sumByWord[word]});
        }
        sumByWordList.sort((a, b) => {
          return (b.sum - a.sum)
        });
        sumByWordList = sumByWordList.splice(0,10);
        for (let elI in sumByWordList) {
          let el = sumByWordList[elI];
          resultList.push({name: el.word, data:resultByWord[el.word]});
        }
        ProfileStore.data.historyWords = resultList;
        /* --- History by website --- */
        let result = {};
        let resultList2: any[] = [];
        // data = data.splice(0,5);
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
          resultList2.push({name: el, data:result[el]});
        }
        console.log(result);
        console.log(resultList2);
        resultList2 = resultList2.splice(0,5);
        ProfileStore.data.historySites = resultList2;
        /* --- History by topic --- */
        let resultTopics = {};
        let resultTopicsList: any[] = [];
        let topicTotal = {};
        // data = data.splice(0,5);
        for (let entryI in data) {
          let entry = data[entryI];
          let newEl: [number, number] = [new Date(entry.day).getTime(), entry.sumAmount];
          let topic = ProfileStore.data.urlsTopic[entry.url];
          if (!(topic in resultTopics)) {
            resultTopics[topic] = {};
          }
          if (!(newEl[0] in resultTopics[topic])) {
            resultTopics[topic][newEl[0]] = 0;
          }
          if (!(topic in topicTotal)) {
            topicTotal[topic] = 0;
          }
          resultTopics[topic][newEl[0]] += newEl[1];
          topicTotal[topic] += entry.sumAmount;
        }
        delete resultTopics["undefined"]; // :thinking:
        let topicTotalList: any[] = [];
        for (let topicWords in topicTotal) {
          topicTotalList.push({topic: topicWords, value: topicTotal[topicWords]});
        }
        topicTotalList.sort((a, b) => {
          return (b['value'] - a['value'])
        });
        topicTotalList = topicTotalList.splice(0, 10);
        let topTopics = topicTotalList.map(key => {return key['topic']});
        console.log("TOPICS : ! : ! ");
        console.log(topTopics);
        for (let el in resultTopics) {
          let resultTopic = resultTopics[el];
          let resultTopicList: {data: any[], name: string}[] = [];
          let dataTopicList: any[] = [];
          if (topTopics.indexOf(el) > -1) {
            let dataTopic = Object.keys(resultTopic).map(key => {
              dataTopicList.push([parseInt(key), resultTopic[key]]);
            });
            // resultTopic.map(el => {resultTopicList.push({name: el.name, data: dataTopic})});
            resultTopicsList.push({name: el, data:dataTopicList});
          }
        }
        console.log(resultTopics);
        console.log(resultTopicsList);
        ProfileStore.data.historyTopics = resultTopicsList;
      }
    },

    // TOPICS
    refreshTopics() {
      return fetch(ProfileStore.data.apiBase + "/api/topics", {credentials: 'include'})
        .then(response => response.json())
        .then((data) => {
          ProfileStore.data.api.topics = data;
        });
    },
    computeTopics() {
      const data = ProfileStore.data.api.topics;
      if (data) {
        ProfileStore.data.topics = data;
      }
    },

    // URL TOPICS
    refreshUrlsTopic() {
      return fetch(ProfileStore.data.apiBase + "/api/getUrlsTopic", {credentials: 'include'})
        .then(response => response.json())
        .then((data) => {
          ProfileStore.data.api.getUrlsTopic = data;
        });
    },
    computeUrlsTopic() {
      const data = ProfileStore.data.api.getUrlsTopic;
      if (data) {
        let result = {};
        data.map((el) => result[el.url] = el.topic);
        ProfileStore.data.urlsTopic = result;
      }
    },

    // OLDEST
    refreshOldest() {
      return fetch(ProfileStore.data.apiBase + "/api/oldestEntry", {credentials: 'include'})
        .then(response => response.json())
        .then((data) => {
          ProfileStore.data.api.oldestEntry = data;
        });
    },
    computeOldest() {
      const data = ProfileStore.data.api.oldestEntry;
      if (data) {
        ProfileStore.data.oldest = day(data['date']);
      }
    },

    // INTERESTS LIST
    refreshInterestsList() {
      return fetch(ProfileStore.data.apiBase + "/api/interestsList", {credentials: 'include'})
        .then(response => response.json())
        .then((data) => {
          ProfileStore.data.api.interestsList = data;
        });
    },
    computeInterestsList() {
      const data = ProfileStore.data.api.interestsList;
      if (data) {
        let result: any[] = [];
        data.map((item) => {
          let hierarchy = item['name'].split(' / ');
          item['label'] = hierarchy[hierarchy.length - 1];
          result.push(item);
        });
        console.log("Heh");
        ProfileStore.data.interestsList = result;
      }
    },

    refreshEverything(dates: boolean) {
      ProfileStore.data.loading = true;
      return ProfileStore.methods.connectionState().then(() => {
        if (ProfileStore.data.connected) {
          let visitedSitesP = ProfileStore.methods.refreshVisitedSites(dates);
          let watchedSitesP = ProfileStore.methods.refreshWatchedSites(dates);
          let iListP = ProfileStore.methods.refreshInterestsList();
          let userInterestsP = ProfileStore.methods.refreshUserInterests();
          let urlsTopicP = ProfileStore.methods.refreshUrlsTopic();

          let historyP = ProfileStore.methods.refreshHistory(dates);
          let topicsP = ProfileStore.methods.refreshTopics();

          let tagsP = ProfileStore.methods.refreshTags();

          Promise.all([visitedSitesP, watchedSitesP, userInterestsP, urlsTopicP, historyP, topicsP, iListP, tagsP]).then(() => {
            ProfileStore.methods.computeVisitedSites();
            ProfileStore.methods.computeWatchedSites();
            ProfileStore.methods.computeInterestsList();
            ProfileStore.methods.computeUserInterests();
            ProfileStore.methods.computeUrlsTopic();

            ProfileStore.methods.computeWords();
            ProfileStore.methods.computeHistory();
            ProfileStore.methods.computeTopics();
            ProfileStore.data.loading = false;
          });
        }
      });
    },

    // USER INTERESTS
    refreshUserInterests() {
      return fetch(ProfileStore.data.apiBase + "/api/getInterests", {credentials: 'include'})
        .then(response => response.json())
        .then((data) => {
          ProfileStore.data.api.getInterests = data;
        });
    },
    computeUserInterests() {
      const data = ProfileStore.data.api.getInterests;
      if (data) {
        let result: any = [];
        data.map((el) => {
          result.push(el['interest_id']);
        });
        ProfileStore.data.settingsForm.interests = result;
      }
    },

    sendInterests(interests: any[]) {
      let queryString = "?data=" + interests;
      return fetch(ProfileStore.data.apiBase + "/api/setInterests" + queryString, {credentials: 'include'})
        .then(response => response.json())
        .then((data) => {
          console.log(data);
        });
    },

    // TAGS
    sendTag(interestId: number, word: string) {
      let queryString = "?interestId=" + interestId + "&word=" + word;
      return fetch(ProfileStore.data.apiBase + "/api/setTag" + queryString, {credentials: 'include'})
        .then(response => response.json())
        .then((data) => {
          console.log(data);
        });
    },
    refreshTags() {
      return fetch(ProfileStore.data.apiBase + "/api/getTags", {credentials: 'include'})
        .then(response => response.json())
        .then((data) => {
          ProfileStore.data.api.getTags = data;
        });
    },
  }
};

setInterval(() => {console.log(ProfileStore.data.settingsForm.interests);}, 1000);

window['ProfileStore'] = ProfileStore;

export default ProfileStore;
