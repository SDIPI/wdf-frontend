<template>
  <div>
    <h2 class="mb-0">History of topics</h2>
    <div id="highChartContainer3"></div>
    <h2 class="mb-0">History of words</h2>
    <div id="highChartContainer1"></div>
  </div>
</template>

<script>
  import ProfileStore from "../../stores/ProfileStore";
  import BarList from "../BarList.vue";
  import TableList from "../TableList.vue";

  function toTime(sec) {
    if (sec < 60) {
      return `${sec}sec`;
    }
    let min = ~~(sec/60);
    if (min < 60) {
      return `${min}min ${sec - min*60}sec`;
    }
    let hr = ~~(min/60);
    if (hr < 24) {
      return `${hr}h ${min - hr*60}min`;
    }
    let days = ~~(hr/24);
    return `${days}d ${hr - days*24}h`;
  }

  export default {
    name: 'History',
    components: {
      TableList,
      BarList
    },
    data() {
      return {
        ProfileStore: ProfileStore.data
      };
    },
    methods: {},
    mounted() {

      let dataHistoryWords = ProfileStore.data.historyWords;
      let dataHistorySites = ProfileStore.data.historySites;
      let dataHistoryTopics = ProfileStore.data.historyTopics;

      Highcharts.chart('highChartContainer1', {

        chart: {
          type: 'spline'
        },
        title: {
          text: ''
        },

        xAxis: {
          type: 'datetime',
          dateTimeLabelFormats: { // don't display the dummy year
            month: '%e. %b',
            year: '%b'
          },
          title: {
            text: 'Date'
          }
        },
        yAxis: {
          title: {
            text: 'Time [sec]'
          },
          min: 0
        },
        tooltip: {
          headerFormat: '<b>{series.name}</b><br>',
          pointFormatter: function() {
            let timeStr = toTime(this.y);
            let timeValue = new Date(this.x);

            return `${timeValue.getUTCDate()}.${timeValue.getUTCMonth()+1}.${timeValue.getUTCFullYear()}: ${timeStr}`;
          }
        },

        plotOptions: {
          spline: {
            marker: {
              enabled: true
            }
          },
          series: {
            dataLabels: {
              enabled: false
            }
          }
        },

        series: dataHistoryWords
      });


      Highcharts.chart('highChartContainer3', {

        chart: {
          type: 'spline'
        },
        title: {
          text: ''
        },

        xAxis: {
          type: 'datetime',
          dateTimeLabelFormats: { // don't display the dummy year
            month: '%e. %b',
            year: '%b'
          },
          title: {
            text: 'Date'
          }
        },
        yAxis: {
          title: {
            text: 'Time [sec]'
          },
          min: 0
        },
        tooltip: {
          headerFormat: '<b>{series.name}</b><br>',
          pointFormatter: function() {
            let timeStr = toTime(this.y);
            let timeValue = new Date(this.x);
            console.log(timeValue);
            return `${timeValue.getUTCDate()}.${timeValue.getUTCMonth()+1}.${timeValue.getUTCFullYear()}: ${timeStr}`;
          }
        },

        plotOptions: {
          spline: {
            marker: {
              enabled: true
            }
          },
          series: {
            dataLabels: {
              enabled: false
            }
          }
        },

        series: dataHistoryTopics
      });
    }
  }
</script>

<style>

</style>
