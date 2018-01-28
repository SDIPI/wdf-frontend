export default class Utils {
  static today() {
    return this.dayString(new Date().toString());
  }

  static dayString(dateString: string) {
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

  static parseUrl(url, part) {
    let parser = document.createElement('a');
    parser.href = url;
    return parser[part];
  }

  static day(dateString) {
    let date = new Date(dateString);
    let dd: string|number = date.getDate();
    let mm: string|number = date.getMonth()+1; // January is 0!
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
  static groupByDomain(data, key: string) {
    let domains = {};
    let domainsWords = {};
    let domainsList: any[] = [];
    let domainsWordsList = {};
    data.map((el) => {
      let domain = Utils.parseUrl(el.url, "hostname");
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
}
