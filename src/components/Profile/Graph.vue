<template>
  <div>
    <h2 class="mb-0">Interests graph</h2>
    <div id="mynetwork"></div>
  </div>
</template>

<script>
  import ProfileStore from "../../stores/ProfileStore";
  import BarList from "../BarList.vue";
  import TableList from "../TableList.vue";

  export default {
    name: 'Graph',
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

      let topics = [];
      let keywords = [];
      let connections = [];
      let interests = ProfileStore.data.interests;

      for (let topicId in interests['topics']) {
        let topic = interests['topics'][topicId];
        topics.push({id: "t" + topicId, label: topic[0][0]});
      }

      for (let wordId in interests['keywords']) {
        let word = interests['keywords'][wordId];
        keywords.push({id: "w" + wordId, label: word['word']});
        for (let link in word['topics']) {
          connections.push({from: "w" +  wordId, to: "t" + link[0]});
        }
      }

      console.log(topics);
      console.log(keywords);


      var nodes = new vis.DataSet(topics.concat(keywords));

      // create an array with edges
      var edges = new vis.DataSet(connections);
      /*
      var edges = new vis.DataSet([
        {from: 1, to: 3},
        {from: 1, to: 2},
        {from: 2, to: 4},
        {from: 2, to: 5},
        {from: 3, to: 3}
      ]);*/

      // create a network
      var container = document.getElementById('mynetwork');
      var data = {
        nodes: nodes,
        edges: edges
      };
      var options = {};
      var network = new vis.Network(container, data, options);
    }
  }
</script>

<style>
  #mynetwork {
    width: 100%;
    height: 550px;
    border: 1px solid lightgray;
  }
</style>
