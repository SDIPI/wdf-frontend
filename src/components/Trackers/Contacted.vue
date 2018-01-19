<template>
  <div>
    <h2 class="mb-0">Most contacted domains</h2>
    <BarExtendedListTrackers
      :list="ProfileStore.trackersPage.mostRecieving"
      :labels="['Domain', 'Recieved', 'Requests', 'Domains']"
      :keyLabel="'to'"
      :keyValue1="'size'"
      :keyValue2="'amount'"
      :keyValue3="'domains'"
      :valueF1="(function(e) {return Math.floor(e/8/1024) + ' kB';})"
      :cbButton="(function(e) {
        ProfileStore.trackersForm.modalList = [];
        ProfileStore.trackersForm.selectedDomain = e;
        for (let from in ProfileStore.trackers) {
          if (e in ProfileStore.trackers[from]) {
            if (ProfileStore.trackersForm.active.from[from]) {
              let tracker = ProfileStore.trackers[from][e];
              ProfileStore.trackersForm.modalList.push({label: from, amount: tracker.amount, size: tracker.size});
            }
          }
        }
        ProfileStore.trackersForm.modalList.sort((a, b) => {
          return (b['amount'] - a['amount'])
        }).slice(0, 100);
        ProfileStore.trackersForm.modalList.splice();
      })"
      :activeList="ProfileStore.trackersForm.active.to"
      :fixedMax="ProfileStore.trackersPage.mostRecieving[0].realAmount"
    ></BarExtendedListTrackers>

    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Requests sent to <strong>{{ProfileStore.trackersForm.selectedDomain}}</strong></h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <BarExtendedList
              :list="ProfileStore.trackersForm.modalList"
              :labels="['Domain', 'Data', 'Requests', 'Domains']"
              :keyLabel="'label'"
              :keyValue1="'size'"
              :keyValue2="'amount'"
              :valueF1="(function(e) {return Math.floor(e/8/1024) + ' kB';})"
              :cbButton="(function(e) {ProfileStore.trackersForm.selectedDomain = e;})"
            ></BarExtendedList>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import ProfileStore from "../../stores/ProfileStore";
  import BarList from "../BarList.vue";
  import BarExtendedList from "../BarExtendedList.vue";
  import BarExtendedListTrackers from "../BarExtendedListTrackers.vue";
  import TableList from "../TableList.vue";

  export default {
    name: 'Contacted',
    components: {
      TableList,
      BarList,
      BarExtendedList,
      BarExtendedListTrackers
    },
    data() {
      return {
        ProfileStore: ProfileStore.data
      };
    },
    methods: {}
  }
</script>

<style>

</style>
