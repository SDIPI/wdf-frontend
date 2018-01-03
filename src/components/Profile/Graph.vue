<template>
  <div>
    <div class="row">
      <div class="col-9">
        <h2 class="mb-0">Topics graph</h2>
        <div ref="mynetwork" id="mynetwork"></div>
      </div>
      <div class="col-3" v-if="ProfileStore.graph.selected">
        <h3 class="mb-0">Selected</h3>
        Word <b>{{ProfileStore.graph.selected}}</b><br/>
        <select ref="interestField">
          <option value="-1"></option>
          <option v-for="el in ProfileStore.interestsList" v-if="ProfileStore.settingsForm.interests.indexOf(el.id) > -1" :value="el.id" :onchange="selectChanged()">{{el.label}}</option>
        </select>
        <br>
        <button type="submit" v-on:click="sendTag()" class="btn btn-primary">Submit</button>
      </div>
    </div>
    <p>
      <span class="hint badge badge-secondary" data-toggle="tooltip" data-placement="bottom"
            title="This page shows a guess at which topics and words you're the probably the most interested to.
            Each red bubble is a topic, each blue bubble is a word. A topic is linked to multiple words.">What is this ?</span>
    </p>
  </div>
</template>

<script>
  import ProfileStore from "../../stores/ProfileStore";
  import BarList from "../BarList.vue";
  import TableList from "../TableList.vue";
  import Vue from "vue";

  function enableTooltips() {
    $(function () {
      $('[data-toggle="tooltip"]').tooltip()
    });
  }

  export default Vue.extend({
    name: 'Graph',
    components: {
      TableList,
      BarList
    },
    data() {
      return {
        ProfileStore: ProfileStore.data,
        selectedWord: false,
        keywordsDict: {}
      };
    },
    methods: {
      sendTag() {
        ProfileStore.methods.sendTag(ProfileStore.data.graph.interest, ProfileStore.data.graph.selected);
      },
      selectChanged() {
        ProfileStore.data.graph.interest = this.$refs.interestField; // TODO : Save id instead of string of tag
      }
    },
    mounted() {

      enableTooltips();

      let topics = [];
      let keywords = [];
      let keywordsDict = {};
      let connections = [];
      let interests = ProfileStore.data.topics;

      for (let topicId in interests['topics']) {
        let topic = interests['topics'][topicId];
        topics.push({id: "t" + topicId, label: topic[0][0], color: 'red', 'font':{color:'white'}});
        keywordsDict["t" + topicId] = topic[0][0];
      }

      for (let wordId in interests['keywords']) {
        let word = interests['keywords'][wordId];
        keywords.push({id: "w" + wordId, label: word['word'], color: '#007bff', 'font':{color:'white'}});
        keywordsDict["w" + wordId] = word['word'];
        for (let link in word['topics']) {
          connections.push({from: "w" +  wordId, to: "t" + word['topics'][link][0]});
        }
      }

      console.log(topics);
      console.log(keywords);

      this.$data.keywordsDict = keywordsDict;

      var nodes = new vis.DataSet(topics.concat(keywords));

      // create an array with edges
      var edges = new vis.DataSet(connections);

      // create a network
      var container = this.$refs.mynetwork;
      var data = {
        nodes: nodes,
        edges: edges
      };
      var options = {};
      var network = new vis.Network(container, data, options);

      var self = this;
      var ps = ProfileStore;

      network.on("selectNode", function (params) {
        console.log('selectNode Event:', params);
        ps.data.graph.selected = self.keywordsDict[params['nodes'][0]];//self.keywordsDict[params];
        if (self.$refs.interestField) {
          self.$refs.interestField.value = -1;
        }
      });

    },
    beforeDestroy() {
      ProfileStore.data.graph.selected = false;
    }
  })
</script>

<style>
  #mynetwork {
    width: 100%;
    height: 600px;
    border: 1px solid lightgray;
  }
</style>
