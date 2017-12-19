<template>
  <div>
    <h2 class="mb-0">Interests graph</h2>
    <div class="row">
      <div class="col-9">
        <div id="mynetwork"></div>
      </div>
      <div class="col-3" v-if="selectedWord">
        <h3 class="mb-0">Word informations</h3>
        Word <b>{{ProfileStore.data.graph.selected}}</b>
        <select>
          <option v-for="el in ProfileStore.interestsList">{{el.label}}</option>
        </select>
      </div>
    </div>
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
        ProfileStore: ProfileStore.data,
        selectedWord: false
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
        topics.push({id: "t" + topicId, label: topic[0][0], color: 'red', 'font':{color:'white'}});
      }

      for (let wordId in interests['keywords']) {
        let word = interests['keywords'][wordId];
        keywords.push({id: "w" + wordId, label: word['word'], color: '#007bff', 'font':{color:'white'}});
        for (let link in word['topics']) {
          connections.push({from: "w" +  wordId, to: "t" + word['topics'][link][0]});
        }
      }

      console.log(topics);
      console.log(keywords);


      var nodes = new vis.DataSet(topics.concat(keywords));

      // create an array with edges
      var edges = new vis.DataSet(connections);

      // create a network
      var container = document.getElementById('mynetwork');
      var data = {
        nodes: nodes,
        edges: edges
      };
      var options = {};
      var network = new vis.Network(container, data, options);

      network.on("selectNode", function (params) {
        console.log('selectNode Event:', params);
        ProfileStore.data.graph.selected = params;
      });

    },
    beforeDestroy() {
      ProfileStore.data.graph.selected = false;
    }
  }
</script>

<style>
  #mynetwork {
    width: 100%;
    height: 600px;
    border: 1px solid lightgray;
  }
</style>
