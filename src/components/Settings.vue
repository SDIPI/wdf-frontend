<template>
  <div id="profile">
    <h1>Settings</h1>

    <div v-if="!ProfileStore.loading">
      <interestfields></interestfields>
      <button type="submit" v-on:click="sendInterests()" class="btn btn-primary">Submit</button>
    </div>

    <div class="loader" v-if="ProfileStore.loading"></div>
    <div class="middleText" v-if="ProfileStore.loading">Loading data from server</div>

  </div>
</template>

<script>
  import ProfileStore from "../stores/ProfileStore";
  import InterestFields from "./Settings/InterestFields";

  export default {
    name: 'Settings',
    components: {
      interestfields: InterestFields
    },
    data() {
      return {
        ProfileStore: ProfileStore.data
      };
    },
    methods: {
      sendInterests() {
        ProfileStore.data.loading = true;
        ProfileStore.methods.sendInterests(ProfileStore.data.settingsForm.interests).then(() => {
          ProfileStore.methods.refreshUserInterests().then(() => {
            ProfileStore.methods.computeUserInterests();
            ProfileStore.data.loading = false;
            this.showalert("Interest fields saved successfully.", 'success');
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
      $('#interests').selectize({
        persist: false,
        createOnBlur: false,
        create: false,
        maxItems: 10,
        valueField: 'id',
        labelField: 'label',
        searchField: ['id', 'name', 'label'],
        options: ProfileStore.interestsList
      });
    }
  }
</script>

<style>
  #alertdiv {
    display: inline-table;
  }
</style>
