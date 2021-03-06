import Utils from '../utils';

interface ProfileStoreData {
  data: {
    apiBase: string,
    visitedSites: any[],
    visitedDomains: any[],
    watchedSites: any[],
    watchedDomains: any[],
    watchedKeyWords: {},
    topicsWatched: {
      [topicId: number] : number
    },
    allTopics: {
      [topicId: number] : {
        word: string,
        probability: number
      }[]
    }
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
    currentTags: {[topicId: number]: number},
    tags: {
      interestId: number,
      words: string
    }[],
    filterForm: {
      startDate?: string | null,
      endDate?: string | null
    },
    settingsForm: {
      interests?: any
    },
    trackersForm: {
      selectedDomain?: string,
      fromOrTo?: string,
      active: {
        to: {[domain: string]: boolean},
        from: {[domain: string]: boolean}
      },
      modalList: {
        label: string,
        amount: number,
        size: number
      }[],
      nbHiddenSending: number
      nbHiddenRecieving: number
    }
    graph: {
      selected: false | string,
      interest?: false | number,
      formChanged: boolean
    },
    trackers: {
      [from: string]: {
        [to: string]: {
          amount: number,
          size: number
        }
      }
    },
    trackersPage:{
      mostSending: {
        from: string,
        amount: number,
        size: number,
        realAmount: number,
        domains: number
      }[],
      mostRecieving: {
        to: string,
        amount: number,
        size: number,
        realAmount: number,
        domains: number
      }[]
    },
    topicsPage: {
      topics: {
        amount: number,
        words: string,
        topicId: number
      }[]
    }
    urlsTopic: {},
    loading: boolean,
    loadingTrackers: boolean,
    loadingStats: boolean,
    topicsByUrl: {[url: string]: {[topicId: number]: number}},
    stats: {
      nbRequests: number
    },
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
        }[],
        topics: string
      }[],
      allTopics?: {
        topic_id: number,
        value: number,
        word: string
      }[],
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
      }[],
      getCurrentTags?: {
        interest_id: number,
        user_id: number,
        topic_id: number
      }[],
      getTrackers?: {
        amount: number,
        reqDomain: string,
        size: number,
        urlDomain: string,
        wdfId: number
      }[]
      getMostPresentTrackers?: {
        count: number,
        requestDomain: string
      }[],
      getMostRevealingDomains?: {
        count: number,
        requestDomain: string
      }[],
      getTrackersStats?: {
        nbTrackers: number
      },
      getGeneralStats?: {
        totalRequests: number,
        trackersNb: number
      }
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
    refreshEverything: (boolean) => Promise<any>,
    sendInterests: (any) => Promise<any>,
    sendTag: (topicId: number, interestId: number, words: string) => Promise<any>,
    refreshTags: () => Promise<any>,
    computeTags: () => void,
    refreshCurrentTags: () => Promise<any>,
    refreshTrackersStats: (any) => Promise<any>,
    refreshGeneralStats: () => Promise<any>,
    refreshTrackers: () => Promise<any>,
    computeTrackers: () => void,
    trackersForm: {
      refreshNbHidden: () => void
    }
    computeWatchedTopics: () => void
  }
}

const ProfileStore: ProfileStoreData = {
  data: {
    apiBase: "https://df.sdipi.ch",
    visitedSites: [],
    visitedDomains: [],
    watchedSites: [],
    watchedDomains: [],
    watchedKeyWords: {},
    topicsWatched: {},
    allTopics: {},
    historySites: [],
    historyWords: [],
    historyTopics: [],
    tfIdf: [],
    tfIdfByUrl: {},
    tfIdfByDomain: {},
    bestKeyWords: {},
    interestsList: [],
    currentTags: {},
    tags: [],
    nbDocuments: null,
    oldest: null,
    connected: null,
    wdfId: -1,
    topicsByUrl: {},
    filterForm: {
      startDate: null,
      endDate: null
    },
    settingsForm: {
      interests: null
    },
    trackersForm: {
      selectedDomain: '',
      fromOrTo: '',
      active: {
        to: {},
        from: {}
      },
      modalList: [],
      nbHiddenSending: 0,
      nbHiddenRecieving: 0
    },
    graph: {
      selected: false,
      interest: undefined,
      formChanged: false
    },
    trackers: {},
    trackersPage: {
      mostSending: [],
      mostRecieving: []
    },
    topicsPage: {
      topics: []
    },
    stats: {
      nbRequests: 0
    },
    urlsTopic: {},
    loading: true,
    loadingTrackers: true,
    loadingStats: true,
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
        let domainsList = Utils.groupByDomain(data, 'count');
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
        let domainsList = Utils.groupByDomain(data, 'time');
        // Sort and truncate data
        let sortedUrls = data.sort((a, b) => {
          return (b['time'] - a['time'])
        }).slice(0, 10);
        let sortedDomains = domainsList.sort((a, b) => {
          return (b['time'] - a['time'])
        }).slice(0, 10);
        ProfileStore.data.watchedSites = sortedUrls;
        ProfileStore.data.watchedDomains = sortedDomains;
        ProfileStore.data.topicsWatched = {};
        ProfileStore.data.topicsByUrl = {};
        for (let site of data) {
          let siteTopics: {[topicId: number]: number} = JSON.parse(site.topics);
          ProfileStore.data.topicsByUrl[site.url] = siteTopics;
          for (let topicStr in siteTopics) {
            let topic = parseInt(topicStr);
            if (!(topic in ProfileStore.data.topicsWatched)) {
              ProfileStore.data.topicsWatched[topic] = 0;
            }
            ProfileStore.data.topicsWatched[topic] += siteTopics[topic] * site.time;
          }
        }
      }
    },

    computeWatchedTopics() {
      ProfileStore.data.topicsPage.topics = [];
      for (let topicWatched in ProfileStore.data.topicsWatched) {
        let topicValue = ProfileStore.data.topicsWatched[topicWatched];
        let words = ProfileStore.data.allTopics[topicWatched].slice(0, 3).map(x => x.word).join(' ');
        ProfileStore.data.topicsPage.topics.push({amount: topicValue, words: words, topicId: parseInt(topicWatched)});
      }
      ProfileStore.data.topicsPage.topics.sort((a, b) => {
        return (b.amount - a.amount)
      });
      ProfileStore.data.topicsPage.topics = ProfileStore.data.topicsPage.topics.splice(0, 20);
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
        resultList2 = resultList2.splice(0,5);
        ProfileStore.data.historySites = resultList2;


        /* --- History by topic --- */
        let resultTopics = {};
        let resultTopicsList: {data: any[], name: string}[] = [];
        let topicTotal = {};
        for (let entryI in data) {
          let entry = data[entryI];
          let newEl: [number, number] = [new Date(entry.day).getTime(), entry.sumAmount];
          // let topic = ProfileStore.data.urlsTopic[entry.url];
          let topics = ProfileStore.data.topicsByUrl[entry.url];
          for (let topicId in topics) {
            let topicValue = topics[topicId];
            let topicString = ProfileStore.data.allTopics[topicId].slice(0, 3).map(x => x.word).join(' ');
            if (!(topicString in resultTopics)) {
              resultTopics[topicString] = {};
            }
            if (!(newEl[0] in resultTopics[topicString])) {
              resultTopics[topicString][newEl[0]] = 0;
            }
            if (!(topicString in topicTotal)) {
              topicTotal[topicString] = 0;
            }
            resultTopics[topicString][newEl[0]] += entry.sumAmount;
            topicTotal[topicString] += entry.sumAmount;
          }
        }
        delete resultTopics["undefined"]; // :thinking:
        let topicTotalList: any[] = [];
        for (let topicWords in topicTotal) {
          topicTotalList.push({topic: topicWords, value: topicTotal[topicWords]});
        }
        topicTotalList.sort((a, b) => {
          return (b['value'] - a['value'])
        });
        topicTotalList = topicTotalList.splice(0, 8);
        let topTopics = topicTotalList.map(key => {return key['topic']});
        for (let el in resultTopics) {
          let resultTopic = resultTopics[el];
          let dataTopicList: any[] = [];
          if (topTopics.indexOf(el) > -1) {
            let dataTopic = Object.keys(resultTopic).map(key => {
              dataTopicList.push([parseInt(key), resultTopic[key]]);
            });
            // resultTopic.map(el => {resultTopicList.push({name: el.name, data: dataTopic})});
            resultTopicsList.push({name: el, data:dataTopicList});
          }
        }
        ProfileStore.data.historyTopics = resultTopicsList;
      }
    },

    // TOPICS
    refreshTopics() {
      return fetch(ProfileStore.data.apiBase + "/api/allTopics", {credentials: 'include'})
        .then(response => response.json())
        .then((data) => {
          ProfileStore.data.api.allTopics = data;
        });
    },
    computeTopics() {
      const data = ProfileStore.data.api.allTopics;
      ProfileStore.data.allTopics = {};
      if (data) {
        for (let element of data) {
          if (!(element.topic_id in ProfileStore.data.allTopics)) {
            ProfileStore.data.allTopics[element.topic_id] = [];
          }
          ProfileStore.data.allTopics[element.topic_id].push({word: element.word, probability: element.value});
        }
        for (let topicId in ProfileStore.data.allTopics) {
          ProfileStore.data.allTopics[topicId].sort((a, b) => {
            return (b.probability - a.probability)
          })
        }
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
        ProfileStore.data.oldest = Utils.day(data['date']);
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

          let historyP = ProfileStore.methods.refreshHistory(dates);
          let topicsP = ProfileStore.methods.refreshTopics();

          let tagsP = ProfileStore.methods.refreshTags();
          let currentTagsP = ProfileStore.methods.refreshCurrentTags();

          let trackers3P = ProfileStore.methods.refreshTrackersStats(dates);

          let trackersP = ProfileStore.methods.refreshTrackers();

          let generalStatsP = ProfileStore.methods.refreshGeneralStats();

          Promise.all([visitedSitesP, watchedSitesP, userInterestsP, historyP, topicsP, iListP, tagsP, currentTagsP]).then(() => {
            ProfileStore.methods.computeVisitedSites();
            ProfileStore.methods.computeWatchedSites();
            ProfileStore.methods.computeInterestsList();
            ProfileStore.methods.computeUserInterests();
            ProfileStore.methods.computeTags();

            ProfileStore.methods.computeWords();
            ProfileStore.methods.computeTopics();
            ProfileStore.methods.computeHistory();
            ProfileStore.methods.computeWatchedTopics();
            ProfileStore.data.loading = false;
          });

          Promise.all([trackers3P, trackersP]).then(() => {
            ProfileStore.methods.computeTrackers();
            ProfileStore.data.loadingTrackers = false;
          });

          generalStatsP.then(() => {
            ProfileStore.data.loadingStats = false;
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
        });
    },

    // TAGS
    sendTag(topicId: number, interestId: number, words: string) {
      let queryString = "?interestId=" + interestId + "&topicId=" + topicId + "&words=" + words;
      return fetch(ProfileStore.data.apiBase + "/api/setTag" + queryString, {credentials: 'include'})
        .then(response => response.json())
        .then((data) => {
        });
    },
    refreshTags() {
      return fetch(ProfileStore.data.apiBase + "/api/getTags", {credentials: 'include'})
        .then(response => response.json())
        .then((data) => {
          ProfileStore.data.api.getTags = data;
        });
    },
    refreshCurrentTags() {
      return fetch(ProfileStore.data.apiBase + "/api/getCurrentTags", {credentials: 'include'})
        .then(response => response.json())
        .then((data) => {
          ProfileStore.data.api.getCurrentTags = data;
        });
    },
    computeTags() {
      ProfileStore.data.currentTags = {};
      ProfileStore.data.tags = [];
      if (ProfileStore.data.api.getCurrentTags) {
        for (let tag of ProfileStore.data.api.getCurrentTags) {
          ProfileStore.data.currentTags[tag.topic_id] = tag.interest_id;
        }
      }
      if (ProfileStore.data.api.getTags) {
        for (let tag of ProfileStore.data.api.getTags) {
          ProfileStore.data.tags.push({
            interestId: tag.interest_id,
            words: tag.word
          });
        }
      }
    },


    // TRACKERS
    refreshTrackers() {
      let apiUrl = ProfileStore.data.apiBase + "/api/getTrackers";
      return fetch(apiUrl, {credentials: 'include'})
        .then(response => response.json())
        .then((data) => {
          ProfileStore.data.api.getTrackers = data;
        });
    },

    computeTrackers() {
      ProfileStore.data.trackers = {};
      ProfileStore.data.trackersPage.mostRecieving = [];
      ProfileStore.data.trackersPage.mostSending = [];
      ProfileStore.data.stats.nbRequests = 0;

      if (!ProfileStore.data.api.getTrackers) return;
      for (let flux of ProfileStore.data.api.getTrackers) {
        let from = flux.urlDomain;
        let to = flux.reqDomain;
        if (!(from in ProfileStore.data.trackers)) {
          ProfileStore.data.trackers[from] = {};
        }
        ProfileStore.data.trackers[from][to] = {
          amount: flux.amount,
          size: flux.size
        }
      }
      if (!ProfileStore.data.trackers) return;

      const mostRecieving: {[to: string]: {amount: number, size: number, realAmount: number, domains: number}} = {};

      for (let from in ProfileStore.data.trackers) {
        if (!(from in ProfileStore.data.trackersForm.active.from)) {
          ProfileStore.data.trackersForm.active.from[from] = true;
        }
        let fromAmount = 0;
        let fromSize = 0;
        let fromRealAmount = 0;
        let fromDomains = 0;
        for (let to in ProfileStore.data.trackers[from]) {
          if (!(to in ProfileStore.data.trackersForm.active.to)) {
            ProfileStore.data.trackersForm.active.to[to] = true;
          }
          let toAmount = 0;
          let toSize = 0;
          let toDomains = 0;
          let toRealAmount = ProfileStore.data.trackers[from][to].amount;

          ProfileStore.data.stats.nbRequests += toRealAmount;

          if (ProfileStore.data.trackersForm.active.from[from] && ProfileStore.data.trackersForm.active.to[to]) {
            toDomains++;
            toAmount += ProfileStore.data.trackers[from][to].amount;
            toSize += ProfileStore.data.trackers[from][to].size;
            fromDomains++;
            fromAmount += ProfileStore.data.trackers[from][to].amount;
            fromSize += ProfileStore.data.trackers[from][to].size;
          }
          fromRealAmount += toRealAmount;

          if (!(to in mostRecieving)) {
            mostRecieving[to] = {
              amount: 0,
              size: 0,
              realAmount: 0,
              domains: 0
            };
          }
          mostRecieving[to].amount += toAmount;
          mostRecieving[to].size += toSize;
          mostRecieving[to].realAmount += toRealAmount;
          mostRecieving[to].domains += toDomains;
        }
        ProfileStore.data.trackersPage.mostSending.push({
          from: from,
          amount: fromAmount,
          size: fromSize,
          realAmount: fromRealAmount,
          domains: fromDomains
        });
      }

      for (let to in mostRecieving) {
        ProfileStore.data.trackersPage.mostRecieving.push({
          to: to,
          amount: mostRecieving[to].amount,
          size: mostRecieving[to].size,
          realAmount: mostRecieving[to].realAmount,
          domains: mostRecieving[to].domains
        });
      }

      ProfileStore.data.trackersPage.mostSending.sort((a, b) => {
        return (b['realAmount'] - a['realAmount'])
      });
      ProfileStore.data.trackersPage.mostRecieving.sort((a, b) => {
        return (b['realAmount'] - a['realAmount'])
      });
      ProfileStore.data.trackersPage.mostSending = ProfileStore.data.trackersPage.mostSending.splice(0,100);
      ProfileStore.data.trackersPage.mostRecieving = ProfileStore.data.trackersPage.mostRecieving.splice(0,100);
    },

    refreshTrackersStats(dates: boolean) {
      let apiUrl = ProfileStore.data.apiBase + "/api/getTrackersStats";
      if (dates) {
        apiUrl += "?from=" + ProfileStore.data.filterForm.startDate + "&to=" + ProfileStore.data.filterForm.endDate
      }
      return fetch(apiUrl, {credentials: 'include'})
        .then(response => response.json())
        .then((data) => {
          ProfileStore.data.api.getTrackersStats = data;
        });
    },

    refreshGeneralStats() {
      let apiUrl = ProfileStore.data.apiBase + "/api/getGeneralStats";
      return fetch(apiUrl, {credentials: 'include'})
        .then(response => response.json())
        .then((data) => {
          ProfileStore.data.api.getGeneralStats = data;
        });
    },

    trackersForm: {
      refreshNbHidden() {
        ProfileStore.data.trackersForm.nbHiddenRecieving = 0;
        ProfileStore.data.trackersForm.nbHiddenSending = 0;
        for (let domain in ProfileStore.data.trackersForm.active.to) {
          if (ProfileStore.data.trackersForm.active.to[domain] === false) {
            ProfileStore.data.trackersForm.nbHiddenRecieving++;
          }
        }
        for (let domain in ProfileStore.data.trackersForm.active.from) {
          if (ProfileStore.data.trackersForm.active.from[domain] === false) {
            ProfileStore.data.trackersForm.nbHiddenSending++;
          }
        }
      }
    }
  }
};

window['ProfileStore'] = ProfileStore;

export default ProfileStore;
