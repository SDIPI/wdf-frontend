<template>
  <div>
    <div class="row">
      <div class="col-9">
        <h2 class="mb-0">Topics graph</h2>
        <div ref="mynetwork" id="mynetwork"></div>
      </div>
      <div class="col-3" v-if="ProfileStore.graph.selected">
        <h3 class="mb-0">Selected</h3>
        Topic <b>{{ProfileStore.graph.selected}}</b><br/>
        Related interest : <select ref="interestField" v-on:change="selectChanged()">
          <option value="-1"></option>
          <option v-for="el in ProfileStore.interestsList" v-if="ProfileStore.settingsForm.interests.indexOf(el.id) > -1" :value="el.id">{{el.label}}</option>
        </select>
        <br/>
        <button v-if="ProfileStore.graph.formChanged" type="submit" v-on:click="sendTag()" class="btn btn-primary">Submit</button>
        <br/>
        <p>
          <span class="hint badge badge-secondary" data-toggle="tooltip" data-placement="bottom"
              title="You can help us classify topics and words by assigning one of your interests to any word or topic you think go together well.">What is this ?</span>
        </p>
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
        ProfileStore.methods.sendTag(ProfileStore.data.graph.interest, ProfileStore.data.graph.selected).then(() => {
          this.showalert("Related interest saved successfully.", 'success');
          ProfileStore.data.graph.formChanged = false;
        });
      },
      selectChanged() {
        if (this.$refs.interestField) {
          console.log(this.$refs.interestField.value);
          ProfileStore.data.graph.interest = this.$refs.interestField.value;
          ProfileStore.data.graph.formChanged = true;
        }
      },
      showalert(message, alerttype) {
        $('#alert_placeholder').append('<div id="alertdiv" class="alert alert-' + alerttype + '"><a class="close" data-dismiss="alert">×</a><span>' + message + '</span></div>')
        setTimeout(function () { // this will automatically close the alert and remove this if the users doesnt close it in 5 secs
          $("#alertdiv").remove();
        }, 3000);
      }
    },
    mounted() {

      enableTooltips();

      let topics = [];
      let keywords = [];
      let keywordsDict = {};
      let connections = [];
      let interests = ProfileStore.data.topics;

      console.log("?????");

      for (let topicId in interests['topics']) {
        let topic = interests['topics'][topicId];
        topics.push({
          id: "t" + topicId,
          label: '<b>' + topic[0][0] + '</b>\n' + topic[1][0] + '\n' + topic[2][0],
          color: 'red',
          font: {
            multi: 'html',
            color: 'white'
          }
        });
        keywordsDict["t" + topicId] = topic[0][0] + ' ' + topic[1][0] + ' ' + topic[2][0];
      }

      /*
      for (let wordId in interests['keywords']) {
        let word = interests['keywords'][wordId];
        keywords.push({id: "w" + wordId, label: word['word'], color: '#007bff', 'font':{color:'white'}});
        keywordsDict["w" + wordId] = word['word'];
        for (let link in word['topics']) {
          connections.push({from: "w" +  wordId, to: "t" + word['topics'][link][0]});
        }
      }*/

      console.log(topics);
      console.log(keywords);

      this.$data.keywordsDict = keywordsDict;

      var nodes = new vis.DataSet(topics);

      // create an array with edges
      var edges = new vis.DataSet(connections);

      // create a network
      var container = this.$refs.mynetwork;
      var data = {
        nodes: nodes
      };
      var options = {};
      var network = new vis.Network(container, data, options);

      var self = this;
      var ps = ProfileStore;

      network.on("selectNode", function (params) {
        console.log('selectNode Event:', params);
        ps.data.graph.selected = self.keywordsDict[params['nodes'][0]];//self.keywordsDict[params];
        if (self.$refs.interestField) {
          let value = -1;
          for (let i in ProfileStore.data.api.getTags) {
            let tag = ProfileStore.data.api.getTags[i];
            console.log("test");
            if (tag.word === ps.data.graph.selected) {
              value = tag.interest_id;
            }
          }
          self.$refs.interestField.value = value;
          ProfileStore.data.graph.formChanged = false;
        }
        enableTooltips();
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
