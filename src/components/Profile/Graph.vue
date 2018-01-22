<template>
  <div>
    <div class="row">
      <div class="col-12">
        <h2 class="mb-0">Topics graph</h2>
        <BarList :list="ProfileStore.topicsPage.topics" :labels="['Words', 'Amount']"
                         :keyLabel="'words'" :keyValue="'amount'"></BarList>
      </div>
      <!--
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
      </div>-->
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
  import BarExtendedList from "../BarExtendedList.vue";
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
      BarList,
      BarExtendedList
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
