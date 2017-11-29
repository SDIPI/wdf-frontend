import Vue from "vue"

Vue.filter('toTime', function (sec) {
  if (sec < 60) {
    return `${sec}sec`;
  }
  let min = ~~(sec/60);
  if (min < 60) {
    return `${min}min ${sec - min*60}sec`;
  }
  let hr = ~~(min/60);
  if (hr < 24) {
    return `${hr}h ${min - hr*60}min`;
  }
  let days = ~~(hr/24);
  return `${days}d ${hr - days*24}h`;
});
