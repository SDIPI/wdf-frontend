<template>
  <div>
    <div class="row">
      <div class="col-12">
        <h2 class="mb-0">Topics List</h2>
        <SelectList
          :list="ProfileStore.topicsPage.topics"
          :labels="['Words', 'Related interest']"
          :keyLabel="'words'"
          :keyValue="'amount'"
          :cbChanged="(function (topicId, topic) {selectChanged(topicId, topic);})"></SelectList>
      </div>
    </div>
    <p>
      <span class="hint badge badge-secondary" data-toggle="tooltip" data-placement="bottom"
            title="This page shows a guess at which topics and words you're the probably the most interested to.
            A 'topic' is a combination of multiple words. You can help us by assigning some of your interests to topics you find relevant.">What is this ?</span>
    </p>
  </div>
</template>

<script>
  import ProfileStore from "../../stores/ProfileStore";
  import SelectList from "../SelectList.vue";
  import Vue from "vue";

  function enableTooltips() {
    $(function () {
      $('[data-toggle="tooltip"]').tooltip()
    });
  }

  export default Vue.extend({
    name: 'Topics',
    components: {
      SelectList
    },
    data() {
      return {
        ProfileStore: ProfileStore.data,
        selectedWord: false,
        keywordsDict: {}
      };
    },
    methods: {
      selectChanged(e, value) {
        console.log(e.target.value);
        console.log(value);
        ProfileStore.data.loading = true;
        ProfileStore.methods.sendTag(value.topicId ,e.target.value, value.words).then(() => {
          ProfileStore.methods.refreshCurrentTags().then(() => {
            ProfileStore.methods.computeTags();
            ProfileStore.data.loading = false;
            this.showalert("Related interest saved successfully.", 'success');
          });
        });
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
</style>
